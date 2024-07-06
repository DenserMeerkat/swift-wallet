export const githubLink = "https://github.com/DenserMeerkat/swift-wallet";

export const request = {
  localHost: "http://localhost",
  port: "8080",
};

export const endpoints = {
  signIn: {
    url: "/api/auth/signin",
    method: "POST",
  },
  signUp: {
    url: "/api/auth/signup",
    method: "POST",
  },
  getWallets: {
    url: "/api/wallets/:userId",
    method: "GET",
  },
  createWallet: {
    url: "/api/wallets/:userId",
    method: "POST",
  },
  getTransactions: {
    url: "/api/transactions/user/:userId",
    method: "GET",
  },
  createTransaction: {
    url: "/api/transactions",
    method: "POST",
  },
};
