import { Button } from '@/components/ui/button'
import ShoppingListsPanel from './components/shopping-list'
import { useNavigate } from 'react-router'

export default function Dashboard() {
    const navigate = useNavigate()

    const handleNavigateMyOrder = () => {
        navigate("/dashboard/order-list")
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* <Navigation /> */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 gap-6">
                    <Button onClick={handleNavigateMyOrder} className='w-32 mb-2'>My Orders</Button>
                    <div className="col-span-1">
                        <div className="bg-white rounded-lg shadow p-4 sticky top-20">
                            <h3 className="font-bold text-lg mb-4">Shopping Lists</h3>
                            <ShoppingListsPanel />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
