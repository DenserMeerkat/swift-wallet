import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
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

const ISSERVER = typeof window === "undefined";

const getStoredState = () => {
  let storedState;
  if (!ISSERVER) {
    storedState = sessionStorage.getItem("swiftWallet");
  }
  return storedState;
};

const getInitUser = () => {
  const storedState = getStoredState();
  return storedState ? JSON.parse(storedState).user : null;
};

const getInitWallets = () => {
  const storedState = getStoredState();
  return storedState ? JSON.parse(storedState).wallets : [];
};

const getInitTranscations = () => {
  const storedState = getStoredState();
  return storedState ? JSON.parse(storedState).transactions : [];
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
    sessionStorage.removeItem("swiftWallet");
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
    sessionStorage.setItem("swiftWallet", stateToStore);
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
