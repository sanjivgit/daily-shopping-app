import mongoose from "mongoose";

const shoppingListSchema = new mongoose.Schema({
    userId: { type: String, ref: "User", required: true },
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("ShoppingList", shoppingListSchema);