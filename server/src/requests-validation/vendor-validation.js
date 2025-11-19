"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorSchema = exports.updateStockSchema = exports.addStockSchema = exports.vendorLoginSchema = exports.vendorRegisterSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.vendorRegisterSchema = joi_1.default.object({
    shopName: joi_1.default.string().min(2).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(4).required(),
    location: joi_1.default.object({
        coordinates: joi_1.default.array()
            .items(joi_1.default.number().required(), // longitude
        joi_1.default.number().required() // latitude
        )
            .length(2)
            .required()
    }).required()
}).options({ abortEarly: false });
exports.vendorLoginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
}).options({ abortEarly: false });
exports.addStockSchema = joi_1.default.object({
    itemName: joi_1.default.string().required(),
    price: joi_1.default.number().min(1).required(),
    availableQty: joi_1.default.number().min(0).required()
}).options({ abortEarly: false });
exports.updateStockSchema = joi_1.default.object({
    itemId: joi_1.default.string().required(),
    price: joi_1.default.number().optional(),
    availableQty: joi_1.default.number().optional()
}).options({ abortEarly: false });
exports.vendorSchema = joi_1.default.object({
    shopName: joi_1.default.string().required(),
    location: joi_1.default.object({
        coordinates: joi_1.default.array()
            .items(joi_1.default.number().required(), // longitude
        joi_1.default.number().required() // latitude
        )
            .length(2)
            .required()
    }).required(),
    stock: joi_1.default.array().items(joi_1.default.object({
        itemName: joi_1.default.string().required(),
        price: joi_1.default.number().min(1).required(),
        availableQty: joi_1.default.number().min(0).required()
    })).required(),
}).options({ abortEarly: false });
