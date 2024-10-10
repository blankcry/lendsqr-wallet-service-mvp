export interface WalletCreationI {
  user_id: number;
  balance: number;
  currency: string;
}

export interface WalletLedgerCreationI {
  post_id: number;
  wallet_id: number;
  balanceBefore: number;
  balanceAfter: number;
}
