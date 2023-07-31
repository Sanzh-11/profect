import { useReducer, createContext, useContext } from "react";
import "./App.css";
import { RegistrationForm } from "./Components/RegistationForm";
import { Calendar } from "./Components/Calendar";
import { AboutWeb } from "./Components/AboutWeb";
import { Info } from "./Components/Info";

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
  const [store, dispatch] = useContext(StoreContext);
  const { user } = store;

  return (
    <>
      <AboutWeb />
      <Info />
      <RegistrationForm />
      {user && <Calendar />}
    </>
  );
};

function App() {
  return (
    <StoreContextProvider>
      <AppContent />
    </StoreContextProvider>
  );
}

export default App;
