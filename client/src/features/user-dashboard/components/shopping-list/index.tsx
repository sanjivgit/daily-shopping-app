import { useState } from 'react'
import { useDeleteList, useGetList } from '../../services/useShoppingList'
import ListForm from './list-form'
import ListEdit from './list-edit'
import ListCard from './list-card'

export interface List {
    _id: string;
    title: string;
}

export default function ShoppingListsPanel() {
    const [editData, setEditData] = useState<List | null>(null)

    const deleteListMutation = useDeleteList()
    const { data: lists, isLoading } = useGetList()

    const handleDeleteList = (id: string) => {
        deleteListMutation.mutate(id)
    }

    const handleResetEditData = () => {
        setEditData(null)
    }

    return (
        <div className="space-y-4">
            <ListForm />

            <div className="space-y-2">
                {isLoading ? <span>Loading....</span> : !lists?.length ? <span>Not Found</span> : <>
                    {lists.map((list: any) => (
                        <div key={list._id} className="border rounded p-3 hover:bg-gray-50">
                            {editData?._id === list._id ? (
                                <ListEdit editData={editData} handleOnCancel={handleResetEditData} handleOnUpdate={handleResetEditData} />
                            ) : (
                                <ListCard list={list} handleDelete={handleDeleteList} handleEdit={(data) => setEditData(data)} />
                            )}
                        </div>
                    ))}
                </>}
            </div>
        </div>
    )
}
