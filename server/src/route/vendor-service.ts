'use strict'

import { Application } from "express";
import { baseUrl } from "../utils/config";
import VendorController from "../controller/vendor-controller";
import VendorAuthorization from "../middleware/auth-vendor";
import Authorization from "../middleware/auth";

class VendorRoutes {
    private vendorController = new VendorController();
    private auth = new VendorAuthorization();
    private userAuth = new Authorization()

    configure(app: Application, apiId: string) {
        app.post(`${baseUrl}/vendor/register`,
            (req, res) => this.vendorController.registerVendor(req, res, apiId + "03")
        );

        app.post(`${baseUrl}/vendor/login`,
            (req, res) => this.vendorController.loginVendor(req, res, apiId + "04")
        );

        app.post(`${baseUrl}/vendor/stock`, this.auth.jwtVerify,
            (req, res) => this.vendorController.addStock(req, res, apiId + "05")
        );

        app.put(`${baseUrl}/vendor/stock/update`, this.auth.jwtVerify,
            (req, res) => this.vendorController.updateStock(req, res, apiId + "06")
        );

        app.delete(`${baseUrl}/vendor/stock/delete/:itemId`, this.auth.jwtVerify,
            (req, res) => this.vendorController.deleteStock(req, res, apiId + "07")
        );

        app.get(`${baseUrl}/vendor/stock/get`, this.auth.jwtVerify, (req, res) =>
            this.vendorController.getStockList(req, res, apiId + "08")
        );

        app.get(`${baseUrl}/vendor/nearby/:listId`, this.userAuth.jwtVerify, (req, res) =>
            this.vendorController.getNearbyShops(req, res, apiId + "09")
        );
    }
}

export default VendorRoutes;
