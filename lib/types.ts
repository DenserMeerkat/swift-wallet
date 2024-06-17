export enum TransactionType {
  Credit = "credit",
  Debit = "debit",
  Transfer = "transfer",
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  fromWalletId: string;
  toWalletId?: string;
  createdAt: Date;
}

export interface Wallet {
  id: string;
  name: string;
  balance: number;
  userId: string;
  walletName: string;
  transactionsIds: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  walletsIds: string[];
}
