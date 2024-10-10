import configuration from '../../config/business';
import {Wallet} from '../../db/models';
import {Transaction} from 'objection';
import {NotFoundError} from '../../error';

class WalletService {
  async createWallet(user_id: number, currency: string, trx: Transaction) {
    const wallet = await Wallet.query(trx).insert({
      user_id,
      balance: 0,
      currency,
    });
    return wallet;
  }
  async handleWalletCreation(accountId: number, trx: Transaction) {
    const baseCurrency = configuration.platform.supported.currency;
    return this.createWallet(accountId, baseCurrency, trx);
  }

  async getWallet(user_id: number, trx?: Transaction) {
    const wallet = await Wallet.query(trx)
      .where('user_id', user_id)
      .first()
      .forUpdate();
    if (!wallet) {
      throw new NotFoundError("Sorry Can't find user wallet");
    }
    return wallet;
  }
}

export default new WalletService();
