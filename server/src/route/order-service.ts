import { Application } from "express";
import { baseUrl } from "../utils/config";
import OrderController from "../controller/order-controller";
import Authorization from "../middleware/auth";

class OrderRoutes {
    private orderController = new OrderController();
    private auth = new Authorization();

    configure(app: Application, apiId: string) {
        app.post(`${baseUrl}/orders/create`, this.auth.jwtVerify, (req, res) =>
            this.orderController.createOrder(req, res, apiId + "01")
        );
        app.get(`${baseUrl}/orders/get`, this.auth.jwtVerify, (req, res) =>
            this.orderController.getOrders(req, res, apiId + "02")
        );
    }
}

export default OrderRoutes;
