"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../utils/config");
const item_controller_1 = __importDefault(require("../controller/item-controller"));
const auth_1 = __importDefault(require("../middleware/auth"));
class ItemsRoutes {
    constructor() {
        this.itemController = new item_controller_1.default();
        this.auth = new auth_1.default();
    }
    configure(app, apiId) {
        app.post(`${config_1.baseUrl}/items/create`, this.auth.jwtVerify, (req, res) => this.itemController.addItem(req, res, apiId + "01"));
        app.get(`${config_1.baseUrl}/items/get/:listId`, this.auth.jwtVerify, (req, res) => this.itemController.getItems(req, res, apiId + "02"));
        app.put(`${config_1.baseUrl}/items/update`, this.auth.jwtVerify, (req, res) => this.itemController.updateListItem(req, res, apiId + "03"));
        app.delete(`${config_1.baseUrl}/items/delete/:itemId`, this.auth.jwtVerify, (req, res) => this.itemController.deleteItem(req, res, apiId + "04"));
    }
}
exports.default = ItemsRoutes;
