import { Button } from "@/components/ui/button"
import type { FC } from "react";

export interface ItemData {
    _id: string;
    name: string;
    brandPreference: string;
    quantity: number;
}

interface ItemCardProps {
    item: ItemData,
    handleDeleteItem: (id: string) => void;
    handleEditItem: (data: ItemData) => void;
}

const ItemCard: FC<ItemCardProps> = ({ item, handleDeleteItem, handleEditItem }) => {
    return (
        <div className="flex justify-between items-start">
            <div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-gray-600">Qty: {item.quantity} {item.brandPreference && `• ${item.brandPreference}`}</div>
            </div>
            <div className="flex gap-2">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditItem(item)}
                >
                    Edit
                </Button>
                <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteItem(item._id)}
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default ItemCard