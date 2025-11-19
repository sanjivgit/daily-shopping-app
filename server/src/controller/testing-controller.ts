import { Request, Response } from "express";
import CommonRes from "../utils/commonResponse";

class TestingController {
    constructor() {

    }

    helthCheck(req: Request, res: Response, apiId: string): Promise<Response> {
        const resObj = {
            action: "GET",
            apiId,
            version: "1.0.0"
        }

        return CommonRes.SUCCESS('Healthy', null, resObj, req, res)
    }
}

export default TestingController;