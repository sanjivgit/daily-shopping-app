import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDeleteItem, useGetItem } from '../../services/useItems'
import { useNavigate } from 'react-router'
import ItemForm from './item-form'
import ItemCard from './item-card'
import ItemEdit from './item-edit'

interface ItemsPanelProps {
    listId: string;
    title: string;
}

interface ItemData {
    _id: string;
    name: string;
    brandPreference: string;
    quantity: number;
}

export default function ItemsPanel({ listId, title }: ItemsPanelProps) {
    const [editData, setEditData] = useState<ItemData | null>(null)
    const navigate = useNavigate()

    const { data: items, isLoading } = useGetItem(listId)
    const deleteItemMutation = useDeleteItem()

    const handleDeleteItem = (id: string) => {
        deleteItemMutation.mutate(id)
    }

    const handleEditItem = (data: ItemData) => {
        setEditData(data)
    }

    const handleResetEditData = () => {
        setEditData(null)
    }

    return (
        <div className='h-[calc(100vh-65px)] overflow-y-auto p-4'>
            <div className='flex items-center justify-between'>
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <Button size="sm" onClick={() => navigate('/dashboard/vendors/' + listId, { state: { title } })}>Find Vendor</Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Shopping Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ItemForm listId={listId} />

                    <div className="space-y-2">
                        {isLoading ? (
                            <span>Loading....</span>
                        ) : items?.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">No items yet. Add one to get started!</p>
                        ) : (
                            items?.map((item: any) => (
                                <div key={item._id} className="border rounded p-3 hover:bg-gray-50">
                                    {editData?._id === item._id ? (
                                        <ItemEdit item={editData} handleCancleUpdate={handleResetEditData} handleOnUpdate={handleResetEditData} />
                                    ) : (
                                        <ItemCard handleDeleteItem={handleDeleteItem} handleEditItem={handleEditItem} item={item} />
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
