import { AccountType, Gender, Role } from '@prisma/client';
import Joi from 'joi';
import { password } from './custom.validation';

export const createUserSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().custom(password),
  name: Joi.string().required(),
  avatar: Joi.string().required(),
  role: Joi.string().valid(Role.USER, Role.ADMIN),
  gender: Joi.string().valid(Gender.MALE, Gender.FEMALE, Gender.OTHER),
  accountType: Joi.string().valid(
    AccountType.VIP,
    AccountType.GOLD,
    AccountType.BASIC,
    AccountType.SILVER,
    AccountType.DIAMOND
  ),
  dob: Joi.date().required()
});

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    avatar: Joi.string().required(),
    role: Joi.string().valid(Role.USER, Role.ADMIN),
    gender: Joi.string().valid(Gender.MALE, Gender.FEMALE, Gender.OTHER),
    accountType: Joi.string().valid(
      AccountType.VIP,
      AccountType.GOLD,
      AccountType.BASIC,
      AccountType.SILVER,
      AccountType.DIAMOND
    ),
    dob: Joi.date().required()
  })
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  })
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string()
    })
    .min(1)
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  })
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
