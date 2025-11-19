"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSetup = void 0;
const config_1 = require("./config");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerSetup = (app) => {
    const swaggerDocument = {
        failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Sopping Site",
                version: "1.0.0",
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                        description: "Enter your JWT token in the format: Bearer <token>"
                    }
                }
            },
            servers: [
                {
                    url: `http://localhost:${config_1.PORT}/api/v1/shopping-list`,
                    description: "development server through tunnel",
                },
            ]
        },
        apis: ["./src/**/*.yml"],
    };
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerDocument), {
        swaggerOptions: {
            persistAuthorization: true
        }
    }));
};
exports.swaggerSetup = swaggerSetup;
