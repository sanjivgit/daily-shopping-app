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
const razorpay_1 = __importDefault(require("razorpay"));
const payment_model_1 = __importDefault(require("../models/payment-model"));
class PaymentDAO {
    constructor() {
        this.razorpay = new razorpay_1.default({
            key_id: process.env.RAZORPAY_KEY_ID || "",
            key_secret: process.env.RAZORPAY_KEY_SECRET || "",
        });
    }
    createOrder(amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                amount: amount * 100, // Convert to paisa
                currency: "INR",
                receipt: "receipt_" + Date.now(),
            };
            const data = yield this.razorpay.orders.create(options);
            return data;
        });
    }
    savePaymentRecord(paymentData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield payment_model_1.default.create(paymentData);
        });
    }
}
exports.default = PaymentDAO;
