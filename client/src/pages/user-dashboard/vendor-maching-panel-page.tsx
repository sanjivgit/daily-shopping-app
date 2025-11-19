import VendorMatchingPanel from '@/features/user-dashboard/components/vendor-matching-panel';
import { useLocation, useParams } from 'react-router'

export default function VendorMatchingPanelPage() {
    const { listId } = useParams()
    const { state } = useLocation();

    return (
        <VendorMatchingPanel listId={listId || ""} title={state.title} />
    )
}
