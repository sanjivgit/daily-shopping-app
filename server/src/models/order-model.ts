import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
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

export default mongoose.model("Order", orderSchema);