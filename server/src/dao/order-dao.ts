import Order from "../models/order-model";

class OrderDao {
    async createOrder(data: any) {
        try {
            return await Order.create(data);
        } catch (error) {
            throw error
        }
    }

    async getOrders(userId: string) {
        return await Order.find({ userId }).populate({
            path: "vendorId",
            select: "shopName email location"
        }).sort({ createdAt: -1 });
    }
}

export default OrderDao;
