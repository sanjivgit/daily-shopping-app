import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';
import { OrderDetailsPage } from './order-details';
import { useGetOrderList } from '../../services/useShoppingList';
import moment from 'moment'

export function OrdersPage() {
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    const { data, isLoading } = useGetOrderList()

    if (selectedOrder) {
        return (
            <OrderDetailsPage orderDetails={selectedOrder} onBack={() => setSelectedOrder(null)} />
        );
    }

    return (
        <div className="space-y-6 p-4 h-[calc(100vh-65px)] overflow-y-auto">
            <div>
                <h1 className="text-3xl font-bold">My Orders</h1>
                <p className="text-muted-foreground mt-1">
                    Track and manage your orders from various vendors
                </p>
            </div>

            {/* Orders List */}
            {isLoading ? <span>Loading....</span> : data?.length === 0 ? (
                <Card className="bg-card border-border">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Package size={48} className="text-muted-foreground mb-4" />
                        <h3 className="font-semibold mb-2">No orders found</h3>
                        <p className="text-muted-foreground text-sm">
                            Your orders will appear here
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {data?.map((order: any) => (
                        <Card
                            key={order._id}
                            className="bg-card border-border hover:border-primary/50 cursor-pointer transition-colors"
                            onClick={() => setSelectedOrder(order)}
                        >
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-lg">{order.vendor}</CardTitle>
                                        <p className="text-muted-foreground text-sm mt-1">
                                            Order ID: {order._id} • Ordered on {moment(order.createdAt).format("MMM Do YY")}
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div>
                                        <p className="text-muted-foreground text-sm mb-1">Items</p>
                                        <p className="font-bold text-lg">{order.items.length}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm mb-1">Total</p>
                                        <p className="font-bold text-lg">₹{order.totalCost + order.delivery}</p>
                                    </div>
                                    <div className="hidden sm:block">
                                        <p className="text-muted-foreground text-sm mb-1">Date</p>
                                        <p className="font-medium">{moment(order.createdAt).format("MMM Do YY")}</p>
                                    </div>
                                    <div className="flex items-end justify-end sm:justify-start">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedOrder(order);
                                            }}
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
