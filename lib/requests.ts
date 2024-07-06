import { request, endpoints } from "./constants";
import { Transaction, TransactionType, User, Wallet } from "./types";

export async function signIn(
  email: string,
  password: string,
  updateUser: (user: User) => void,
  updateWallets: (wallets: Wallet[]) => void,
  updateTransactions: (transactions: Transaction[]) => void,
): Promise<boolean> {
  const url = `${request.localHost}:${request.port}${endpoints.signIn.url}`;
  const requestOptions = {
    method: endpoints.signIn.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      const data = await response.json();
      console.log("Data:", data);
      updateUser({
        id: data.id,
        name: data.name,
        email: data.email,
        walletIds: data.wallets.map((wallet: Wallet) => wallet.id),
      });
      updateWallets(data.wallets);

      const transactions: Transaction[] = [];
      data.wallets.forEach((wallet: any) => {
        wallet.transactions.forEach((transaction: any) => {
          transactions.push({
            id: transaction.id,
            amount: transaction.amount,
            type: transaction.type,
            walletId: wallet.id,
            createdAt: new Date(transaction.createdAt),
          });
        });
      });

      updateTransactions(transactions);

      return true;
    } else {
      console.error("Request failed with status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export async function signUp(user: any): Promise<boolean> {
  const url = `${request.localHost}:${request.port}${endpoints.signUp.url}`;
  const requestOptions = {
    method: endpoints.signUp.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      const data = await response.json();
      console.log("Data:", data);
      return true;
    } else {
      console.error("Request failed with status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export async function getWallets(userId: string): Promise<Wallet[]> {
  const url = `${request.localHost}:${request.port}${endpoints.getWallets.url.replace(
    ":userId",
    userId,
  )}`;
  const requestOptions = {
    method: endpoints.getWallets.method,
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      const data = await response.json();
      console.log("Data:", data);
      return data;
    } else {
      console.error("Request failed with status:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getTransactions(userId: string): Promise<Transaction[]> {
  const url = `${request.localHost}:${request.port}${endpoints.getTransactions.url.replace(
    ":userId",
    userId,
  )}`;
  const requestOptions = {
    method: endpoints.getTransactions.method,
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      const data = await response.json();
      console.log("Data:", data);
      return data;
    } else {
      console.error("Request failed with status:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function createWallet(
  userId: string,
  wallet: any,
  wallets: Wallet[],
  updateWallets: (wallets: Wallet[]) => void,
): Promise<boolean> {
  const url = `${request.localHost}:${request.port}${endpoints.createWallet.url.replace(
    ":userId",
    userId,
  )}`;
  const requestOptions = {
    method: endpoints.createWallet.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(wallet),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      const data = await response.json();
      updateWallets([
        ...wallets,
        {
          id: data.id,
          name: data.name,
          balance: data.balance,
          transactionsIds: [],
        },
      ]);
      return true;
    } else {
      console.error("Request failed with status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export async function createTransaction(
  walletId: string,
  transaction: any,
  transactions: Transaction[],
  updateTransactions: (transactions: Transaction[]) => void,
): Promise<boolean> {
  const url = `${request.localHost}:${request.port}${endpoints.createTransaction.url}`;
  const requestOptions = {
    method: endpoints.createTransaction.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      const data = await response.json();
      updateTransactions([
        ...transactions,
        {
          id: data.id,
          amount: data.amount,
          type:
            data.type == "income"
              ? TransactionType.Income
              : TransactionType.Expense,
          walletId: walletId,
          createdAt: new Date(data.createdAt),
        },
      ]);
      return true;
    } else {
      console.error("Request failed with status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}
