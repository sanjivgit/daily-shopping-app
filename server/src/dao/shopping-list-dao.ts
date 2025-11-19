import mongoose from "mongoose";
import ShoppingList from "../models/shopping-list-model";
import itemModel from "../models/item-model";

class ShoppingListDao {
    async createList(data: any) {
        return await ShoppingList.create(data);
    }

    async getLists(userId: string) {
        return await ShoppingList.find({ userId }).sort({ createdAt: -1 });
    }

    async updateListTitle(listId: string, userId: string, title: string) {
        return await ShoppingList.findOneAndUpdate(
            { _id: listId, userId },
            { $set: { title } },
            { new: true }
        ).lean();
    }

    async deleteList(listId: string, userId: string) {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();

            const deleteList = await ShoppingList.findOneAndDelete({ _id: listId, userId }, { session })

            await itemModel.deleteMany({ listId }, { session });

            await session.commitTransaction();
            session.endSession();

            return deleteList;
        } catch (error) {
            throw error;
        }
    }
}

export default ShoppingListDao;
