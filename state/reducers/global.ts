import { constants } from "../actions/global";

const reducer = <T>(state: any, action: { type: string; payload: T }) => {
  const { type, payload } = action;
  switch (type) {
    case constants.SET_THEME:
      return {
        ...state,
        darkMode: payload,
      };
    case constants.SET_AUTH:
      return {
        ...state,
        web3Auth: payload,
      };
    case constants.SET_PROVIDER:
      return {
        ...state,
        provider: payload,
      };
    case constants.SET_LOGIN:
      return {
        ...state,
        login: payload,
      };
    case constants.SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

export default reducer;
