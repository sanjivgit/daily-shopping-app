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
const vendor_dao_1 = __importDefault(require("../dao/vendor-dao"));
const vendor_validation_1 = require("../requests-validation/vendor-validation");
const process_vendor_1 = require("../services/process-vendor");
const item_dao_1 = __importDefault(require("../dao/item-dao"));
const config_1 = require("../utils/config");
class VendorController {
    constructor() {
        this.vendorDao = new vendor_dao_1.default();
        this.itemDao = new item_dao_1.default();
    }
    // ---------------- Vendor Registration ----------------
    registerVendor(req, res, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = { apiId, action: "POST", version: "1.0" };
            try {
                const { error, value } = vendor_validation_1.vendorRegisterSchema.validate(req.body);
                if (error)
                    return commonResponse_1.default.BAD_REQUEST(error, response, req, res);
                const existing = yield this.vendorDao.findByEmail(value.email);
                if (existing)
                    return commonResponse_1.default.BAD_REQUEST("Email already exists", response, req, res);
                const vendor = yield this.vendorDao.createVendor(value);
                return commonResponse_1.default.CREATED("Vendor registered successfully", vendor, response, req, res);
            }
            catch (err) {
                return commonResponse_1.default.SERVER_ERROR(err, response, req, res);
            }
        });
    }
    // ---------------- Vendor Login ----------------
    loginVendor(req, res, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = { apiId, action: "POST", version: "1.0" };
            try {
                const { error, value } = vendor_validation_1.vendorLoginSchema.validate(req.body);
                if (error)
                    return commonResponse_1.default.BAD_REQUEST(error, response, req, res);
                const vendor = yield this.vendorDao.loginUser(value);
                return commonResponse_1.default.SUCCESS("Login successful", vendor, response, req, res);
            }
            catch (err) {
                return commonResponse_1.default.SERVER_ERROR(err, response, req, res);
            }
        });
    }
    // ---------------- Add Stock Item ----------------
    addStock(req, res, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = { apiId, action: "POST", version: "1.0" };
            try {
                const vendorId = req.vendor._id;
                const { error, value } = vendor_validation_1.addStockSchema.validate(req.body);
                if (error)
                    return commonResponse_1.default.BAD_REQUEST(error, response, req, res);
                const result = yield this.vendorDao.addStockItem(vendorId, value);
                return commonResponse_1.default.CREATED("Stock item added", result, response, req, res);
            }
            catch (err) {
                return commonResponse_1.default.SERVER_ERROR(err, response, req, res);
            }
        });
    }
    // ---------------- Update Stock Item ----------------
    updateStock(req, res, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = { apiId, action: "PUT", version: "1.0" };
            try {
                const vendorId = req.vendor._id;
                const { error, value } = vendor_validation_1.updateStockSchema.validate(req.body);
                if (error)
                    return commonResponse_1.default.BAD_REQUEST(error, response, req, res);
                const result = yield this.vendorDao.updateStockItem(vendorId, value);
                if (!result)
                    return commonResponse_1.default.NOT_FOUND("Item not found", result, response, req, res);
                return commonResponse_1.default.SUCCESS("Stock item updated", result, response, req, res);
            }
            catch (err) {
                return commonResponse_1.default.SERVER_ERROR(err, response, req, res);
            }
        });
    }
    // ---------------- Delete Stock Item ----------------
    deleteStock(req, res, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = { apiId, action: "DELETE", version: "1.0" };
            try {
                const { itemId } = req.params;
                const vendorId = req.vendor._id;
                const result = yield this.vendorDao.deleteStockItem(vendorId, itemId);
                return commonResponse_1.default.SUCCESS("Stock item deleted", result, response, req, res);
            }
            catch (err) {
                return commonResponse_1.default.SERVER_ERROR(err, response, req, res);
            }
        });
    }
    getStockList(req, res, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = { apiId, action: "GET", version: "1.0" };
            try {
                const vendorId = req.vendor._id;
                const { page = 1, limit = 10 } = req.query;
                const stocks = yield this.vendorDao.getVendorStock(vendorId, Number(page), Number(limit));
                return commonResponse_1.default.SUCCESS("Stock list fetched successfully", stocks, response, req, res);
            }
            catch (err) {
                return commonResponse_1.default.SERVER_ERROR(err, response, req, res);
            }
        });
    }
    getNearbyShops(req, res, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "GET",
                version: "1.0"
            };
            try {
                const listId = req.params.listId;
                const longitude = parseFloat(req.query.longitude);
                const latitude = parseFloat(req.query.latitude);
                const listItems = yield this.itemDao.getItems(listId);
                const shops = yield this.vendorDao.getNearbyShops({
                    longitude,
                    latitude,
                    maxDistanceMeters: Number(config_1.KM_RANGE)
                });
                const processed = (0, process_vendor_1.processVendors)(listItems, shops);
                const tagged = (0, process_vendor_1.tagVendors)(processed);
                return commonResponse_1.default.SUCCESS("Nearby Shops Found", { count: shops.length, shops: tagged }, resObj, req, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error.message, resObj, req, res);
            }
        });
    }
}
exports.default = VendorController;
