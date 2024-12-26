import { Request, Response } from "express";
import {
  ErrorController,
  SuccessResponse,
  BadRequestError,
  AuthFailureError,
  ApiError,
  Crypto,
} from "../../core/index";
import { sendVerificationEmail } from "../../helpers/mailer";
import * as createCsvWriter from "csv-writer"; //use to create csv file

const { db } = require("../../config/db");
const crypto = new Crypto();
const EC = new ErrorController();
const jwt = require("jsonwebtoken");

export interface MenuObj {
  title: string;
  icon: string;
  path: string;
  subject: string;
}
export class AuthController {
  /**
   *
   * @param req object
   * @param res token
   * @desc - Authinticate by requesting email and password and return encoded token.
   */
  public login = async (req: Request, res: Response) => {
    try {
      // Extract from request body
      const { email, password } = req.body;

      // Encrypt the password using crypto module
      const _password = crypto.encrypt(password, true);
      const _email = email.toLowerCase();

      // Find user in the database based on the provided email and password
      let existUser = await db.Users.findOne({
        attributes: [
          "id",
          "email",
          "full_name",
          "avatar",
          "status",
          "is_active"
        ],
        where: { email: _email, password: _password, deleted_at: null },
      });
      existUser = JSON.parse(JSON.stringify(existUser));

      // Check if the user exists
      if (existUser) {
        existUser.avatar = existUser.avatar
          ? `${process.env.BASE_URL}/${existUser.avatar}`
          : "";
       

        // Generate access and refresh tokens using JWT
        const accessToken = jwt.sign(existUser, process.env.JWT_SECRET_KEY, {
          expiresIn: "1d",
        });
        const refreshToken = jwt.sign(
          { id: existUser.id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "365d" }
        );
        // Update user's refresh token in the database
        await db.Users.update(
          {
            refresh_token: refreshToken,
          },
          { where: { id: existUser.id } }
        );
;

        // Send success response with user information and tokens
        new SuccessResponse(EC.success, {
          ...existUser,
          accessToken,
          refreshToken: refreshToken,
        }).send(res);
      } else {
        // If user doesn't exist, handle authentication failure
        ApiError.handle(new AuthFailureError(EC.loginFail), res);
      }
    } catch (error: any) {
      // Handle errors and send a BadRequestError response
      ApiError.handle(new BadRequestError(error.message), res);
    }
  };

  //forgot password
  public forgotPassword = async (req: Request, res: Response) => {
    try {
      const email = req.body.email.toLowerCase();
      let existUser = await db.Users.findOne({
        where: { email: email },
        attributes: [["full_name", "name"], "email"],
      });
      existUser = JSON.parse(JSON.stringify(existUser));
      if (!existUser) throw new Error(EC.userNotExist);
      new SuccessResponse(EC.success, {}).send(res);
      await sendVerificationEmail(
        existUser.name,
        existUser.email,
        "reset-password"
      );
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  };

  //Change password
  public changePassword = async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      payload.email = payload.email.toLowerCase();

      let isVerify = await db.Users.findOne({
        where: {
          email: payload.email,
        },
      });

      if (isVerify) {
        if (isVerify.is_active === 1) {
          payload.new_password = crypto.encrypt(payload.new_password, true);

          if (payload.new_password !== isVerify.password) {
            const updateUser = await db.Users.update(
              {
                password: payload.new_password,
              },
              { where: { id: isVerify.id } }
            );

            if (updateUser[0] == 1) {
              new SuccessResponse(
                "Your password has been changed successfully.",
                {}
              ).send(res);
            } else {
              throw new Error(
                "Something went wrong in update change password."
              );
            }
          } else {
            new SuccessResponse(
              "Ensure that the new password is different from the old password.",
              {}
            ).send(res);
          }
        } else {
          ApiError.handle(
            new AuthFailureError(
              `You must verify your account first. We have sent a verification link on ${isVerify.email}.`
            ),
            res
          );
          // await sendVerificationEmail(isVerify.full_name, isVerify.email);
        }
      } else {
        ApiError.handle(new AuthFailureError(EC.loginFail), res);
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  };

  /**
   *
   * @param req object
   * @param res token
   * @desc - Reset the password.
   */
  public resetPassword = async (req: Request, res: Response) => {
    try {
      const { new_password, confirm_password, email } = req.body;

      const _email = email.toLowerCase();

      //Get email from using email.
      let user = await db.userVerify.findOne({
        attributes: ["id", "email"],
        where: { email: _email },
      });
      user = JSON.parse(JSON.stringify(user));

      let existUser = await db.Users.findOne({
        attributes: ["id", "is_active", "password"],
        where: { email: _email },
      });
      existUser = JSON.parse(JSON.stringify(existUser));

      if (!existUser) {
        throw new Error(EC.noContent);
      } else {
        if (existUser.is_active === 1) {
          if (new_password !== confirm_password)
            throw new Error("New password and confirm password doesn't match.");
          const newPassword = crypto.encrypt(new_password, true);

          if (newPassword !== existUser.password) {
            await db.Users.update(
              {
                password: newPassword,
              },
              { where: { id: existUser.id } }
            );
            await db.userVerify.destroy({
              where: { email: _email },
            });
            new SuccessResponse(
              "Your password has been changed successfully.",
              {}
            ).send(res);
          } else {
            throw new Error(
              "Ensure that the new password is different from the old password."
            );
          }
        } else {
          ApiError.handle(
            new AuthFailureError(
              `You must verify your account first. We have sent a verification link
               on ${existUser.email}.`
            ),
            res
          );
          await sendVerificationEmail(
            existUser.full_name,
            existUser.email,
            "user-verification"
          );
        }
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  };

  public refreshAccessToken = async (req: Request, res: Response) => {
    try {
      const refreshToken = req.headers.refreshtoken;
      // Validate the refresh token
      if (!refreshToken) {
        throw new BadRequestError("Invalid refresh token");
      }
      // Decode the user ID from the refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
      // Fetch user information from the database based on the decoded user ID
      const userId = decoded.id;
      const user = await db.Users.findByPk(userId, {
        attributes: [
          "email",
          ["is_active", "verified"],
          "id",
          "full_name",
        ],
      });

      if (!user) {
        throw new BadRequestError("User not found");
      }

      // Generate a new access token
      const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY, {
        expiresIn: "300s",
      });

      // Send the new access token to the client
      new SuccessResponse(EC.success, { ...user.toJSON(), accessToken }).send(
        res
      );
    } catch (error: any) {
      ApiError.handle(error, res);
    }
  };
}
