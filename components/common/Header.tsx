import { useContext } from "react";
import { setTheme } from "../../state/actions/global";
import { GlobalContext } from "../../state/contexts/GlobalContext";

const Header = () => {
  const {
    state: { darkMode },
    dispatch,
  } = useContext(GlobalContext);

  return (
    <div className="flex flex-row items-center gap-2">
      <img
        src="/eden-logo.png"
        className="w-10 h-10 select-none "
        alt="eden logo"
      />
      <p
        className={`text-3xl font-bold text-gray-700 cursor-pointer select-none dark:text-gray-200`}
        onClick={() => dispatch(setTheme(!darkMode))}>
        Eden
      </p>
    </div>
  );
};

export default Header;
