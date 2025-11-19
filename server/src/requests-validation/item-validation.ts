import Joi from "joi";

export const addItemSchema = Joi.object({
    listId: Joi.string().required(),
    name: Joi.string().min(2).required(),
    quantity: Joi.number().min(1).required(),
    brandPreference: Joi.string().allow(null, "").optional()
}).options({ abortEarly: false });

export const updateListItemSchema = Joi.object({
    itemId: Joi.string().required(),
    itemName: Joi.string().min(1).max(200),
    quantity: Joi.number().min(1),
    brandPreference: Joi.string().allow("", null)
});