"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateListItemSchema = exports.addItemSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addItemSchema = joi_1.default.object({
    listId: joi_1.default.string().required(),
    name: joi_1.default.string().min(2).required(),
    quantity: joi_1.default.number().min(1).required(),
    brandPreference: joi_1.default.string().allow(null, "").optional()
}).options({ abortEarly: false });
exports.updateListItemSchema = joi_1.default.object({
    itemId: joi_1.default.string().required(),
    itemName: joi_1.default.string().min(1).max(200),
    quantity: joi_1.default.number().min(1),
    brandPreference: joi_1.default.string().allow("", null)
});
