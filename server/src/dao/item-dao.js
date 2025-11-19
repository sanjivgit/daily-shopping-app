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
const item_model_1 = __importDefault(require("../models/item-model"));
class ItemDao {
    addItem(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield item_model_1.default.create(data);
        });
    }
    getItems(listId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield item_model_1.default.find({ listId });
        });
    }
    updateListItem(userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield item_model_1.default.findOneAndUpdate({ _id: updateData.itemId, userId }, {
                $set: {
                    name: updateData.itemName,
                    quantity: updateData.quantity,
                    brandPreference: updateData.brandPreference
                }
            }, { new: true }).lean();
        });
    }
    deleteItem(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield item_model_1.default.findByIdAndDelete(itemId);
        });
    }
}
exports.default = ItemDao;
