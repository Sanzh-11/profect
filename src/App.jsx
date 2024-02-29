import React, { useReducer, createContext, useContext } from "react";
import "./App.css";
import RegistrationForm from "./Components/RegistrationForm";
import TimeScheduler from "./Components/TimeScheduler";
import AboutWeb from "./Components/AboutWeb";
import Navbar from "./Components/Navbar";
import MyCalendar from "./Components/BigCalendar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./Components/AuthPage";

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

const AppContent = () => {
  // const [store] = useContext(StoreContext);
  // const { user } = store;

  return (
    <>
      <Navbar />
      <AboutWeb />
      <div>
        <RegistrationForm />
        {/* {user && <TimeScheduler />} */}
        <TimeScheduler />
      </div>
      <MyCalendar />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/test" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
    // <AuthPage />
  );
}

export default App;
