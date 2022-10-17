import React, { useContext, useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import RPC from "../utils/web3RPC";
import Container from "../components/common/Container";
import { GlobalContext } from "../state/contexts/GlobalContext";
import { setLoading, setProvider } from "../state/actions/global";
import Head from "next/head";

const Login = () => {
  const {
    state: { web3Auth },
    dispatch,
  } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);

  const login = async () => {
    console.log("LOGGIN YOU IN");
    setLoading(true);
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3Auth.connect();
    dispatch(setProvider(web3authProvider!));
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  return (
    <Container>
      <Head>
        <title>login</title>
      </Head>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md gap-10 p-12 border border-teal-200 rounded-lg dark:border-teal-800">
        <h3 className="text-2xl font-bold text-center text-teal-800 select-none dark:text-teal-300">
          LOGIN
        </h3>
        <p className="text-xl font-semibold text-center text-teal-700 select-none dark:text-teal-500">
          a new web3 game that monetizes via NFTs and token sales
        </p>
        <Button fullWidth={true} type="submit">
          {loading ? "Logging you in..." : "Login with web3Auth"}
        </Button>
      </form>
    </Container>
  );
};

export default Login;
