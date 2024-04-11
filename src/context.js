import React, { useReducer, createContext } from "react";

export const StoreContext = createContext({});

const initState = {};
const reducer = (state, action) => {
  switch (action.type) {
    case "create-user":
      return { ...state, user: action.payload };
    case "add-date":
      return { ...state, date: action.payload };
    default:
      break;
  }
  return { ...state };
};

export const StoreContextProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initState);

  return (
    <StoreContext.Provider value={[store, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};
