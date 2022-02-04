import joi from "joi";

// signup form validation schema
export const signupSchema = joi.object({
  username: joi.string().trim().required().messages({
    "string.empty": "Enter your username.",
    "any.required": "username is required.",
  }),
  email: joi
    .string()
    .trim()
    .email({ tlds: { allow: false } })
    .messages({
      "string.email": "Enter a valid email.",
      "string.empty": "Enter a valid email.",
    }),
  password: joi.string().trim().required().messages({
    "string.empty": "Password cannot be empty.",
    "any.required": "Password cannot be empty.",
  }),
  password2: joi
    .string()
    .trim()
    .required()
    .valid(joi.ref("password"))
    .messages({
      "string.empty": "Re-type password cannot be empty.",
      "any.required": "Re-type password cannot be empty.",
      "any.only": "Re-type password must match above password.",
    }),
});

// login form validation schema
export const loginSchema = joi.object({
  email: joi
    .string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Enter a valid email.",
      "string.empty": "Enter a valid email.",
      "any.required": "Enter a valid email.",
    }),
  password: joi.string().trim().required().messages({
    "string.empty": "Password cannot be empty.",
    "any.required": "Password cannot be empty.",
  }),
});

// edit profile form validation schema
export const editProfileSchema = joi.object({
  password: joi.string().trim().required().messages({
    "string.empty": "New password cannot be empty.",
    "any.required": "New password cannot be empty.",
  }),
  password2: joi
    .string()
    .trim()
    .required()
    .valid(joi.ref("password"))
    .messages({
      "string.empty": "Re-type new password cannot be empty.",
      "any.required": "Re-type new password cannot be empty.",
      "any.only": "Re-type new password must match above password.",
    }),
  oldPassword: joi.string().trim().required().messages({
    "string.empty": "Old password cannot be empty.",
    "any.required": "Old password cannot be empty.",
  }),
});
