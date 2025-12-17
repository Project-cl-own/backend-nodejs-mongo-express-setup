import Joi from "joi";

export const registerValidation = {
  body: Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters"
      }),

    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required"
      }),

    password: Joi.string()
      .min(8)
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"))
      .required()
      .messages({
        "string.min": "Password must be at least 8 characters",
        "string.pattern.base":
          "Password must contain uppercase, lowercase and number"
      })
  })
};



export const loginValidation = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required"
      }),

    password: Joi.string()
      .required()
      .messages({
        "string.empty": "Password is required"
      })
  })
};
