import React, { createContext, useState, useMemo, useCallback, useContext } from "react";

import { UserClient } from "services/User";

const defaultContext = {
  user: null,
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
    const client = new UserClient(updater);
    return client;
  }, [updater]);

  if (isLoading) {
    return <div className="loading" />;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        login: userClient.login,
        googleLogin: userClient.googleLogin,
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
