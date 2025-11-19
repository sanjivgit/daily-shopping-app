"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const shoppingListSchema = new mongoose_1.default.Schema({
    userId: { type: String, ref: "User", required: true },
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
exports.default = mongoose_1.default.model("ShoppingList", shoppingListSchema);
