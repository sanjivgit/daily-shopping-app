"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    userId: { type: String, ref: "User", required: true },
    vendorId: { type: String, ref: "Vendor" },
    items: [
        {
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    totalCost: { type: Number, required: true },
    delivery: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "paid" },
    createdAt: { type: Date, default: Date.now }
});
exports.default = mongoose_1.default.model("Order", orderSchema);
