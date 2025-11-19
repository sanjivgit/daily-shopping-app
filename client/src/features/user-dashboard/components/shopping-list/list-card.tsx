import { Button } from "@/components/ui/button"
import type { List } from "."
import type { FC } from "react"
import { useNavigate } from "react-router-dom"

interface ListCardProps {
    list: List;
    handleDelete: (id: string) => void;
    handleEdit: (list: List) => void;
}

const ListCard: FC<ListCardProps> = ({ list, handleDelete, handleEdit }) => {
    const navigate = useNavigate()

    return (
        <div onClick={() => navigate('items/' + list._id, { state: { title: list.title } })}>
            <div
                className="font-semibold cursor-pointer hover:text-blue-600"
            >
                {list.title}
            </div>
            <div className="flex gap-2 mt-2">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(list)}
                >
                    Edit
                </Button>
                <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(list._id)}
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default ListCard