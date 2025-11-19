"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../utils/config");
const payment_controller_1 = __importDefault(require("../controller/payment-controller"));
const auth_1 = __importDefault(require("../middleware/auth"));
class PaymentRoutes {
    constructor() {
        this.paymentController = new payment_controller_1.default();
        this.auth = new auth_1.default();
    }
    configure(app, apiId) {
        app.post(`${config_1.baseUrl}/payment/create-order`, this.auth.jwtVerify, (req, res) => this.paymentController.createPaymentOrder(req, res, apiId + "80"));
    }
}
exports.default = PaymentRoutes;
