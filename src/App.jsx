import React, { useReducer, createContext, useState } from "react";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./Components/AuthPage";
import { Navigate } from "react-router";
import AppContent from "./Components/AppContent";
import AdminContent from "./Components/AdminContent/AdminContent";

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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/main" />
            ) : (
              <AuthPage setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route path="/main" element={<AppContent />} />
        <Route path="/admin" element={<AdminContent />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
