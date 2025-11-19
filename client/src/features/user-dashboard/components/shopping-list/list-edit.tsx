import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, type FC } from "react"
import { useUpdateList } from "../../services/useShoppingList"
import type { List } from ".";
import { toast } from "sonner";

interface ListEditProps {
    editData: List | null;
    handleOnUpdate: () => void;
    handleOnCancel: () => void;
}

const ListEdit: FC<ListEditProps> = ({ editData, handleOnCancel, handleOnUpdate }) => {
    if (!editData) return null;

    const [editTitle, setEditTitle] = useState(editData.title)

    const updateListMutation = useUpdateList()


    const handleUpdateList = () => {
        if (!editTitle.trim()) {
            toast.error("Fill the title field")
            return
        }

        updateListMutation.mutate({ listId: editData._id, title: editTitle }, {
            onSuccess: handleOnUpdate
        })
    }

    return (
        <div className="space-y-2">
            <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
            />
            <div className="flex gap-2">
                <Button
                    size="sm"
                    onClick={handleUpdateList}
                >
                    Save
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={handleOnCancel}
                >
                    Cancel
                </Button>
            </div>
        </div>
    )
}

export default ListEdit