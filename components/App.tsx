/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react";
import RPC from "../utils/web3RPC";
import Container from "./common/Container";
import { GlobalContext } from "../state/contexts/GlobalContext";
import Head from "next/head";
import { image } from "../utils/constants";

function App() {
  const {
    state: { web3Auth: web3auth, provider },
  } = useContext(GlobalContext);

  const [user, setUser] = useState<any>(null);
  const [address, setAddress] = useState<any>("");
  const [balance, setBalance] = useState<any>(0);

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
    setUser(user);
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log(address);
    setAddress(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    setBalance(balance);
  };

  useEffect(() => {
    getUserInfo();
    getAccounts();
    getBalance();
  }, []);

  return (
    <Container>
      <Head>
        <title>profile</title>
      </Head>
      <p className="mb-12 text-lg font-semibold text-teal-900 dark:text-teal-500">
        {address}
      </p>
      <div className="flex flex-row items-center justify-center w-full max-w-xl gap-10 p-12 border border-teal-200 rounded-lg dark:border-teal-800">
        <div className="flex flex-col items-start justify-start">
          <div className="text-3xl font-semibold text-teal-900 dark:text-teal-400">
            {user?.name}
          </div>
          <div className="text-xl italic font-medium text-teal-900 dark:text-teal-400">
            {user?.email}
          </div>
          <div className="text-xl font-bold text-teal-900 dark:text-teal-500">
            Balance: {balance}
          </div>
        </div>
        <img
          src={user?.profileImage ?? image}
          alt="profile image"
          className="rounded-full w-36 h-36 ring-2 ring-teal-500 dark:ring-teal-700 ring-offset-2 dark:ring-offset-teal-900"
        />
      </div>
    </Container>
  );
}

export default App;
