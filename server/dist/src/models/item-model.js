"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const itemSchema = new mongoose_1.default.Schema({
    listId: { type: String, ref: "ShoppingList", required: true },
    name: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    brandPreference: { type: String, default: null },
});
exports.default = mongoose_1.default.model("Item", itemSchema);
