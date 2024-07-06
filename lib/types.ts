export enum TransactionType {
  Income = "income",
  Expense = "expense",
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  walletId: string;
  createdAt: Date;
}

export interface Wallet {
  id: string;
  name: string;
  balance: number;
  transactionsIds: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  walletIds: string[];
}
