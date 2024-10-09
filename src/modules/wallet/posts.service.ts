import {Post, Wallet} from '../../db/models';
import {Transaction} from 'objection';
import {PostHandler, PostTypeEnum, PostPayloadDTO} from './interface';
import {UnprocessableError} from '../../error';

class PostService {
  private PostTypeHandlers = {
    transfer: this.handleTransferPost,
    fund: this.handleFundPost,
    withdraw: this.handleWithdrawPost,
  } as Record<PostTypeEnum, PostHandler>;

  getPostTypeHandler(type: PostTypeEnum) {
    return this.PostTypeHandlers[type];
  }

  async handlePost(payload: PostPayloadDTO) {
    const {type, amount, initiated_by, recipient_id} = payload;
    const handler = this.getPostTypeHandler(type);
    if (!handler) {
      throw new UnprocessableError('Unknown Post Handler');
    }

    const post = await handler(amount, initiated_by, recipient_id);
    return post;
  }

  handleFundPost(amount: number, initiated_by: number) {
    // Create debit transaction
    // Create Credit Transaction
  }
  handleWithdrawPost(amount: number, initiated_by: number) {
    // Create debit transaction
    // Create Credit Transaction
  }
  handleTransferPost(
    amount: number,
    initiated_by: number,
    recipient_id: number
  ) {
    // Get Transaction Lock for wallet operations
    // Create debit transaction; Call handleTransferDebitTreatment
    // Create Credit Transaction; Call handleTransferCreditTreatment
  }

  handleTransferDebitTreatment(
    senderId: number,
    recipient_id: number,
    amount: number,
    trx: Transaction
  ) {
    // Get sender wallet based off senderId
    // Capture previous Balance
    // Compute new balance based off amount and previous balance
    // Create Transaction Payload
    // Create transfer post with debit treatment
    try {
      // Update wallet with new balance; call handleWalletTreatment
      // Update transaction status
      // return transaction
    } catch (error) {
      // If error occured, rollback wallet debit operation
      // mark debit transaction has failed
      // Return transaction
    }
  }

  handleTransferCreditTreatment(debitTransaction: Post, trx: Transaction) {
    // Check if debit trnasaction was successful
    // Unpack transaction, get wallet of recipient via recipient_id
    // Capture previous Balance
    // Compute new balance based off debit transaction amount and previous balance
    // Create transfer post with credit treatment
    try {
      // Update wallet with new balance
      // Update transaction status
      // return transaction
    } catch (error) {
      // If error occured, rollback wallet debit operation
      // mark debit transaction has failed
      // Return transaction
    }
  }

  handleWalletTreatment(wallet: Wallet, transaction: Post) {
    // Get New Balance from transaction
    // Check if balance less than 0 throw unproceesable error
    // Set Current Wallet Balance to transaction balanceAfter
  }
}

export default new PostService();
