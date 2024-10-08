import Joi from 'joi';

export const userCreationRequestSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});
