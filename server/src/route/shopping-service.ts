import { Application } from "express";
import { baseUrl } from "../utils/config";

import ShoppingListController from "../controller/shopping-list-controller";
import Authorization from "../middleware/auth";

class ShoppingRoutes {
    private listController = new ShoppingListController();
    private auth = new Authorization();

    configure(app: Application, apiId: string) {
        app.post(`${baseUrl}/lists/create`, this.auth.jwtVerify, (req, res) =>
            this.listController.createList(req, res, apiId + "01")
        );
        app.get(`${baseUrl}/lists/get`, this.auth.jwtVerify, (req, res) =>
            this.listController.getLists(req, res, apiId + "02")
        );

        app.put(`${baseUrl}/lists/update`, this.auth.jwtVerify, (req, res) =>
            this.listController.updateListTitle(req, res, apiId + "03")
        );

        app.delete(`${baseUrl}/lists/delete/:listId`, this.auth.jwtVerify, (req, res) =>
            this.listController.deleteList(req, res, apiId + "04")
        );
    }
}

export default ShoppingRoutes;
