import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCreateStock, useDeleteStock, useGetStock, useUpdateStock } from '../services/useStock'

export default function VendorStockManager() {
    const [newItem, setNewItem] = useState({
        name: '',
        quantity: 0,
        price: 0,
    })

    const { data: stocks, isLoading } = useGetStock(1);
    const createStockMutation = useCreateStock();
    const updateStockMutation = useUpdateStock();
    const deleteStockMutation = useDeleteStock();

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newItem.name || newItem.quantity <= 0 || newItem.price <= 0) return

        createStockMutation.mutate({
            itemName: newItem.name,
            availableQty: newItem.quantity.toString(),
            price: newItem.price,
        }, {
            onSuccess: () => {
                setNewItem({ name: '', quantity: 0, price: 0 })
            },
        })

    }

    const handleDeleteItem = (id: string) => {
        deleteStockMutation.mutate(id)
    }

    const handleUpdateQuantity = (id: string, quantity: number) => {
        updateStockMutation.mutate({ itemId: id, availableQty: quantity })
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Add New Item</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddItem} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Itme name</label>
                                <Input
                                    placeholder="Milk"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Quantity</label>
                                <Input
                                    type="number"
                                    placeholder="Quantity"
                                    min="0"
                                    value={newItem.quantity}
                                    onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Price</label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="Price"
                                    min="0"
                                    value={newItem.price}
                                    onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })}
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full">Add Item to Stock</Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Current Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">Item</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">Price</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">Quantity</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <span>Loading...</span>
                                ) : stocks?.stock?.length == 0 ? (
                                    <span>No Stock Found</span>
                                ) : <>
                                    {stocks?.stock.map((item: any) => (
                                        <tr key={item.id} className="border-t hover:bg-gray-50">
                                            <td className="px-4 py-3">{item.itemName}</td>
                                            <td className="px-4 py-3">₹{item.price.toFixed(2)}</td>
                                            <td className="px-4 py-3">
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    value={item.availableQty}
                                                    onChange={(e) => handleUpdateQuantity(item._id, parseInt(e.target.value) || 0)}
                                                    className="w-20"
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDeleteItem(item._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                                }
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
