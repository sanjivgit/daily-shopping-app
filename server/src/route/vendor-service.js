'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../utils/config");
const vendor_controller_1 = __importDefault(require("../controller/vendor-controller"));
const auth_vendor_1 = __importDefault(require("../middleware/auth-vendor"));
const auth_1 = __importDefault(require("../middleware/auth"));
class VendorRoutes {
    constructor() {
        this.vendorController = new vendor_controller_1.default();
        this.auth = new auth_vendor_1.default();
        this.userAuth = new auth_1.default();
    }
    configure(app, apiId) {
        app.post(`${config_1.baseUrl}/vendor/register`, (req, res) => this.vendorController.registerVendor(req, res, apiId + "03"));
        app.post(`${config_1.baseUrl}/vendor/login`, (req, res) => this.vendorController.loginVendor(req, res, apiId + "04"));
        app.post(`${config_1.baseUrl}/vendor/stock`, this.auth.jwtVerify, (req, res) => this.vendorController.addStock(req, res, apiId + "05"));
        app.put(`${config_1.baseUrl}/vendor/stock/update`, this.auth.jwtVerify, (req, res) => this.vendorController.updateStock(req, res, apiId + "06"));
        app.delete(`${config_1.baseUrl}/vendor/stock/delete/:itemId`, this.auth.jwtVerify, (req, res) => this.vendorController.deleteStock(req, res, apiId + "07"));
        app.get(`${config_1.baseUrl}/vendor/stock/get`, this.auth.jwtVerify, (req, res) => this.vendorController.getStockList(req, res, apiId + "08"));
        app.get(`${config_1.baseUrl}/vendor/nearby/:listId`, this.userAuth.jwtVerify, (req, res) => this.vendorController.getNearbyShops(req, res, apiId + "09"));
    }
}
exports.default = VendorRoutes;
