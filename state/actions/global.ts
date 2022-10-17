import { SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/web3auth";

export const setTheme = (darkMode: boolean) => {
  return {
    type: constants.SET_THEME,
    payload: darkMode,
  };
};

export const setWeb3Auth = (web3Auth: Web3Auth | null) => {
  return {
    type: constants.SET_AUTH,
    payload: web3Auth,
  };
};

export const setProvider = (provider: SafeEventEmitterProvider | null) => {
  return {
    type: constants.SET_PROVIDER,
    payload: provider,
  };
};

export const setLogin = (login: boolean) => {
  return {
    type: constants.SET_LOGIN,
    payload: login,
  };
};

export const setLoading = (loading: boolean) => {
  return {
    type: constants.SET_LOADING,
    payload: loading,
  };
};

export const constants = {
  SET_THEME: "SET_THEME",
  SET_AUTH: "SET_AUTH",
  SET_PROVIDER: "SET_PROVIDER",
  SET_LOGIN: "SET_LOGIN",
  SET_LOADING: "SET_LOADING",
};
