"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commonResponse_1 = __importDefault(require("../utils/commonResponse"));
class TestingController {
    constructor() {
    }
    helthCheck(req, res, apiId) {
        const resObj = {
            action: "GET",
            apiId,
            version: "1.0.0"
        };
        return commonResponse_1.default.SUCCESS('Healthy', null, resObj, req, res);
    }
}
exports.default = TestingController;
