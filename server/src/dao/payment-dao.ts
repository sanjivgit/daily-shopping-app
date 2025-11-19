import Razorpay from "razorpay";
import Payment from "../models/payment-model";

class PaymentDAO {
    private razorpay: Razorpay;

    constructor() {
        this.razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID || "",
            key_secret: process.env.RAZORPAY_KEY_SECRET || "",
        });
    }

    async createOrder(amount: number) {
        const options = {
            amount: amount * 100, // Convert to paisa
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        };

        const data = await this.razorpay.orders.create(options);
        return data
    }

    async savePaymentRecord(paymentData: any) {
        return await Payment.create(paymentData);
    }
}

export default PaymentDAO;
