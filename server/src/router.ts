import { Application } from "express";
import ShoppingRoutes from "./route/shopping-service";
import UserRoutes from "./route/user-service";
import VendorRoutes from "./route/vendor-service";
import PaymentRoutes from "./route/payment-service";
import OrderRoutes from "./route/order-service";
import ItemsRoutes from "./route/items-services";

class ShoppingServicesRouter {
    constructor(app: Application) {
        new UserRoutes().configure(app, "01");

        new ShoppingRoutes().configure(app, "02");

        new VendorRoutes().configure(app, "03");

        new PaymentRoutes().configure(app, "04")

        new OrderRoutes().configure(app, "05")

        new ItemsRoutes().configure(app, "06")
    }
}

export default ShoppingServicesRouter;