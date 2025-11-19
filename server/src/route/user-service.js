'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../utils/config");
const user_controller_1 = __importDefault(require("../controller/user-controller"));
class UserRoutes {
    constructor() {
        this.userController = new user_controller_1.default();
    }
    configure(app, apiId) {
        app.post(`${config_1.baseUrl}/auth/register`, (req, res) => this.userController.register(req, res, apiId + "01"));
        app.post(`${config_1.baseUrl}/auth/login`, (req, res) => this.userController.login(req, res, apiId + "02"));
    }
}
exports.default = UserRoutes;
