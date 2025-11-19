import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, type FC } from "react";
import { useUpdateItem } from "../../services/useItems";
import type { ItemData } from "./item-card";



interface ItemEditProps {
    item: ItemData | null;
    handleCancleUpdate: () => void;
    handleOnUpdate: () => void;
}

const ItemEdit: FC<ItemEditProps> = ({ item, handleCancleUpdate, handleOnUpdate }) => {
    if (!item) return null;

    const [editData, setEditData] = useState(item)

    const updateItemMutation = useUpdateItem()

    const handleUpdateItem = () => {
        updateItemMutation.mutate({
            itemId: editData._id,
            itemName: editData.name,
            quantity: editData.quantity,
            brandPreference: editData.brandPreference,
        }, {
            onSuccess: () => {
                handleOnUpdate()
            }
        })
    }

    return (
        <div className="space-y-2">
            <Input
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                placeholder="Item name"
            />
            <div className="grid grid-cols-2 gap-2">
                <Input
                    type="number"
                    value={editData.quantity}
                    onChange={(e) => setEditData({ ...editData, quantity: parseInt(e.target.value) })}
                />
                <Input
                    value={editData.brandPreference}
                    onChange={(e) => setEditData({ ...editData, brandPreference: e.target.value })}
                    placeholder="Brand"
                />
            </div>
            <div className="flex gap-2">
                <Button size="sm" onClick={handleUpdateItem}>Save</Button>
                <Button size="sm" variant="outline" onClick={handleCancleUpdate}>Cancel</Button>
            </div>
        </div>
    )
}

export default ItemEdit