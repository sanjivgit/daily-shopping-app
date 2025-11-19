"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./utils/config");
if (config_1.PORT) {
    app_1.default.listen(config_1.PORT, () => console.log(`Server is running on:- http://localhost:${config_1.PORT}`));
}
else {
    console.log('PORT is not specified in the environment variables.');
}
