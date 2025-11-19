import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { swaggerSetup } from './utils/swagger-setup';
import connectDB from "./config/db";
import ShoppingServicesRouter from './router';

const app = express();
dotenv.config();
app.use(cors());

app.use(express.json());

swaggerSetup(app);

connectDB();

new ShoppingServicesRouter(app)

export default app;