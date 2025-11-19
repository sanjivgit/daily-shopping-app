import { Request, Response } from "express";
import CommonRes from "../utils/commonResponse";
import { resObj } from "../utils/types";
import ItemDao from "../dao/item-dao";
import { addItemSchema, updateListItemSchema } from "../requests-validation/item-validation";

class ItemController {
    private itemDao: ItemDao;

    constructor() {
        this.itemDao = new ItemDao();
    }

    async addItem(req: Request, res: Response, apiId: string) {
        const obj: resObj = { apiId, action: "POST", version: "1.0" };

        try {
            const { error, value } = await addItemSchema.validate(req.body);
            if (error) return CommonRes.BAD_REQUEST(error, obj, req, res);

            const item = await this.itemDao.addItem(value);

            return CommonRes.CREATED("Item Added", item, obj, req, res);
        } catch (error) {
            return CommonRes.SERVER_ERROR(error, obj, req, res);
        }
    }

    async getItems(req: Request, res: Response, apiId: string) {
        const obj: resObj = { apiId, action: "GET", version: "1.0" };

        try {
            const items = await this.itemDao.getItems(req.params.listId);

            return CommonRes.SUCCESS("Items Loaded", items, obj, req, res);
        } catch (error) {
            return CommonRes.SERVER_ERROR(error, obj, req, res);
        }
    }

    async updateListItem(req: Request, res: Response, apiId: string) {
        const resObj = {
            apiId,
            action: "PUT",
            version: "1.0"
        };

        try {
            const userId = (req as any).user.id;

            const { error, value } = await updateListItemSchema.validate(req.body);
            if (error) {
                return CommonRes.BAD_REQUEST(error.message, resObj, req, res);
            }

            const updatedList = await this.itemDao.updateListItem(
                userId,
                value
            );

            if (!updatedList) {
                return CommonRes.NOT_FOUND("List or Item Not Found", null, resObj, req, res);
            }

            return CommonRes.SUCCESS("Item Updated Successfully", updatedList, resObj, req, res);

        } catch (error: any) {
            return CommonRes.SERVER_ERROR(error.message, resObj, req, res);
        }
    }

    async deleteItem(req: Request, res: Response, apiId: string) {
        const obj: resObj = { apiId, action: "DELETE", version: "1.0" };

        try {
            const deleted = await this.itemDao.deleteItem(req.params.itemId);
            if (!deleted) return CommonRes.NOT_FOUND("Item Not Found", {}, obj, req, res);

            return CommonRes.SUCCESS("Item Deleted", deleted, obj, req, res);
        } catch (error) {
            return CommonRes.SERVER_ERROR(error, obj, req, res);
        }
    }
}

export default ItemController;
