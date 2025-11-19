"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const user_dao_1 = __importDefault(require("../dao/user-dao"));
const user_validation_1 = __importStar(require("../requests-validation/user-validation"));
class UserController {
    constructor() {
        this.userDao = new user_dao_1.default();
    }
    // POST /api/auth/register
    register(req, res, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resJson = { apiId, action: "POST", version: "1.0" };
            try {
                const { error, value } = yield user_validation_1.default.validate(req.body);
                if (error)
                    return commonResponse_1.default.BAD_REQUEST(error, resJson, req, res);
                const user = yield this.userDao.registerUser(value);
                return commonResponse_1.default.CREATED("User Registered Successfully", user, resJson, req, res);
            }
            catch (err) {
                return commonResponse_1.default.SERVER_ERROR(err, resJson, req, res);
            }
        });
    }
    // POST /api/auth/login
    login(req, res, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resJson = { apiId, action: "POST", version: "1.0" };
            try {
                const { error, value } = yield user_validation_1.loginValidationSchema.validate(req.body);
                if (error)
                    return commonResponse_1.default.BAD_REQUEST(error, resJson, req, res);
                const data = yield this.userDao.loginUser(value);
                return commonResponse_1.default.SUCCESS("Login Successful", data, resJson, req, res);
            }
            catch (err) {
                return commonResponse_1.default.SERVER_ERROR(err, resJson, req, res);
            }
        });
    }
}
exports.default = UserController;
