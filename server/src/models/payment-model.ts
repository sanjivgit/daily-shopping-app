// src/models/payment.model.ts

import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        orderId: { type: String, required: true },
        amount: { type: Number, required: true },
        currency: { type: String, default: "INR" },
        status: { type: String, default: "created" },
        receipt: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
