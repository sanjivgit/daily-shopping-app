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
const commonResponse_1 = __importDefault(require("../utils/commonResponse"));
const shopping_list_dao_1 = __importDefault(require("../dao/shopping-list-dao"));
const shopping_list_validation_1 = require("../requests-validation/shopping-list-validation");
class ShoppingListController {
    constructor() {
        this.listDao = new shopping_list_dao_1.default();
    }
    // CREATE
    createList(req, res, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = { apiId, action: "POST", version: "1.0" };
            try {
                const userId = req.user._id;
                const { error, value } = yield shopping_list_validation_1.createListSchema.validate(req.body);
                if (error)
                    return commonResponse_1.default.BAD_REQUEST(error, obj, req, res);
                const list = yield this.listDao.createList({
                    userId,
                    title: value.title,
                });
                return commonResponse_1.default.CREATED("List Created Successfully", list, obj, req, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, obj, req, res);
            }
        });
    }
    // GET LISTS
    getLists(req, res, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = { apiId, action: "GET", version: "1.0" };
            try {
                const lists = yield this.listDao.getLists(req.user._id);
                return commonResponse_1.default.SUCCESS("Lists Loaded", lists, obj, req, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, obj, req, res);
            }
        });
    }
    updateListTitle(req, res, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = { apiId, action: "PUT", version: "1.0" };
            try {
                const userId = req.user._id; // from auth middleware
                const { error, value } = yield shopping_list_validation_1.updateListTitleSchema.validate(req.body);
                if (error) {
                    return commonResponse_1.default.BAD_REQUEST(error, obj, req, res);
                }
                const { listId, title } = value;
                const updatedList = yield this.listDao.updateListTitle(listId, userId, title);
                if (!updatedList) {
                    return commonResponse_1.default.NOT_FOUND("Shopping list not found", null, obj, req, res);
                }
                return commonResponse_1.default.SUCCESS("List title updated", updatedList, obj, req, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error.message, obj, req, res);
            }
        });
    }
    // DELETE LIST
    deleteList(req, res, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = { apiId, action: "DELETE", version: "1.0" };
            try {
                const deleted = yield this.listDao.deleteList(req.params.listId, req.user._id);
                if (!deleted)
                    return commonResponse_1.default.NOT_FOUND("List Not Found", {}, obj, req, res);
                return commonResponse_1.default.SUCCESS("List Deleted", deleted, obj, req, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, obj, req, res);
            }
        });
    }
}
exports.default = ShoppingListController;
