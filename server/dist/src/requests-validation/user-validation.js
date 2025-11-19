"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const registerValidationSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(50).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    location: joi_1.default.object({
        coordinates: joi_1.default.array()
            .items(joi_1.default.number().required(), // longitude
        joi_1.default.number().required() // latitude
        )
            .length(2)
            .required()
    }).optional()
}).options({ abortEarly: false });
exports.default = registerValidationSchema;
exports.loginValidationSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
}).options({ abortEarly: false });
