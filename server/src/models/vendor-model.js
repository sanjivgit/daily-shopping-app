"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const StockSchema = new mongoose_1.default.Schema({
    itemName: { type: String, required: true },
    price: { type: Number, required: true },
    availableQty: { type: Number, required: true },
});
const VendorSchema = new mongoose_1.default.Schema({
    shopName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true } // [longitude, latitude]
    },
    stock: [StockSchema],
}, { timestamps: true });
VendorSchema.index({ location: "2dsphere" });
exports.default = mongoose_1.default.model("Vendor", VendorSchema);
