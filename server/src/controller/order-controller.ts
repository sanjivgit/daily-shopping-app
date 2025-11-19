import { Request, Response } from "express";
import CommonRes from "../utils/commonResponse";
import { resObj } from "../utils/types";
import OrderDao from "../dao/order-dao";
import { orderSchema } from "../requests-validation/order-validation";

class OrderController {
    private orderDao: OrderDao;

    constructor() {
        this.orderDao = new OrderDao();
    }

    async createOrder(req: Request, res: Response, apiId: string) {
        const obj: resObj = { apiId, action: "POST", version: "1.0" };

        try {
            const { error, value } = await orderSchema.validate(req.body);
            if (error) return CommonRes.BAD_REQUEST(error, obj, req, res);

            const order = await this.orderDao.createOrder({
                userId: (req as any).user._id,
                ...value,
            });

            return CommonRes.CREATED("Order Placed", order, obj, req, res);
        } catch (error) {
            return CommonRes.SERVER_ERROR(error, obj, req, res);
        }
    }

    async getOrders(req: Request, res: Response, apiId: string) {
        const obj: resObj = { apiId, action: "GET", version: "1.0" };

        try {
            const orders = await this.orderDao.getOrders((req as any).user._id);

            return CommonRes.SUCCESS("Orders Loaded", orders, obj, req, res);
        } catch (error) {
            return CommonRes.SERVER_ERROR(error, obj, req, res);
        }
    }
}

export default OrderController;
