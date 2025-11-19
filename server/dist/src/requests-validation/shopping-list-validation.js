"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateListTitleSchema = exports.createListSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createListSchema = joi_1.default.object({
    title: joi_1.default.string().min(2).required(),
}).options({ abortEarly: false });
exports.updateListTitleSchema = joi_1.default.object({
    listId: joi_1.default.string().required(),
    title: joi_1.default.string().min(1).max(200).required()
});
