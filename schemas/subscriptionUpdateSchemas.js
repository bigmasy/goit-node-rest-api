import Joi from "joi";

export const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.only": "Subscription must be one of: starter, pro, business",
    }),
});
