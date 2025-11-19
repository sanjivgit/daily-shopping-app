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
const order_dao_1 = __importDefault(require("../dao/order-dao"));
const order_validation_1 = require("../requests-validation/order-validation");
class OrderController {
    constructor() {
        this.orderDao = new order_dao_1.default();
    }
    createOrder(req, res, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = { apiId, action: "POST", version: "1.0" };
            try {
                const { error, value } = yield order_validation_1.orderSchema.validate(req.body);
                if (error)
                    return commonResponse_1.default.BAD_REQUEST(error, obj, req, res);
                const order = yield this.orderDao.createOrder(Object.assign({ userId: req.user._id }, value));
                return commonResponse_1.default.CREATED("Order Placed", order, obj, req, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, obj, req, res);
            }
        });
    }
    getOrders(req, res, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = { apiId, action: "GET", version: "1.0" };
            try {
                const orders = yield this.orderDao.getOrders(req.user._id);
                return commonResponse_1.default.SUCCESS("Orders Loaded", orders, obj, req, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, obj, req, res);
            }
        });
    }
}
exports.default = OrderController;
