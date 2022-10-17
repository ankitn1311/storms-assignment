/* eslint-disable react-hooks/exhaustive-deps */
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/web3auth";
import { useRouter } from "next/router";
import { createContext, Dispatch, useEffect, useReducer } from "react";
import { setLoading, setProvider, setWeb3Auth } from "../actions/global";
import globalReducer from "../reducers/global";

const clientId =
  "BIDquNVFxVtAaMvVcc-tA2C0Y8AS5ZOfb_dnI4CB743sqalxFA7abY3SPjd7KLPdaKY9JAAktdgUlj6uX05h-HA";

type InitialStateType = {
  darkMode: boolean;
  loggedIn: boolean;
  web3Auth: Web3Auth | null;
  provider: SafeEventEmitterProvider | null;
  loading: boolean;
};

export const initialState = {
  darkMode: false,
  loggedIn: false,
  web3Auth: null,
  provider: null,
  loading: false,
};

export const GlobalContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<any>;
}>({ state: initialState, dispatch: () => {} });

const GlobalProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", JSON.stringify("dark"));
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("theme", JSON.stringify("light"));
    }
  }, [state.darkMode]);

  useEffect(() => {
    const init = async () => {
      dispatch(setLoading(true));
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });

        dispatch(setWeb3Auth(web3auth));

        await web3auth.initModal();
        if (web3auth.provider) {
          dispatch(setProvider(web3auth.provider));
        }
        dispatch(setLoading(false));
      } catch (error) {
        console.error(error);
        dispatch(setLoading(false));
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (state.provider) {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, [state.provider]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
