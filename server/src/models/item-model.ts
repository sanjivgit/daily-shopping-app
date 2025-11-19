import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    listId: { type: String, ref: "ShoppingList", required: true },
    name: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    brandPreference: { type: String, default: null },
});

export default mongoose.model("Item", itemSchema);