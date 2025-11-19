"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../utils/config");
const order_controller_1 = __importDefault(require("../controller/order-controller"));
const auth_1 = __importDefault(require("../middleware/auth"));
class OrderRoutes {
    constructor() {
        this.orderController = new order_controller_1.default();
        this.auth = new auth_1.default();
    }
    configure(app, apiId) {
        app.post(`${config_1.baseUrl}/orders/create`, this.auth.jwtVerify, (req, res) => this.orderController.createOrder(req, res, apiId + "01"));
        app.get(`${config_1.baseUrl}/orders/get`, this.auth.jwtVerify, (req, res) => this.orderController.getOrders(req, res, apiId + "02"));
    }
}
exports.default = OrderRoutes;
