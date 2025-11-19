import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, type FC } from "react";
import { useCreateItem } from "../../services/useItems";

interface ItemFormProps {
    listId: string;
}

const ItemForm: FC<ItemFormProps> = ({ listId }) => {
    const [formData, setFormData] = useState({
        name: '',
        quantity: 1,
        brandPreference: '',
    })

    const createItemMutation = useCreateItem()

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name.trim()) return

        const newItem = {
            listId,
            name: formData.name,
            quantity: formData.quantity,
            brandPreference: formData.brandPreference,
        }

        createItemMutation.mutate(newItem, {
            onSuccess: () => {
                setFormData({ name: '', quantity: 1, brandPreference: '' })
            },
        })
    }

    return (
        <form onSubmit={handleAddItem} className="space-y-3 p-4 bg-gray-50 rounded">
            <div>
                <label className="text-sm font-medium">Item Name</label>
                <Input
                    type="text"
                    placeholder="e.g., Milk"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-sm font-medium">Quantity</label>
                    <Input
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                    />
                </div>
                <div>
                    <label className="text-sm font-medium">Brand Preference</label>
                    <Input
                        type="text"
                        placeholder="e.g., Organic"
                        value={formData.brandPreference}
                        onChange={(e) => setFormData({ ...formData, brandPreference: e.target.value })}
                    />
                </div>
            </div>
            <Button type="submit" className="w-full">Add Item</Button>
        </form>
    )
}

export default ItemForm