import { Request, Response } from "express";
import {
    ErrorController,
    SuccessResponse,
    BadRequestError,
    CreatedResponse,
    ApiError,
    NoContentResponse,
    Crypto,
} from "../../core/index";
import pagination from "../../helpers/pagination";
import apiLogs from "../../helpers/apilogs";
import { sendVerificationEmail } from "../../helpers/mailer";
import { Op } from "sequelize";
const EC = new ErrorController();
const crypto = new Crypto();
const { db } = require("../../config/db");
export class UsersController {
    // Utility function to create a raw query object with query and response time
    createRawQueryObj(query: any, start: any, end: any) {
        const obj = {
            query: query,
            responseTime: end - start,
        };
        return obj;
    }

    /**
     * @method POST
     * @req - Json-object of request body.
     * @res - Success message or no data created message.
     * @desc - Add new user data and show the response of created user data.
     */
    public addUser = async (req: Request, res: Response) => {
        try {
            // @ts-ignore
            const user_id = req.user_id;

            // Extract payload from the request
            const {
                email,
                full_name,
                password,
                status,
                fees,
            } = req.body;
            const file = req.file;
            console.log("file --", file)

            // Convert email to lowercase for consistency
            const _email = email.toLowerCase();

            // Check if the user with the given email already exists
            const existUser = await db.Users.findOne({
                attribute: ["email"],
                where: { email: _email },
            });

            // If the user already exists, throw an error
            if (existUser) {
                throw new Error(EC.userExist);
            } else {
                // Encrypt the password
                const _password = crypto.encrypt(password, true);

                let userData: any;

                // Create a new user in the database
                await db.Users.create({
                    email: _email,
                    full_name,
                    password: _password,
                    avatar: file?.filename,
                    is_active: 1,
                    status,
                    fees: parseFloat(fees).toFixed(2)
                })
                    .then(async (response: any) => {
                        // Parse the response to JSON format
                        response = JSON.parse(JSON.stringify(response));
                        userData = response;

                        // Remove unnecessary fields from the user data
                        delete userData.created_at;
                        delete userData.is_deleted;
                        delete userData.password;

                        if (process.env.APILOGS === "true")
                            await apiLogs(
                                {
                                    full_name,
                                    avatar: file?.path,
                                    is_active: 1,
                                    status,
                                    fees
                                },
                                {},
                                user_id,
                                "Users",
                                "PUT"
                            );
                        // Send a success response with the created user data
                        new CreatedResponse(EC.created, { ...userData }).send(res);
                    })
                    .catch((error: any) => {
                        // If an error occurs during user creation, throw an error
                        throw new Error(error);
                    });
            }
        } catch (error: any) {
            // Handle any errors during the process
            ApiError.handle(new BadRequestError(error.message), res);
        }
    };

    /**
     * @method PUT
     * @req - Json-object of request body.
     * @res - Success message or no data update message.
     * @desc - Update user data and show the response of affected row's keys and values.
     */
    public updateUser = async (req: Request, res: Response) => {
        try {
            const {
                id,
                full_name,
                status,
                is_active,
                fees,
            } = req.body;
            const file: any = !req.file ? "" : req.file?.filename;

            const _id = parseInt(id);
            // Fetch user data before the update
            let updateUserData = await db.Users.findOne({ where: { id: _id } });
            updateUserData = JSON.parse(JSON.stringify(updateUserData));

            // Update user data
            let updateUser = await db.Users.update(
                {
                    full_name,
                    avatar: file,
                    is_active,
                    status,
                    fees
                },
                { where: { id: _id } }
            );



            // Check if the update was successful
            if (updateUser[0] == 1) {
                // @ts-ignore
                const user_id = req.user_id;

                // Log API changes if APILOGS is enabled
                if (process.env.APILOGS === "true")
                    await apiLogs(
                        {
                            full_name,
                            avatar: file?.path,
                            is_active,
                            status,
                            fees
                        },
                        {},
                        user_id,
                        "Users",
                        "PUT"
                    );

                // Send success response with updated user data
                new SuccessResponse(EC.updated, {}).send(res);
            } else {
                // Send no data update response
                new SuccessResponse(EC.noDataUpdate, {}).send(res);
            }
        } catch (error: any) {
            // Handle any errors during the process
            ApiError.handle(new BadRequestError(error.message), res);
        }
    };

    /**
     * Retrieves a paginated list of users with search and sorting options.
     *
     * @method GET
     * @res - Array-object of all users or an empty array if no users found.
     * @desc - Retrieves a list of users from the database based on specified pagination, search, and sorting parameters.
     */
    public listUser = async (req: Request, res: Response) => {
        try {
            let { page, itemsPerPage, search, sortBy, sortType }: any = req.query;

            //@ts-ignore
            const user_id = req.user_id;

            // Parse pagination parameters
            const pageNo = parseInt(page);
            const pageRecord = parseInt(itemsPerPage);
            const paginationData = pagination(pageRecord, pageNo);

            // Parse sorting parameters
            const sortField = !sortBy ? "full_name" : sortBy;
            const sortingType = !sortType ? "ASC" : sortType;

            // Define search conditions
            const whereCondition = {
                deleted_at: null,
                // id: { [Op.ne]: user_id },
                [Op.or]: [
                    { full_name: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } },
                    { status: { [Op.like]: `%${search}%` } },
                ],
            };

            // Count total users for pagination information
            const counts = await db.Users.findAll({
                attributes: ["id"],
                where: whereCondition,
            });
            // Calculate last page based on total count and page record
            const lastPage = Math.ceil(counts.length / itemsPerPage);

            // Query start time
            let startTime = performance.now();

            // Fetch user data with pagination, sorting, and search conditions
            let userData = await db.Users.findAll({
                where: whereCondition,
                attributes: [
                    "id",
                    "full_name",
                    "email",
                    "is_active",
                    "status",
                    "avatar",
                ],
                // include: [
                    //   {
                    //     required: false,
                    //     model: db.Departments,
                    //     attributes: ["id", "name"],
                    //     where: { deleted_at: null },
                    //     as: "department",
                    //   },
                // ],
                limit: paginationData.pageRecord,
                offset: paginationData.rawOffset,
                order: [[sortField, sortingType]]
            });

            // Parse user data to JSON format
            userData = JSON.parse(JSON.stringify(userData));

            for (let element of userData) {
                //Generate and return full media url from media_id.
                element.avatar = element.avatar
                    ? `${process.env.BASE_URL}/${element.avatar}`
                    : "";
            }
            const paginationInfo = {
                total: counts.length,
                currentPage: pageNo,
                nextPage: pageNo + 1,
                prevPage: pageNo - 1,
                lastPage: lastPage,
            };

            // Send success response with user data if users exist, otherwise send no content response
            userData.length
                ? new SuccessResponse(EC.fetched, {
                    ...paginationInfo,
                    items: userData,
                }).send(res)
                : new NoContentResponse(EC.noContent, {
                    ...paginationInfo,
                    items: userData,
                }).send(res);
        } catch (error: any) {
            // Handle any errors during the process

            ApiError.handle(new BadRequestError(error.message), res);
        }
    };

    /**
     * Delete a user by marking them as deleted.
     * @method GET
     * @req - id (userId).
     * @res - Success message if user is deleted, otherwise an error.
     * @desc - Delete only requested and verified user by marking them as deleted.
     */
    public deleteUser = async (req: Request, res: Response) => {
        try {

            // Fetch the user by ID from the database
            let existUser = await db.Users.findOne({
                where: { id: req.params.userId, deleted_at: null },
                attributes: ["id"],
            });
            existUser = JSON.parse(JSON.stringify(existUser));

            // Check if the user exists
            if (!existUser) {
                // If the user does not exist, throw a no content error
                throw new Error(EC.noContent);
            }

            // Mark the user as deleted in the database
            let userDeleted = await db.Users.update(
                {
                    deleted_at: new Date(),
                },
                { where: { id: existUser.id } }
            );

            // Check if the user deletion was successful
            if (userDeleted[0] !== 1) {
                // If the deletion was not successful, throw an error
                throw new Error("Something went wrong in deleting the user!");
            }

            // Send a success response if the user is deleted
            new SuccessResponse(EC.deleted, {}).send(res);
        } catch (error: any) {
            // Handle any errors during the process
            ApiError.handle(new BadRequestError(error.message), res);
        }
    };
}
