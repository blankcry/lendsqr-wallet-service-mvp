import {Post, Wallet, WalletLedger} from '../../db/models';
import {Transaction} from 'objection';
import {
  PostHandler,
  PostTypeEnum,
  PostPayloadDTO,
  PostTreatmentEnum,
  PostStatusEnum,
} from './interface';
import {UnprocessableError} from '../../error';
import walletService from './wallet.service';
import {PostCreationI} from '@src/db/models/post/interface';
import WalletUtils from './util';
import {WalletLedgerCreationI} from '@src/db/models/wallet/interface';

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

  async handleFundPost(amount: number, initiated_by: number) {
    const trx = await Post.startTransaction();

    // Get the wallet of the user initiating the fund operation
    const wallet = await walletService.getWallet(initiated_by, trx);

    const fundTransaction = await this.createPostTransaction(
      amount,
      initiated_by,
      initiated_by,
      PostTypeEnum.Fund,
      PostTreatmentEnum.Credit,
      wallet.id
    );

    return this.executeTransaction(
      trx,
      async () => {
        return this.handleWalletTreatment(wallet, fundTransaction, trx);
      },
      async () => {
        await fundTransaction.$query().update({status: PostStatusEnum.Failed});
      }
    );
  }
  async handleWithdrawPost(amount: number, initiated_by: number) {
    const trx = await Post.startTransaction();

    // Get the wallet of the user initiating the withdrawal
    const wallet = await walletService.getWallet(initiated_by, trx);
    const withdrawTransaction = await this.createPostTransaction(
      amount,
      initiated_by,
      initiated_by,
      PostTypeEnum.Withdraw,
      PostTreatmentEnum.Debit,
      wallet.id
    );

    return this.executeTransaction(
      trx,
      async () => {
        return this.handleWalletTreatment(wallet, withdrawTransaction, trx);
      },
      async () => {
        await withdrawTransaction
          .$query()
          .update({status: PostStatusEnum.Failed});
      }
    );
  }
  async handleTransferPost(
    amount: number,
    initiated_by: number,
    recipient_id: number
  ) {
    // Create debit transaction; Call handleTransferDebitTreatment
    const debitTransaction = await this.processDebitTransaction(
      initiated_by,
      recipient_id,
      amount
    );
    // Create Credit Transaction; Call handleTransferCreditTreatment
    await this.processCreditTransaction(debitTransaction);
    return debitTransaction;
  }

  async processDebitTransaction(
    initiated_by: number,
    recipient_id: number,
    amount: number
  ): Promise<Post> {
    const trx = await Post.startTransaction();
    const senderWallet = await walletService.getWallet(initiated_by, trx);

    const debitTransaction = await this.createPostTransaction(
      amount,
      initiated_by,
      recipient_id,
      PostTypeEnum.Transfer,
      PostTreatmentEnum.Debit,
      senderWallet.id
    );
    return this.executeTransaction(
      trx,
      async () => {
        return this.handleWalletTreatment(senderWallet, debitTransaction, trx);
      },
      async () => {
        await debitTransaction.$query().update({status: PostStatusEnum.Failed});
      }
    );
  }

  async processCreditTransaction(debitTransaction: Post) {
    const {status, recipient_id, amount, initiated_by} = debitTransaction;
    if (status !== PostStatusEnum.Success) {
      throw new UnprocessableError("Sender Wallet hasn't been debited");
    }
    const trx = await Wallet.startTransaction();
    const recipientWallet = await walletService.getWallet(recipient_id, trx);

    const creditTransaction = await this.createPostTransaction(
      amount,
      initiated_by,
      recipient_id,
      PostTypeEnum.Transfer,
      PostTreatmentEnum.Debit,
      recipientWallet.id
    );
    return this.executeTransaction(
      trx,
      async () => {
        return this.handleWalletTreatment(
          recipientWallet,
          creditTransaction,
          trx
        );
      },
      async () => {
        await creditTransaction
          .$query()
          .update({status: PostStatusEnum.Failed});
      }
    );
  }

  private async handleWalletTreatment(
    wallet: Wallet,
    post: Post,
    trx: Transaction
  ) {
    // Get New Balance from transaction
    const {treatment} = post;
    let amount = post.amount;
    if (treatment === PostTreatmentEnum.Debit) {
      amount = -amount;
    }
    const balanceAfter = wallet.balance + amount;

    // Create Ledger Record
    const ledgerPayload: WalletLedgerCreationI = {
      post_id: post.id,
      wallet_id: wallet.id,
      balanceBefore: wallet.balance,
      balanceAfter,
    };
    await WalletLedger.query(trx).insert(ledgerPayload);
    await wallet.$query(trx).update({
      balance: balanceAfter,
    });
    // Check if balance less than 0 throw unproceesable error; Check here to showcase a failure point and hoe rollback works
    if (balanceAfter < 0) {
      throw new UnprocessableError('Insufficient Amount');
    }
    post.status = PostStatusEnum.Success;
    await post.$query().update({status: PostStatusEnum.Success});
    return post;
  }

  private async createPostTransaction(
    amount: number,
    initiated_by: number,
    recipient_id: number,
    type: PostTypeEnum,
    treatment: PostTreatmentEnum,
    wallet_id: number
  ): Promise<Post> {
    const transactionPayload: PostCreationI = {
      amount,
      initiated_by,
      recipient_id,
      type,
      ref: WalletUtils.generateUniqueRef(),
      treatment,
      status: PostStatusEnum.Pending,
      wallet_id,
    };

    return Post.query().insert(transactionPayload);
  }

  private async executeTransaction(
    trx: Transaction,
    operation: () => Promise<Post>,
    onErrorCallback: () => Promise<void>
  ) {
    try {
      const result = await operation();
      await trx.commit();
      return result;
    } catch (error) {
      await onErrorCallback();
      await trx.rollback();
      throw error;
    }
  }
}

export default new PostService();
