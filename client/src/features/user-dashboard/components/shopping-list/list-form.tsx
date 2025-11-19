import { Input } from "@/components/ui/input"
import { useCreateList } from "../../services/useShoppingList"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const ListForm = () => {
    const [newListTitle, setNewListTitle] = useState('')
    const createListMutation = useCreateList()

    const handleCreateList = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newListTitle.trim()) {
            toast.error("Fill the title")
            return
        }

        const newList = {
            title: newListTitle
        }

        createListMutation.mutate(newList, {
            onSuccess: () => {
                setNewListTitle('')
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleCreateList} className="space-y-2">
                <Input
                    type="text"
                    placeholder="New list title"
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                />
                <Button type="submit" className="w-full">Create</Button>
            </form>
        </div>
    )
}

export default ListForm