import Joi from "joi";

export const createListSchema = Joi.object({
    title: Joi.string().min(2).required(),
}).options({ abortEarly: false });

export const updateListTitleSchema = Joi.object({
    listId: Joi.string().required(),
    title: Joi.string().min(1).max(200).required()
});