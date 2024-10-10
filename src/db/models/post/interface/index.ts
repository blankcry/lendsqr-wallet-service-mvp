import {
  PostTreatmentEnum,
  PostTypeEnum,
  PostStatusEnum,
} from '@src/modules/wallet/interface';

export interface PostCreationI {
  ref: string;
  amount: number;
  type: PostTypeEnum;
  treatment: PostTreatmentEnum;
  status: PostStatusEnum;
  recipient_id: number;
  initiated_by: number;
  wallet_id: number;
}
