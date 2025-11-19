"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../utils/config");
const shopping_list_controller_1 = __importDefault(require("../controller/shopping-list-controller"));
const auth_1 = __importDefault(require("../middleware/auth"));
class ShoppingRoutes {
    constructor() {
        this.listController = new shopping_list_controller_1.default();
        this.auth = new auth_1.default();
    }
    configure(app, apiId) {
        app.post(`${config_1.baseUrl}/lists/create`, this.auth.jwtVerify, (req, res) => this.listController.createList(req, res, apiId + "01"));
        app.get(`${config_1.baseUrl}/lists/get`, this.auth.jwtVerify, (req, res) => this.listController.getLists(req, res, apiId + "02"));
        app.put(`${config_1.baseUrl}/lists/update`, this.auth.jwtVerify, (req, res) => this.listController.updateListTitle(req, res, apiId + "03"));
        app.delete(`${config_1.baseUrl}/lists/delete/:listId`, this.auth.jwtVerify, (req, res) => this.listController.deleteList(req, res, apiId + "04"));
    }
}
exports.default = ShoppingRoutes;
