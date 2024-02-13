import { createContext, useContext, useState } from "react";

const Context = createContext();

export const useContextProvider = () => useContext(Context);

const ContextProvider = ({ children }) => {
  const [profileID, setProfileID] = useState();

  return (
    <Context.Provider value={{ profileID, setProfileID }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
