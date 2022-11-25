import React, { useContext } from "react";
const UserContext = React.createContext();

// useUser hook will provide the states of App.js (isLogged, user, etc)
// to all the componnets in the app using react context.
const useStates = () => {
  return useContext(UserContext);
};

function StateProvider({ children, states }) {
  return <UserContext.Provider value={states}>{children}</UserContext.Provider>;
}

export { StateProvider, useStates };
