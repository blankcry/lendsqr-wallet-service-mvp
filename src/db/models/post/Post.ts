import {
  PostTypeEnum,
  PostTreatmentEnum,
  PostStatusEnum,
} from '@src/modules/wallet/interface';
import {BaseModel as Model} from '../BaseModel';
import {User} from '../user/User';
import {PostCreationI} from './interface';

export class Post extends Model implements PostCreationI {
  id!: number;
  ref!: string;
  amount!: number;
  type!: PostTypeEnum;
  treatment!: PostTreatmentEnum;
  status!: PostStatusEnum;
  recipient_id!: number;
  initiated_by!: number;
  wallet_id!: number;
  static get tableName() {
    return 'posts'; // Table name in the database
  }

  static get idColumn() {
    return 'id';
  }

  static jsonSchema = {
    type: 'object',
    required: [
      'ref',
      'amount',
      'type',
      'treatment',
      'status',
      'recipient_id',
      'initiated_by',
      'wallet_id',
    ],

    properties: {
      id: {type: 'integer'},
      ref: {type: 'string', minLength: 1, maxLength: 255},
      amount: {type: 'integer'},
      type: {type: 'string', enum: ['transfer', 'fund', 'withdraw']},
      treatment: {type: 'string', enum: ['credit', 'debit']},
      status: {type: 'string', enum: ['PENDING', 'SUCCESS', 'FAILED']},
      recipient_id: {type: 'integer'},
      initiated_by: {type: 'integer'},
      wallet_id: {type: 'integer'},
      remark: {type: 'string'},
    },
  };

  // Define the relationship with the User model
  static relationMappings = {
    initiator: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'posts.initiated_by',
        to: 'users.id',
      },
    },
    recipient: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'posts.recipient_id',
        to: 'users.id',
      },
    },
  };
}
