"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_setup_1 = require("./utils/swagger-setup");
const db_1 = __importDefault(require("./config/db"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, swagger_setup_1.swaggerSetup)(app);
(0, db_1.default)();
new router_1.default(app);
exports.default = app;
