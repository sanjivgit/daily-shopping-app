"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrl = void 0;
exports.resMessage = resMessage;
exports.baseUrl = `/api/v1`;
// Common response message
/**
 * Author: Sanjiv Kumar
 * Working: OK
 * Status: Open
 */
function resMessage(value) {
    const NOT_FOUND = `${value} Not Found`;
    const FOUND = `${value} Found Successfully!!`;
    const CREATED = `${value} created Successfully!!`;
    const UPDATED = `${value} updated Successfully!!`;
    const LOGIN = `${value} Loged in Successfully!!`;
    const REGISTER = `${value} Register in Successfully!!`;
    const INVALID = `Invalid ${value}`;
    const OTP_SENT = `OTP sent successfully!!`;
    return {
        FOUND,
        NOT_FOUND,
        CREATED,
        UPDATED,
        LOGIN,
        INVALID,
        OTP_SENT,
        REGISTER,
    };
}
