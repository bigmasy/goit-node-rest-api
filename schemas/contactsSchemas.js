import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "Missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Missing required email field",
  }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required()
    .messages({
      "any.required": "Missing required phone field",
      "string.pattern.base": "Phone must be in format (000) 000-0000",
    }),
  favorite: Joi.boolean().messages({
    "boolean.base": "field favorite must be a boolean value",
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({
      "string.pattern.base": "Phone must be in format (000) 000-0000",
    }),
  favorite: Joi.boolean().messages({
    "boolean.base": "field favorite must be a boolean value",
  }),
})
  .min(1)
  .messages({
    "object.min": "Body must have at least one field",
  });

export const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Missing required favorite field",
    "boolean.base": "field favorite must be a boolean value",
  }),
});
