import Joi from 'joi';
import { password } from './custom.validation';
import { createBmiRecordSchema } from './bmi.validation';
import { createUserSchema } from './user.validation';

const register = {
  body: Joi.object().keys({
    user: createUserSchema.required(),
    bmiRecord: createBmiRecordSchema.required(),
    medicalConditionIds: Joi.array().items(Joi.string()).required()
  })
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required()
  })
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required()
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password)
  })
};

export default {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword
};
