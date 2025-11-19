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
exports.sendResponse = void 0;
const logger_config_1 = __importDefault(require("./logger.config"));
/**
 * | Response Msg Version with apiMetaData
 */
const sendResponse = (status, message, resData, responseCode, action, apiId, version, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!status) {
        // resData = errorCodes[resData as keyof typeof errorCodes];
        logger_config_1.default.error({ metaData: { apiId, version, action }, url: req.path, message: message.message });
        // new AuditTrail().store(message, { apiId, version, action }, req, res);
    }
    else {
        logger_config_1.default.info({ metaData: { apiId, version, action }, data: resData });
    }
    if (message && (message === null || message === void 0 ? void 0 : message.code) && ((_a = message === null || message === void 0 ? void 0 : message.meta) === null || _a === void 0 ? void 0 : _a.cause)) {
        // message = errorCodes[message?.code as keyof typeof errorCodes];
        message = message.meta.cause;
        responseCode = 400;
    }
    else {
        message = (message === null || message === void 0 ? void 0 : message.message) || message;
    }
    const totalTime = process.hrtime(res.locals.startTime);
    const jsonRes = {
        status,
        message,
        "meta-data": {
            apiId,
            version,
            responseTime: totalTime[0] * 1000 + totalTime[1] / 1e6,
            action,
        },
        data: resData,
    };
    return res.status(responseCode).json(jsonRes);
});
exports.sendResponse = sendResponse;
