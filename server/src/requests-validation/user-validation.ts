import Joi from "joi";

const registerValidationSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    location: Joi.object({
        coordinates: Joi.array()
            .items(
                Joi.number().required(),  // longitude
                Joi.number().required()   // latitude
            )
            .length(2)
            .required()
    }).optional()
}).options({ abortEarly: false });

export default registerValidationSchema;

export const loginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
}).options({ abortEarly: false });
