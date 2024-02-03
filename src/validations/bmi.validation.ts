import Joi from 'joi';

export const createBmiRecordSchema = Joi.object({
  height: Joi.number().required(),
  weight: Joi.number().required()
});

const createBmi = {
  body: Joi.object().keys({
    height: Joi.number().required(),
    weight: Joi.number().required()
  })
};

export default {
  createBmi
};
