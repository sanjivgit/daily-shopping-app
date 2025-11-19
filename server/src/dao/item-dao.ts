import Item from "../models/item-model";

class ItemDao {
    async addItem(data: any) {
        return await Item.create(data);
    }

    async getItems(listId: string) {
        return await Item.find({ listId });
    }

    async updateListItem(userId: string, updateData: any) {
        return await Item.findOneAndUpdate(
            { _id: updateData.itemId, userId },
            {
                $set: {
                    name: updateData.itemName,
                    quantity: updateData.quantity,
                    brandPreference: updateData.brandPreference
                }
            },
            { new: true }
        ).lean();
    }

    async deleteItem(itemId: string) {
        return await Item.findByIdAndDelete(itemId);
    }
}

export default ItemDao;
