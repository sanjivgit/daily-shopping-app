"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shopping_service_1 = __importDefault(require("./route/shopping-service"));
const user_service_1 = __importDefault(require("./route/user-service"));
const vendor_service_1 = __importDefault(require("./route/vendor-service"));
const payment_service_1 = __importDefault(require("./route/payment-service"));
const order_service_1 = __importDefault(require("./route/order-service"));
const items_services_1 = __importDefault(require("./route/items-services"));
class ShoppingServicesRouter {
    constructor(app) {
        new user_service_1.default().configure(app, "01");
        new shopping_service_1.default().configure(app, "02");
        new vendor_service_1.default().configure(app, "03");
        new payment_service_1.default().configure(app, "04");
        new order_service_1.default().configure(app, "05");
        new items_services_1.default().configure(app, "06");
    }
}
exports.default = ShoppingServicesRouter;
