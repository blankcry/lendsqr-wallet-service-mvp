import {BaseModel} from '../BaseModel';
import {User} from '../user/User';
import {WalletLedger} from './WalletLedger';

export class Wallet extends BaseModel {
  static get tableName() {
    return 'wallets'; // Table name in the database
  }

  static get idColumn() {
    return 'id';
  }

  id!: number;
  user_id!: number;
  balance!: number;
  currency!: string;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'balance', 'currency'],
      properties: {
        id: {type: 'integer'},
        user_id: {type: 'integer'},
        balance: {type: 'number'},
        currency: {type: 'string', enum: ['USD', 'EUR', 'KES', 'UGX', 'NGN']},
      },
    };
  }

  static relationMappings = {
    user: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'wallets.user_id',
        to: 'users.id',
      },
    },
    ledger: {
      relation: BaseModel.HasManyRelation,
      modelClass: WalletLedger,
      join: {
        from: 'wallets.id',
        to: 'wallet_ledgers.wallet_id',
      },
    },
  };
}
