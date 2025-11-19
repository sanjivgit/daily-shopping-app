"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse_1 = require("./sendResponse");
const CommonRes = Object.freeze({
    CONFLICT_ERROR: (error, resObj, req, res) => {
        return (0, sendResponse_1.sendResponse)(false, error, "", 409, resObj.action, resObj.apiId, resObj.version, req, res);
    },
    VALIDATION_ERROR: (error, resObj, req, res) => {
        return (0, sendResponse_1.sendResponse)(false, error, "", 403, resObj.action, resObj.apiId, resObj.version, req, res);
    },
    SERVER_ERROR: (error, resObj, req, res) => {
        return (0, sendResponse_1.sendResponse)(false, error, "", 500, resObj.action, resObj.apiId, resObj.version, req, res);
    },
    CREATED: (message, data, resObj, req, res) => {
        return (0, sendResponse_1.sendResponse)(true, message, data, 201, resObj.action, resObj.apiId, resObj.version, req, res);
    },
    SUCCESS: (message, data, resObj, req, res) => {
        return (0, sendResponse_1.sendResponse)(true, message, data, 200, resObj.action, resObj.apiId, resObj.version, req, res);
    },
    NOT_FOUND: (message, data, resObj, req, res) => {
        return (0, sendResponse_1.sendResponse)(false, message, data, 404, resObj.action, resObj.apiId, resObj.version, req, res);
    },
    BAD_REQUEST: (error, resObj, req, res) => {
        return (0, sendResponse_1.sendResponse)(false, error, "", 400, resObj.action, resObj.apiId, resObj.version, req, res);
    },
    UNAUTHORISED: (error, resObj, req, res) => {
        return (0, sendResponse_1.sendResponse)(false, error, "", 401, resObj.action, resObj.apiId, resObj.version, req, res);
    },
    DEFAULT: "The underlying {kind} for model {model} does not exist.",
});
exports.default = CommonRes;
