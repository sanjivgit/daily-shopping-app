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
const auth_1 = __importDefault(require("../middleware/auth"));
const vendor_model_1 = __importDefault(require("../models/vendor-model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class VendorDao {
    constructor() {
        this.middleware = new auth_1.default();
    }
    createVendor(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordHash = yield bcryptjs_1.default.hash(data.password, 10);
            return yield vendor_model_1.default.create({
                shopName: data.shopName,
                email: data.email,
                passwordHash,
                location: {
                    type: "Point",
                    coordinates: data.location.coordinates
                }
            });
        });
    }
    loginUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            const user = yield vendor_model_1.default.findOne({ email });
            if (!user)
                throw new Error("Invalid Email or Password");
            const match = yield bcryptjs_1.default.compare(password, user.passwordHash);
            if (!match)
                throw new Error("Invalid Email or Password");
            const token = this.middleware.jwtSign(user);
            return { token, user };
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield vendor_model_1.default.findOne({ email });
        });
    }
    addStockItem(vendorId, item) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield vendor_model_1.default.findByIdAndUpdate(vendorId, { $push: { stock: item } }, { new: true });
        });
    }
    updateStockItem(vendorId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield vendor_model_1.default.findOneAndUpdate({ _id: vendorId, "stock._id": updateData.itemId }, {
                $set: {
                    "stock.$.price": updateData.price,
                    "stock.$.availableQty": updateData.availableQty
                }
            }, { new: true });
        });
    }
    deleteStockItem(vendorId, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield vendor_model_1.default.findByIdAndUpdate(vendorId, { $pull: { stock: { _id: itemId } } }, { new: true });
        });
    }
    getVendorStock(vendorId, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const skip = (page - 1) * limit;
            const vendor = yield vendor_model_1.default.findById(vendorId)
                .select({
                shopName: 1,
                location: 1,
                stock: { $slice: [skip, limit] }
            })
                .lean();
            // Get total stock count for pagination metadata
            const totalStock = yield vendor_model_1.default.aggregate([
                { $match: { _id: vendor === null || vendor === void 0 ? void 0 : vendor._id } },
                { $project: { stockCount: { $size: "$stock" } } }
            ]);
            return {
                shopName: vendor === null || vendor === void 0 ? void 0 : vendor.shopName,
                location: vendor === null || vendor === void 0 ? void 0 : vendor.location,
                stock: (vendor === null || vendor === void 0 ? void 0 : vendor.stock) || [],
                total: ((_a = totalStock[0]) === null || _a === void 0 ? void 0 : _a.stockCount) || 0,
                page,
                limit
            };
        });
    }
    getNearbyShops(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            const { longitude, latitude, maxDistanceMeters = 10000 } = criteria;
            return yield vendor_model_1.default.aggregate([
                {
                    $geoNear: {
                        near: {
                            type: "Point",
                            coordinates: [longitude, latitude]
                        },
                        distanceField: "distance",
                        maxDistance: maxDistanceMeters,
                        spherical: true
                    }
                },
                {
                    $project: {
                        passwordHash: 0,
                        __v: 0
                    }
                }
            ]);
        });
    }
}
exports.default = VendorDao;
