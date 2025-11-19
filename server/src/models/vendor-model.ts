import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    price: { type: Number, required: true },
    availableQty: { type: Number, required: true },
});

const VendorSchema = new mongoose.Schema(
    {
        shopName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        location: {
            type: { type: String, enum: ['Point'], required: true },
            coordinates: { type: [Number], required: true } // [longitude, latitude]
        },
        stock: [StockSchema],
    },
    { timestamps: true }
);

VendorSchema.index({ location: "2dsphere" });

export default mongoose.model("Vendor", VendorSchema);