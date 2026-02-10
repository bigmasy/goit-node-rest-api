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
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({
      "string.pattern.base": "Phone must be in format (000) 000-0000",
    }),
})
  .min(1)
  .messages({
    "object.min": "Body must have at least one field",
  });
