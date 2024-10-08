import configuration from '@src/config/business';
import {Wallet} from '../../db/models';
import {Transaction} from 'objection';

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
}

export default new WalletService();
