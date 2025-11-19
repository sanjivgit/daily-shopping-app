import { PORT } from "./config";
import { Application } from "express";

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

export const swaggerSetup = (app: Application) => {

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
          url: `https://sanjivworkshop.ddnsfree.com/api/v1/shopping-list`,
          description: "development server through tunnel",
        },
      ]
    },
    apis: ["./src/**/*.yml"],
  };

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsdoc(swaggerDocument), {
      swaggerOptions: {
        persistAuthorization: true
      }
    })
  );
};
