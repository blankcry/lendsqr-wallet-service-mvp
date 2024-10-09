import {BaseModel as Model} from './BaseModel';
import {User} from './User';

export class Post extends Model {
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
      'balanceBefore',
      'balanceAfter',
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
      balanceBefore: {type: 'integer'},
      balanceAfter: {type: 'integer'},
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
