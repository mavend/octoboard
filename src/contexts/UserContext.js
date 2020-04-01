import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

import { UserClient } from "services/User";

const defaultContext = {
  user: { name: "", email: "" },
};

export const UserContext = createContext(defaultContext);

export const UserContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const updater = useCallback((user) => {
    setUser(user);
    setIsLoading(false);
  }, []);

  const userClient = useMemo(() => {
    return new UserClient(updater);
  }, [updater]);

  if (isLoading) {
    return <div className="loading" />;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        logIn: userClient.logIn,
        logInAnonymously: userClient.logInAnonymously,
        LogInGoogle: userClient.logInGoogle,
        getNickName: userClient.getNickName,
        logout: userClient.logout,
        register: userClient.register,
        changePassword: userClient.changePassword,
        sendResetPasswordLink: userClient.sendResetPasswordLink,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user } = useContext(UserContext);
  return user;
};
