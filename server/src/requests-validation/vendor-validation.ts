import Joi from "joi";

export const vendorRegisterSchema = Joi.object({
    shopName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    location: Joi.object({
        coordinates: Joi.array()
            .items(
                Joi.number().required(),  // longitude
                Joi.number().required()   // latitude
            )
            .length(2)
            .required()
    }).required()
}).options({ abortEarly: false });

export const vendorLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
}).options({ abortEarly: false });

export const addStockSchema = Joi.object({
    itemName: Joi.string().required(),
    price: Joi.number().min(1).required(),
    availableQty: Joi.number().min(0).required()
}).options({ abortEarly: false });

export const updateStockSchema = Joi.object({
    itemId: Joi.string().required(),
    price: Joi.number().optional(),
    availableQty: Joi.number().optional()
}).options({ abortEarly: false });

export const vendorSchema = Joi.object({
    shopName: Joi.string().required(),
    location: Joi.object({
        coordinates: Joi.array()
            .items(
                Joi.number().required(),  // longitude
                Joi.number().required()   // latitude
            )
            .length(2)
            .required()
    }).required(),
    stock: Joi.array().items(
        Joi.object({
            itemName: Joi.string().required(),
            price: Joi.number().min(1).required(),
            availableQty: Joi.number().min(0).required()
        })
    ).required(),
}).options({ abortEarly: false });