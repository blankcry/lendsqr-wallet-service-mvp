import {BaseModel} from '../BaseModel';
import {Post} from '../post/Post';
import {WalletLedgerCreationI} from './interface';
import {Wallet} from './Wallet';

export class WalletLedger extends BaseModel implements WalletLedgerCreationI {
  post_id!: number;
  wallet_id!: number;
  balanceBefore!: number;
  balanceAfter!: number;
  static get tableName() {
    return 'wallet_ledgers'; // Table name in the database
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['post_id', 'balanceBefore', 'balanceAfter', 'wallet_id'],
      properties: {
        id: {type: 'integer'},
        balanceBefore: {type: 'integer'},
        balanceAfter: {type: 'integer'},
        post_id: {type: 'integer'},
        wallet_id: {type: 'integer'},
      },
    };
  }

  static relationMappings = {
    wallet: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: Wallet,
      join: {
        from: 'wallet_ledgers.wallet_id',
        to: 'wallets.id',
      },
    },
    post: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: Post,
      join: {
        from: 'wallet_ledgers.post_id',
        to: 'posts.id',
      },
    },
  };
}
