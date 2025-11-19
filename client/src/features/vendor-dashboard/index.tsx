import { Card, CardContent } from '@/components/ui/card'
import Navigation from '@/layout/navigation'
import VendorStockManager from './components/vendor-stock-manager'
import { useSelector } from 'react-redux'

export default function VendorDashboard() {
    const user = useSelector((state: any) => state.vendorAuth.vendor)

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Vendor Dashboard</h1>
                    <p className="text-gray-600">Manage your inventory and view analytics</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-sm text-gray-600">Store Name</div>
                            <div className="text-2xl font-bold">{user?.user?.shopName}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-sm text-gray-600">Location</div>
                            <div className="text-lg font-bold">{JSON.stringify(user?.user?.location?.coordinates)}</div>
                        </CardContent>
                    </Card>
                </div>

                <VendorStockManager />
            </div>
        </div>
    )
}
