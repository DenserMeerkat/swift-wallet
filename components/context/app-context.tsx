import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, Transaction, Wallet } from "@/lib/types";

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

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(
    null,
    //   {
    //   id: "1",
    //   name: "John Doe",
    //   email: "example@gmail.com",
    //   walletsIds: ["1", "2"],
    // }
  );
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const logout = () => {
    setUser(null);
    setWallets([]);
    setTransactions([]);
  };

  const state = {
    user,
    wallets,
    transactions,
    updateUser: setUser,
    updateWallets: setWallets,
    updateTransactions: setTransactions,
    logout,
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};
