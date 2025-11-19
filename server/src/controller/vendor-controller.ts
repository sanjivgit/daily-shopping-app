import { Request, Response } from "express";
import CommonRes from "../utils/commonResponse";
import { resObj } from "../utils/types";
import VendorDao from "../dao/vendor-dao";
import { addStockSchema, updateStockSchema, vendorLoginSchema, vendorRegisterSchema, vendorSchema } from "../requests-validation/vendor-validation";
import { processVendors, tagVendors } from "../services/process-vendor";
import ItemDao from "../dao/item-dao";
import { KM_RANGE } from "../utils/config";

class VendorController {
    private vendorDao: VendorDao;
    private itemDao: ItemDao;

    constructor() {
        this.vendorDao = new VendorDao();
        this.itemDao = new ItemDao()
    }

    // ---------------- Vendor Registration ----------------
    async registerVendor(req: Request, res: Response, apiId: string) {
        const response: resObj = { apiId, action: "POST", version: "1.0" };

        try {
            const { error, value } = vendorRegisterSchema.validate(req.body);
            if (error) return CommonRes.BAD_REQUEST(error, response, req, res);

            const existing = await this.vendorDao.findByEmail(value.email);
            if (existing) return CommonRes.BAD_REQUEST("Email already exists", response, req, res);

            const vendor = await this.vendorDao.createVendor(value);

            return CommonRes.CREATED("Vendor registered successfully", vendor, response, req, res);
        } catch (err) {
            return CommonRes.SERVER_ERROR(err, response, req, res);
        }
    }

    // ---------------- Vendor Login ----------------
    async loginVendor(req: Request, res: Response, apiId: string) {
        const response: resObj = { apiId, action: "POST", version: "1.0" };

        try {
            const { error, value } = vendorLoginSchema.validate(req.body);
            if (error) return CommonRes.BAD_REQUEST(error, response, req, res);

            const vendor = await this.vendorDao.loginUser(value);

            return CommonRes.SUCCESS("Login successful", vendor, response, req, res);
        } catch (err) {
            return CommonRes.SERVER_ERROR(err, response, req, res);
        }
    }

    // ---------------- Add Stock Item ----------------
    async addStock(req: Request, res: Response, apiId: string) {
        const response: resObj = { apiId, action: "POST", version: "1.0" };

        try {
            const vendorId = (req as any).vendor._id;
            const { error, value } = addStockSchema.validate(req.body);
            if (error) return CommonRes.BAD_REQUEST(error, response, req, res);

            const result = await this.vendorDao.addStockItem(vendorId, value);

            return CommonRes.CREATED("Stock item added", result, response, req, res);
        } catch (err) {
            return CommonRes.SERVER_ERROR(err, response, req, res);
        }
    }

    // ---------------- Update Stock Item ----------------
    async updateStock(req: Request, res: Response, apiId: string) {
        const response: resObj = { apiId, action: "PUT", version: "1.0" };

        try {
            const vendorId = (req as any).vendor._id;
            const { error, value } = updateStockSchema.validate(req.body);
            if (error) return CommonRes.BAD_REQUEST(error, response, req, res);

            const result = await this.vendorDao.updateStockItem(vendorId, value);

            if (!result) return CommonRes.NOT_FOUND("Item not found", result, response, req, res);

            return CommonRes.SUCCESS("Stock item updated", result, response, req, res);
        } catch (err) {
            return CommonRes.SERVER_ERROR(err, response, req, res);
        }
    }

    // ---------------- Delete Stock Item ----------------
    async deleteStock(req: Request, res: Response, apiId: string) {
        const response: resObj = { apiId, action: "DELETE", version: "1.0" };

        try {
            const { itemId } = req.params;
            const vendorId = (req as any).vendor._id;
            const result = await this.vendorDao.deleteStockItem(vendorId, itemId);

            return CommonRes.SUCCESS("Stock item deleted", result, response, req, res);
        } catch (err) {
            return CommonRes.SERVER_ERROR(err, response, req, res);
        }
    }

    async getStockList(req: Request, res: Response, apiId: string) {
        const response: resObj = { apiId, action: "GET", version: "1.0" };
        try {
            const vendorId = (req as any).vendor._id;
            const { page = 1, limit = 10 } = req.query;

            const stocks = await this.vendorDao.getVendorStock(vendorId, Number(page), Number(limit));

            return CommonRes.SUCCESS("Stock list fetched successfully", stocks, response, req, res);
        } catch (err) {
            return CommonRes.SERVER_ERROR(err, response, req, res);
        }
    }

    async getNearbyShops(req: Request, res: Response, apiId: string) {
        const resObj = {
            apiId,
            action: "GET",
            version: "1.0"
        };

        try {
            const listId = req.params.listId;
            const longitude = parseFloat(req.query.longitude as string);
            const latitude = parseFloat(req.query.latitude as string);

            const listItems: any = await this.itemDao.getItems(listId);

            const shops = await this.vendorDao.getNearbyShops({
                longitude,
                latitude,
                maxDistanceMeters: Number(KM_RANGE)
            });

            const processed: any = processVendors(listItems, shops);

            const tagged = tagVendors(processed);

            return CommonRes.SUCCESS(
                "Nearby Shops Found",
                { count: shops.length, shops: tagged },
                resObj,
                req,
                res
            );

        } catch (error: any) {
            return CommonRes.SERVER_ERROR(error.message, resObj, req, res);
        }
    }
}

export default VendorController;
