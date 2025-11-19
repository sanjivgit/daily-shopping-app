'use strict';

import { Application } from "express";
import { baseUrl } from "../utils/config";
import UserController from "../controller/user-controller";

class UserRoutes {
    private userController: UserController;

    constructor() {
        this.userController = new UserController();
    }

    configure(app: Application, apiId: string) {
        app.post(`${baseUrl}/auth/register`,
            (req, res) => this.userController.register(req, res, apiId + "01")
        );

        app.post(`${baseUrl}/auth/login`,
            (req, res) => this.userController.login(req, res, apiId + "02")
        );
    }
}

export default UserRoutes;
