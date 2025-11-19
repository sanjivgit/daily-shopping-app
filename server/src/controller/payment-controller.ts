import { Request, Response } from "express";
import CommonRes from "../utils/commonResponse";
import PaymentDAO from "../dao/payment-dao";

class PaymentController {
    private paymentDao: PaymentDAO;

    constructor() {
        this.paymentDao = new PaymentDAO();
    }

    // POST: Create Order & Save Payment Record
    async createPaymentOrder(req: Request, res: Response, apiId: string) {
        const resObj = {
            apiId,
            action: "POST",
            version: "1.0"
        };

        try {
            const { amount } = req.body;

            // Create order through Razorpay
            const razorpayOrder = await this.paymentDao.createOrder(amount);

            // Save record in DB
            const savedRecord = await this.paymentDao.savePaymentRecord({
                orderId: razorpayOrder.id,
                amount: amount,
                currency: razorpayOrder.currency,
                status: "Paid",
                receipt: razorpayOrder.receipt
            });

            return CommonRes.CREATED(
                "Payment order created successfully",
                savedRecord,
                resObj,
                req,
                res
            );

        } catch (error: any) {
            return CommonRes.SERVER_ERROR(error.message, resObj, req, res);
        }
    }
}

export default PaymentController;
