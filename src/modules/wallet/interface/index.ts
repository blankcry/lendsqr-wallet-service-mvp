import {Post} from '../../../db/models';

export enum PostTypeEnum {
  Transfer = 'transfer',
  Withdraw = 'withdraw',
  Fund = 'fund',
}

export enum PostTreatmentEnum {
  Credit = 'credit',
  Debit = 'debit',
}

export enum PostStatusEnum {
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export type PostHandler = (
  amount: number,
  senderId: number,
  recipientId?: number
) => Promise<Post>;

export interface PostPayloadDTO {
  type: PostTypeEnum;
  amount: number;
  initiated_by: number;
  recipient_id: number;
}
