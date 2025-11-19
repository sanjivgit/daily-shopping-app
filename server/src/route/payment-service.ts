import { Application } from "express";
import { baseUrl } from "../utils/config";
import PaymentController from "../controller/payment-controller";
import Authorization from "../middleware/auth";

class PaymentRoutes {
    private paymentController: PaymentController;
    private auth: Authorization;

    constructor() {
        this.paymentController = new PaymentController();
        this.auth = new Authorization()
    }

    configure(app: Application, apiId: string) {
        app.post(
            `${baseUrl}/payment/create-order`,
            this.auth.jwtVerify,
            (req, res) => this.paymentController.createPaymentOrder(req, res, apiId + "80")
        );
    }
}

export default PaymentRoutes;
