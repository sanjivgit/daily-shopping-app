import { Request, Response } from "express";
import CommonRes from "../utils/commonResponse";
import { resObj } from "../utils/types";
import ShoppingListDao from "../dao/shopping-list-dao";
import { createListSchema, updateListTitleSchema } from "../requests-validation/shopping-list-validation";

class ShoppingListController {
    private listDao: ShoppingListDao;

    constructor() {
        this.listDao = new ShoppingListDao();
    }

    // CREATE
    async createList(req: any, res: Response, apiId: string) {
        const obj: resObj = { apiId, action: "POST", version: "1.0" };

        try {
            const userId = req.user._id;
            const { error, value } = await createListSchema.validate(req.body);
            if (error) return CommonRes.BAD_REQUEST(error, obj, req, res);

            const list = await this.listDao.createList({
                userId,
                title: value.title,
            });

            return CommonRes.CREATED("List Created Successfully", list, obj, req, res);
        } catch (error) {
            return CommonRes.SERVER_ERROR(error, obj, req, res);
        }
    }

    // GET LISTS
    async getLists(req: Request, res: Response, apiId: string) {
        const obj: resObj = { apiId, action: "GET", version: "1.0" };

        try {
            const lists = await this.listDao.getLists((req as any).user._id);

            return CommonRes.SUCCESS("Lists Loaded", lists, obj, req, res);
        } catch (error) {
            return CommonRes.SERVER_ERROR(error, obj, req, res);
        }
    }

    async updateListTitle(req: Request, res: Response, apiId: string) {
        const obj: resObj = { apiId, action: "PUT", version: "1.0" };
        try {
            const userId = (req as any).user._id; // from auth middleware

            const { error, value } = await updateListTitleSchema.validate(req.body);

            if (error) {
                return CommonRes.BAD_REQUEST(error, obj, req, res);
            }

            const { listId, title } = value;

            const updatedList = await this.listDao.updateListTitle(
                listId,
                userId,
                title
            );

            if (!updatedList) {
                return CommonRes.NOT_FOUND("Shopping list not found", null, obj, req, res);
            }

            return CommonRes.SUCCESS("List title updated", updatedList, obj, req, res);
        } catch (error: any) {
            return CommonRes.SERVER_ERROR(error.message, obj, req, res);
        }
    }

    // DELETE LIST
    async deleteList(req: Request, res: Response, apiId: string) {
        const obj: resObj = { apiId, action: "DELETE", version: "1.0" };

        try {
            const deleted = await this.listDao.deleteList(
                req.params.listId,
                (req as any).user._id
            );

            if (!deleted)
                return CommonRes.NOT_FOUND("List Not Found", {}, obj, req, res);

            return CommonRes.SUCCESS("List Deleted", deleted, obj, req, res);
        } catch (error) {
            return CommonRes.SERVER_ERROR(error, obj, req, res);
        }
    }
}

export default ShoppingListController;
