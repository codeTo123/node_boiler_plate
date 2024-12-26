import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

export interface AppRequest extends Request {
  user_id: number;
  user: {};
  authorization: string;
  email: string;
}

export default async function (
  req: AppRequest,
  res: Response,
  next: NextFunction
) {
  const reqHeader: any = req.headers.authorization;
  // Check if the Authorization header exists in the request
  if (reqHeader) {
    const token = reqHeader.split("Bearer ");
    // Verify the JWT using jwt.verify
    jwt.verify(
      token[1],
      process.env.JWT_SECRET_KEY || "",
      (err: VerifyErrors | null, verified: any) => {
        if (err) {
          const errorMessage =
            err.message === "jwt expired"
              ? "Token has been expired."
              : err.message;
          res.status(401).json({ message: errorMessage });
        } else {
          req.user = verified;
          req.user_id = verified.id;
          req.email = verified.email;
          next();
        }
      }
    );
  } else {
    res.status(401).json({ message: "Token is required." });
  }
}
