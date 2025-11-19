import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Phone } from 'lucide-react';
import moment from 'moment';

interface OrderDetailsPageProps {
    orderDetails: any;
    onBack: () => void;
}

export function OrderDetailsPage({ orderDetails, onBack }: OrderDetailsPageProps) {

    return (
        <div className="space-y-6 p-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button onClick={onBack} variant="outline" size="sm">
                        <ArrowLeft size={16} /> Back
                    </Button>
                    <div>
                        <span className="text-lg font-bold">Order {orderDetails._id}</span>
                        <p className="text-muted-foreground">Ordered on {moment(orderDetails.createdAt).format("MMM Do YY")}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Vendor Information */}
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="text-lg">Vendor Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start justify-between pb-4 border-b border-border">
                                <div>
                                    <p className="font-bold text-lg">{orderDetails.vendorId.shopName}</p>
                                    <div className="flex items-center gap-2 mt-2 text-muted-foreground text-sm">
                                        <MapPin size={16} />
                                        {JSON.stringify(orderDetails.vendorId.location.coordinates)}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
                                        <Phone size={16} />
                                        {orderDetails.vendorId.email}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Order Items */}
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="text-lg">Order Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {orderDetails?.items.map((item: any) => (
                                    <div key={item._id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                                        <div className="flex-1">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-muted-foreground text-sm">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-muted-foreground text-sm">₹{item.price} each</p>
                                            <p className="font-bold">₹{item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar - Price Summary & Actions */}
                <div className="space-y-6">
                    {/* Price Summary */}
                    <Card className="bg-card border-border sticky top-4">
                        <CardHeader>
                            <CardTitle className="text-lg">Price Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">Subtotal</p>
                                <p className="font-medium">₹{orderDetails.totalCost}</p>
                            </div>
                            <div className="flex justify-between pb-3 border-b border-border">
                                <p className="text-muted-foreground">Delivery</p>
                                <p className="font-medium">₹{orderDetails?.delivery}</p>
                            </div>
                            <div className="flex justify-between text-lg">
                                <p className="font-bold">Total</p>
                                <p className="font-bold text-primary">₹{orderDetails.totalCost + orderDetails.delivery}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}