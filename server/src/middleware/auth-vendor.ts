"use strict";

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import CommonRes from "../utils/commonResponse";
import { resObj } from "../utils/types";
import { EXPIRE_IN, SECRET_KEY } from "../utils/config";
import { resMessage } from "../utils/common";

class VendorAuthorization {
    private initMsg;
    constructor() {
        this.initMsg = "Token";
    }

    //// Generate the temperaury token
    jwtSign = (authData: any) => {
        const secret = SECRET_KEY;

        return jwt.sign(
            {
                authData,
            },
            secret,
            { expiresIn: EXPIRE_IN as any }
        );
    };

    //// Verify the generated token
    jwtVerify = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const resObj: resObj = {
            apiId: "Not related to APIs",
            action: "Token Verification",
            version: "1.0",
        };
        const secret = SECRET_KEY;
        const bearerHeader = req.headers["authorization"];

        const token = bearerHeader?.split(" ")[1];

        if (token && typeof token !== "undefined") {
            try {
                const data: any = await jwt.verify(token, secret);

                req.vendor = data?.authData;
                return next();
            } catch (error: any) {
                return CommonRes.UNAUTHORISED(
                    resMessage(this.initMsg).INVALID,
                    resObj,
                    req,
                    res
                );
            }
        } else {
            return CommonRes.UNAUTHORISED(
                resMessage(this.initMsg).NOT_FOUND,
                resObj,
                req,
                res
            );
        }
    };

    //// Verify isAdmin the generated token
    jwtVerifyIsAdmin = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const resObj: resObj = {
            apiId: "Not related to APIs",
            action: "Token Verification",
            version: "1.0",
        };
        const secret = SECRET_KEY;
        const bearerHeader = req.headers["authorization"];
        const token = bearerHeader?.split(" ")[1];

        if (token && typeof token !== "undefined") {
            try {
                const data: any = await jwt.verify(token, secret);

                if (data?.authData?.role !== 'admin') {
                    return CommonRes.UNAUTHORISED(
                        "You Are Not Authorised",
                        resObj,
                        req,
                        res
                    );
                }
                req.body.user = data?.authData;
                return next();
            } catch (error: any) {
                return CommonRes.UNAUTHORISED(
                    resMessage(this.initMsg).INVALID,
                    resObj,
                    req,
                    res
                );
            }
        } else {
            return CommonRes.UNAUTHORISED(
                resMessage(this.initMsg).NOT_FOUND,
                resObj,
                req,
                res
            );
        }
    };

    authenticateUser = this.jwtVerify;
}

export default VendorAuthorization;