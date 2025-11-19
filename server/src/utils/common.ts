export const baseUrl = `/api/v1`;

// Common response message
/**
 * Author: Sanjiv Kumar
 * Working: OK
 * Status: Open
 */
export function resMessage(value: string): {
    NOT_FOUND: string;
    FOUND: string;
    CREATED: string;
    UPDATED: string;
    LOGIN: string;
    INVALID: string;
    OTP_SENT: string;
    REGISTER: string;
} {
    const NOT_FOUND: string = `${value} Not Found`;
    const FOUND: string = `${value} Found Successfully!!`;
    const CREATED: string = `${value} created Successfully!!`;
    const UPDATED: string = `${value} updated Successfully!!`;
    const LOGIN: string = `${value} Loged in Successfully!!`;
    const REGISTER: string = `${value} Register in Successfully!!`;
    const INVALID: string = `Invalid ${value}`;
    const OTP_SENT: string = `OTP sent successfully!!`;

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