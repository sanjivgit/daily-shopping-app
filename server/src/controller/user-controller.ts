// controller/auth-controller.ts
import { Request, Response } from "express";
import CommonRes from "../utils/commonResponse";
import { resObj } from "../utils/types";
import UserDao from "../dao/user-dao";
import registerValidationSchema, { loginValidationSchema } from "../requests-validation/user-validation";

class UserController {
    private userDao: UserDao;

    constructor() {
        this.userDao = new UserDao();
    }

    // POST /api/auth/register
    async register(req: Request, res: Response, apiId: string) {
        const resJson: resObj = { apiId, action: "POST", version: "1.0" };

        try {
            const { error, value } = await registerValidationSchema.validate(req.body);
            if (error) return CommonRes.BAD_REQUEST(error, resJson, req, res);

            const user = await this.userDao.registerUser(value);

            return CommonRes.CREATED("User Registered Successfully", user, resJson, req, res);

        } catch (err) {
            return CommonRes.SERVER_ERROR(err, resJson, req, res);
        }
    }

    // POST /api/auth/login
    async login(req: Request, res: Response, apiId: string) {
        const resJson: resObj = { apiId, action: "POST", version: "1.0" };

        try {
            const { error, value } = await loginValidationSchema.validate(req.body);
            if (error) return CommonRes.BAD_REQUEST(error, resJson, req, res);

            const data = await this.userDao.loginUser(value);

            return CommonRes.SUCCESS("Login Successful", data, resJson, req, res);

        } catch (err) {
            return CommonRes.SERVER_ERROR(err, resJson, req, res);
        }
    }
}

export default UserController;
