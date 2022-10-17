import React, { FC, ReactNode, useContext } from "react";
import { setProvider, setTheme } from "../../state/actions/global";
import { GlobalContext } from "../../state/contexts/GlobalContext";
import Logo from "./Logo";

type ContainerProps = {
  children: ReactNode;
};

const Container: FC<ContainerProps> = ({ children }) => {
  const {
    state: { web3Auth, darkMode, provider },
    dispatch,
  } = useContext(GlobalContext);

  const logout = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3Auth.logout();
    dispatch(setProvider(null));
  };

  return (
    <div className="flex flex-col items-center w-screen min-h-screen bg-teal-50 dark:bg-teal-900">
      <nav className="flex flex-row items-center justify-between w-full max-w-5xl p-3 border-b border-teal-200 dark:border-teal-800">
        <Logo />
        <div className="flex flex-row items-center gap-2">
          {provider && (
            <p
              onClick={logout}
              className="text-red-700 cursor-pointer dark:text-pink-400 hover:underline">
              Logout
            </p>
          )}
          <p
            onClick={() => dispatch(setTheme(!darkMode))}
            className="self-end p-4 overflow-hidden text-gray-700 cursor-pointer hover:text-black dark:hover:text-white hover:underline dark:text-gray-200">
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-teal-400 hover:text-teal-200">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-teal-500 hover:text-teal-700">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            )}
          </p>
        </div>
      </nav>
      <div className="flex flex-col items-center self-stretch justify-center w-full p-4 md:mt-20">
        {children}
      </div>
    </div>
  );
};

export default Container;
