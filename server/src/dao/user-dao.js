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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user-model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = __importDefault(require("../middleware/auth"));
class AuthDao {
    constructor() {
        this.middleware = new auth_1.default();
    }
    registerUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, location } = data;
            const existing = yield user_model_1.default.findOne({ email });
            if (existing)
                throw new Error("Email already exists");
            const passwordHash = yield bcryptjs_1.default.hash(password, 10);
            const user = yield user_model_1.default.create({
                name,
                email,
                passwordHash,
                location: {
                    type: "Point",
                    coordinates: location.coordinates
                }
            });
            return user;
        });
    }
    loginUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            const user = yield user_model_1.default.findOne({ email });
            if (!user)
                throw new Error("Invalid Email or Password");
            const match = yield bcryptjs_1.default.compare(password, user.passwordHash);
            if (!match)
                throw new Error("Invalid Email or Password");
            const token = this.middleware.jwtSign(user);
            const { passwordHash } = user, userData = __rest(user, ["passwordHash"]);
            return { token, user: userData };
        });
    }
}
exports.default = AuthDao;
