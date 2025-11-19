import Joi from "joi";

export const createPaymentOrderSchema = Joi.object({
    amount: Joi.number().min(1).required()
});