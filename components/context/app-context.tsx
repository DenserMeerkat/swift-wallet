import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, Transaction, Wallet, TransactionType } from "@/lib/types";

interface AppContextType {
  user: User | null;
  wallets: Wallet[];
  transactions: Transaction[];
  updateUser: (user: User) => void;
  updateWallets: (wallets: Wallet[]) => void;
  updateTransactions: (transactions: Transaction[]) => void;
  logout: () => void;
}

const defaultAppContext: AppContextType = {
  user: null,
  wallets: [],
  transactions: [],
  updateUser: () => {},
  updateWallets: () => {},
  updateTransactions: () => {},
  logout: () => {},
};
const AppContext = createContext<AppContextType>(defaultAppContext);

interface AppContextProviderProps {
  children: ReactNode;
}

const ISSERVER = typeof window === "undefined";

const getStoredState = () => {
  let storedState;
  if (!ISSERVER) {
    storedState = localStorage.getItem("swiftWallet");
  }
  return storedState;
};

const getInitUser = () => {
  const storedState = getStoredState();
  return storedState ? JSON.parse(storedState).user : null;
};

const getInitWallets = () => {
  const storedState = getStoredState();
  return storedState
    ? JSON.parse(storedState).wallets
    : [
        {
          id: "1",
          name: "Cash",
          balance: 1000,
          userId: "1",
          transactionsIds: [],
        },
        {
          id: "2",
          name: "Bank",
          balance: 2000,
          userId: "1",
          transactionsIds: [],
        },
        {
          id: "3",
          name: "Credit Card",
          balance: 3000,
          userId: "1",
          transactionsIds: [],
        },
        {
          id: "4",
          name: "Savings",
          balance: 4000,
          userId: "1",
          transactionsIds: [],
        },
        {
          id: "5",
          name: "Investment",
          balance: 5000,
          userId: "1",
          transactionsIds: [],
        },
      ];
};

const getInitTranscations = () => {
  const storedState = getStoredState();
  return storedState
    ? JSON.parse(storedState).transactions
    : [
        {
          id: "1",
          fromWalletId: "1",
          type: TransactionType.Income,
          createdAt: Date.now() - 11 * 1000 * 60 * 60,
          amount: 250.0,
        },
        {
          id: "2",
          fromWalletId: "2",
          type: TransactionType.Expense,
          createdAt: Date.now() - 36 * 1000 * 60 * 60,
          amount: 150.0,
        },
        {
          id: "3",
          fromWalletId: "3",
          type: TransactionType.Income,
          createdAt: Date.now() - 40 * 1000 * 60 * 60,
          amount: 250.0,
        },
        {
          id: "4",
          fromWalletId: "4",
          type: TransactionType.Expense,
          createdAt: Date.now() - 72 * 1000 * 60 * 60,
          amount: 150.0,
        },
      ];
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(getInitUser());
  const [wallets, setWallets] = useState<Wallet[]>(getInitWallets());
  const [transactions, setTransactions] = useState<Transaction[]>(
    getInitTranscations(),
  );

  const logout = () => {
    setUser(null);
    setWallets([]);
    setTransactions([]);
    localStorage.removeItem("swiftWallet");
  };

  const state: AppContextType = {
    user,
    wallets,
    transactions,
    updateUser: setUser,
    updateWallets: setWallets,
    updateTransactions: setTransactions,
    logout,
  };

  useEffect(() => {
    const stateToStore = JSON.stringify({
      user,
      wallets,
      transactions,
    });
    localStorage.setItem("swiftWallet", stateToStore);
  }, [user, wallets, transactions]);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};
