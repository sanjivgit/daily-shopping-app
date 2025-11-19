import ItemsPanel from '@/features/user-dashboard/components/list-items'
import { useLocation, useParams } from 'react-router'

export default function ItemsPanelPage() {
    const { listId } = useParams()
    const { state } = useLocation();

    return (
        <ItemsPanel listId={listId || ""} title={state.title} />
    )
}
