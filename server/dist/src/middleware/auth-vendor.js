"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const commonResponse_1 = __importDefault(require("../utils/commonResponse"));
const config_1 = require("../utils/config");
const common_1 = require("../utils/common");
class VendorAuthorization {
    constructor() {
        //// Generate the temperaury token
        this.jwtSign = (authData) => {
            const secret = config_1.SECRET_KEY;
            return jsonwebtoken_1.default.sign({
                authData,
            }, secret, { expiresIn: config_1.EXPIRE_IN });
        };
        //// Verify the generated token
        this.jwtVerify = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId: "Not related to APIs",
                action: "Token Verification",
                version: "1.0",
            };
            const secret = config_1.SECRET_KEY;
            const bearerHeader = req.headers["authorization"];
            const token = bearerHeader === null || bearerHeader === void 0 ? void 0 : bearerHeader.split(" ")[1];
            if (token && typeof token !== "undefined") {
                try {
                    const data = yield jsonwebtoken_1.default.verify(token, secret);
                    req.vendor = data === null || data === void 0 ? void 0 : data.authData;
                    return next();
                }
                catch (error) {
                    return commonResponse_1.default.UNAUTHORISED((0, common_1.resMessage)(this.initMsg).INVALID, resObj, req, res);
                }
            }
            else {
                return commonResponse_1.default.UNAUTHORISED((0, common_1.resMessage)(this.initMsg).NOT_FOUND, resObj, req, res);
            }
        });
        //// Verify isAdmin the generated token
        this.jwtVerifyIsAdmin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const resObj = {
                apiId: "Not related to APIs",
                action: "Token Verification",
                version: "1.0",
            };
            const secret = config_1.SECRET_KEY;
            const bearerHeader = req.headers["authorization"];
            const token = bearerHeader === null || bearerHeader === void 0 ? void 0 : bearerHeader.split(" ")[1];
            if (token && typeof token !== "undefined") {
                try {
                    const data = yield jsonwebtoken_1.default.verify(token, secret);
                    if (((_a = data === null || data === void 0 ? void 0 : data.authData) === null || _a === void 0 ? void 0 : _a.role) !== 'admin') {
                        return commonResponse_1.default.UNAUTHORISED("You Are Not Authorised", resObj, req, res);
                    }
                    req.body.user = data === null || data === void 0 ? void 0 : data.authData;
                    return next();
                }
                catch (error) {
                    return commonResponse_1.default.UNAUTHORISED((0, common_1.resMessage)(this.initMsg).INVALID, resObj, req, res);
                }
            }
            else {
                return commonResponse_1.default.UNAUTHORISED((0, common_1.resMessage)(this.initMsg).NOT_FOUND, resObj, req, res);
            }
        });
        this.authenticateUser = this.jwtVerify;
        this.initMsg = "Token";
    }
}
exports.default = VendorAuthorization;
