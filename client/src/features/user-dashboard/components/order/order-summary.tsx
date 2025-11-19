import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { FC } from "react"
import { useCreateOrder, usePayment } from "../../services/useShoppingList"
import { RAZORPAY_KEY_ID } from "@/utils/config"
import type { VendorMatch } from "../vendor-matching-panel"
import { goBack } from "@/utils/helper"

interface OrderSummaryProps {
    selectedVendor: VendorMatch | null
}


const OrderSummary: FC<OrderSummaryProps> = ({ selectedVendor }) => {
    if (!selectedVendor || !selectedVendor.availableItems.length) return null

    const paymentMutation = usePayment()
    const createOrderMutation = useCreateOrder()

    const deliveryFee = selectedVendor.distanceKm * 10;

    const handleCheckout = () => {
        paymentMutation.mutate((selectedVendor.totalCost + deliveryFee), {
            onSuccess: (data) => {
                const options = {
                    key: RAZORPAY_KEY_ID,
                    amount: data.amount + deliveryFee,
                    currency: "INR",
                    order_id: data.orderId,
                    name: "Smart Shopping App",
                    description: "Vendor Purchase",
                    theme: { color: "#2A62FF" },
                    handler: function () {
                        createOrderMutation.mutate({
                            vendorId: selectedVendor._id,
                            items: selectedVendor.availableItems.map(item => {
                                return {
                                    name: item.name,
                                    price: item.price,
                                    quantity: item.quantity
                                }
                            }) as any,
                            totalCost: selectedVendor.totalCost,
                            delivery: deliveryFee
                        }, {
                            onSuccess: () => {
                                goBack()
                            }
                        })
                    }
                };

                const payment = new window.Razorpay(options);
                payment.open();
            }
        })
    }

    return (
        <Card className="bg-green-50 border-green-200">
            <CardHeader>
                <CardTitle className="text-green-800">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>₹{selectedVendor.totalCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Delivery Fee:</span>
                        <span>₹{(deliveryFee).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold">
                        <span>Total:</span>
                        <span>₹{(selectedVendor.totalCost + (deliveryFee)).toFixed(2)}</span>
                    </div>
                    <Button onClick={handleCheckout} className="w-full bg-green-600 hover:bg-green-700">
                        Proceed to Payment
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default OrderSummary