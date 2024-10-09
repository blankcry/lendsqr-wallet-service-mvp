import Joi from 'joi';
import {PostTypeEnum} from '../interface';

export const WalletPostPayloadSchema = Joi.object({
  type: Joi.string()
    .allow(...Object.values(PostTypeEnum))
    .required()
    .label('Post Type'),
  amount: Joi.number().min(1).required(),
  initiated_by: Joi.number().required(),
  recipient_id: Joi.when('type', {
    is: PostTypeEnum.Transfer,
    then: Joi.number().required(),
    otherwise: Joi.forbidden(),
  }),
});
