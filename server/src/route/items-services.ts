import { Application } from "express";
import { baseUrl } from "../utils/config";
import ItemController from "../controller/item-controller";
import Authorization from "../middleware/auth";

class ItemsRoutes {
    private itemController = new ItemController();
    private auth = new Authorization();

    configure(app: Application, apiId: string) {
        app.post(`${baseUrl}/items/create`, this.auth.jwtVerify, (req, res) =>
            this.itemController.addItem(req, res, apiId + "01")
        );
        app.get(`${baseUrl}/items/get/:listId`, this.auth.jwtVerify, (req, res) =>
            this.itemController.getItems(req, res, apiId + "02")
        );
        app.put(`${baseUrl}/items/update`, this.auth.jwtVerify, (req, res) =>
            this.itemController.updateListItem(req, res, apiId + "03")
        );
        app.delete(`${baseUrl}/items/delete/:itemId`, this.auth.jwtVerify, (req, res) =>
            this.itemController.deleteItem(req, res, apiId + "04")
        );
    }
}

export default ItemsRoutes;
