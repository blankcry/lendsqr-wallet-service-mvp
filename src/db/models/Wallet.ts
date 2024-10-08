import {BaseModel} from './BaseModel';
import {User} from './User';

export default class Wallet extends BaseModel {
  static get tableName() {
    return 'wallets'; // Table name in the database
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'balance', 'currency'],
      properties: {
        id: {type: 'integer'},
        userId: {type: 'integer'},
        balance: {type: 'number', minimum: 0},
        currency: {type: 'string', enum: ['USD', 'EUR', 'KES', 'UGX']},
        created_at: {type: 'string', format: 'date-time'},
        updated_at: {type: 'string', format: 'date-time'},
      },
    };
  }

  static relationMappings = {
    user: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'wallets.userId',
        to: 'users.id',
      },
    },
  };
}
