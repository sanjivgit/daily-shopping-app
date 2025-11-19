import Joi from "joi";

export const orderSchema = Joi.object({
    vendorId: Joi.string().required(),
    items: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            quantity: Joi.number().required(),
            price: Joi.number().required()
        })
    ).required(),
    totalCost: Joi.number().required(),
    delivery: Joi.number().required(),
    paymentStatus: Joi.string().valid("pending", "paid").default("pending")
}).options({ abortEarly: false });
