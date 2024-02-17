import { ApplicationStatus, ApplicationType } from '@prisma/client';
import Joi from 'joi';

export const createApplicationSchema = Joi.object({
  status: Joi.string().valid(ApplicationStatus.PENDING).required(),
  type: Joi.string().valid(ApplicationType.EXPERT).required(),
  image: Joi.string().required(),
  description: Joi.string().required()
});

export const expertApplicationSchema = Joi.object({
  image: Joi.string().required(),
  description: Joi.string().required()
});

export default {};
