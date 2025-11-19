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
const item_dao_1 = __importDefault(require("../dao/item-dao"));
const item_validation_1 = require("../requests-validation/item-validation");
class ItemController {
    constructor() {
        this.itemDao = new item_dao_1.default();
    }
    addItem(req, res, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = { apiId, action: "POST", version: "1.0" };
            try {
                const { error, value } = yield item_validation_1.addItemSchema.validate(req.body);
                if (error)
                    return commonResponse_1.default.BAD_REQUEST(error, obj, req, res);
                const item = yield this.itemDao.addItem(value);
                return commonResponse_1.default.CREATED("Item Added", item, obj, req, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, obj, req, res);
            }
        });
    }
    getItems(req, res, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = { apiId, action: "GET", version: "1.0" };
            try {
                const items = yield this.itemDao.getItems(req.params.listId);
                return commonResponse_1.default.SUCCESS("Items Loaded", items, obj, req, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, obj, req, res);
            }
        });
    }
    updateListItem(req, res, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "PUT",
                version: "1.0"
            };
            try {
                const userId = req.user.id;
                const { error, value } = yield item_validation_1.updateListItemSchema.validate(req.body);
                if (error) {
                    return commonResponse_1.default.BAD_REQUEST(error.message, resObj, req, res);
                }
                const updatedList = yield this.itemDao.updateListItem(userId, value);
                if (!updatedList) {
                    return commonResponse_1.default.NOT_FOUND("List or Item Not Found", null, resObj, req, res);
                }
                return commonResponse_1.default.SUCCESS("Item Updated Successfully", updatedList, resObj, req, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error.message, resObj, req, res);
            }
        });
    }
    deleteItem(req, res, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = { apiId, action: "DELETE", version: "1.0" };
            try {
                const deleted = yield this.itemDao.deleteItem(req.params.itemId);
                if (!deleted)
                    return commonResponse_1.default.NOT_FOUND("Item Not Found", {}, obj, req, res);
                return commonResponse_1.default.SUCCESS("Item Deleted", deleted, obj, req, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, obj, req, res);
            }
        });
    }
}
exports.default = ItemController;
