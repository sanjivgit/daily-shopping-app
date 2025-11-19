"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.orderSchema = joi_1.default.object({
    vendorId: joi_1.default.string().required(),
    items: joi_1.default.array().items(joi_1.default.object({
        name: joi_1.default.string().required(),
        quantity: joi_1.default.number().required(),
        price: joi_1.default.number().required()
    })).required(),
    totalCost: joi_1.default.number().required(),
    delivery: joi_1.default.number().required(),
    paymentStatus: joi_1.default.string().valid("pending", "paid").default("pending")
}).options({ abortEarly: false });
