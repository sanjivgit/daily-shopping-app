import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    location: {
        type: { type: String, enum: ['Point'], required: false },
        coordinates: { type: [Number], required: true }
    },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
