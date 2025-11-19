import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetMatchedVendor } from '../services/useShoppingList'
import OrderSummary from './order/order-summary'
import { toast } from 'sonner'

interface Item {
    id: string
    name: string
    quantity: number
    price: number
    brandPreference: string
}

export interface VendorMatch {
    _id: string
    name: string
    distanceKm: number
    coverage: number
    totalCost: number
    tag: 'Nearest' | 'Cheapest' | 'Best Coverage'
    availableItems: Item[]
    missingItems: Item[]
}

interface VendorMatchingPanelProps {
    listId: string;
    title: string;
}

export default function VendorMatchingPanel({ title, listId }: VendorMatchingPanelProps) {
    const [selectedVendor, setSelectedVendor] = useState<VendorMatch | null>(null)

    const { data, isLoading } = useGetMatchedVendor(listId)

    const handleSelectVendor = (vendor: any) => {
        if (!vendor.availableItems.length) {
            toast("Zero matching items")
        }
        setSelectedVendor(vendor)
    }

    return (
        <div className="space-y-4 h-[calc(100vh-65px)] overflow-y-auto p-4">
            <div>
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Nearby Vendors</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? <span>Loading...</span> : data?.shops?.length === 0 ? (
                        <p className="text-gray-500">Add items to your list to find vendors</p>
                    ) : (
                        <div className="space-y-3">
                            {data?.shops?.map((vendor: any) => (
                                <div
                                    key={vendor.id}
                                    className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedVendor?._id === vendor._id ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
                                        }`}
                                    onClick={() => handleSelectVendor(vendor)}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="font-semibold text-lg">{vendor.shopName}</div>
                                            <div className='flex items-center gap-2'>
                                                {vendor.tags.map((tag: string) => (
                                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded mt-1">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-lg">₹{vendor.totalCost.toFixed(2)}</div>
                                            <div className="text-sm text-gray-600">{vendor.distanceKm} km away</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mt-4">
                                        <div>
                                            <div className="text-sm text-gray-600">Coverage</div>
                                            <div className="font-bold text-lg">{vendor.coveragePercent}%</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Available</div>
                                            <div className="font-bold text-lg">{vendor.availableItems.length}/{vendor.availableItems.length + vendor.missingItems.length}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Missing</div>
                                            <div className="font-bold text-lg">{vendor.missingItems.length}</div>
                                        </div>
                                    </div>

                                    {selectedVendor?._id === vendor._id && vendor.missingItems.length > 0 && (
                                        <div className="mt-4 p-3 bg-yellow-50 rounded">
                                            <div className="text-sm font-semibold mb-2">Missing Items:</div>
                                            <ul className="text-sm space-y-1">
                                                {vendor.missingItems.map((item: any) => (
                                                    <li key={item._id}>• {item.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <OrderSummary selectedVendor={selectedVendor} />

        </div>
    )
}
