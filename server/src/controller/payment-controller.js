"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commonResponse_1 = __importDefault(require("../utils/commonResponse"));
const payment_dao_1 = __importDefault(require("../dao/payment-dao"));
class PaymentController {
    constructor() {
        this.paymentDao = new payment_dao_1.default();
    }
    // POST: Create Order & Save Payment Record
    createPaymentOrder(req, res, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "POST",
                version: "1.0"
            };
            try {
                const { amount } = req.body;
                // Create order through Razorpay
                const razorpayOrder = yield this.paymentDao.createOrder(amount);
                // Save record in DB
                const savedRecord = yield this.paymentDao.savePaymentRecord({
                    orderId: razorpayOrder.id,
                    amount: amount,
                    currency: razorpayOrder.currency,
                    status: "Paid",
                    receipt: razorpayOrder.receipt
                });
                return commonResponse_1.default.CREATED("Payment order created successfully", savedRecord, resObj, req, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error.message, resObj, req, res);
            }
        });
    }
}
exports.default = PaymentController;
