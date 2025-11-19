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
const mongoose_1 = __importDefault(require("mongoose"));
const shopping_list_model_1 = __importDefault(require("../models/shopping-list-model"));
const item_model_1 = __importDefault(require("../models/item-model"));
class ShoppingListDao {
    createList(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield shopping_list_model_1.default.create(data);
        });
    }
    getLists(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield shopping_list_model_1.default.find({ userId }).sort({ createdAt: -1 });
        });
    }
    updateListTitle(listId, userId, title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield shopping_list_model_1.default.findOneAndUpdate({ _id: listId, userId }, { $set: { title } }, { new: true }).lean();
        });
    }
    deleteList(listId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield mongoose_1.default.startSession();
                session.startTransaction();
                const deleteList = yield shopping_list_model_1.default.findOneAndDelete({ _id: listId, userId }, { session });
                yield item_model_1.default.deleteMany({ listId }, { session });
                yield session.commitTransaction();
                session.endSession();
                return deleteList;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ShoppingListDao;
