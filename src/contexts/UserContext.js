import React, { createContext, useContext, useEffect, useState } from "react";
import AuthProvider from "services/Auth";
import DataStore from "services/DataStore";
import MapWithDefault from "utils/mapWithDefault";

const defaultProfile = (uid) => ({
  displayName: uid,
  photoURL: "/images/avatar-empty.jpg",
});
export const profilesMap = (profiles = []) => new MapWithDefault(profiles, defaultProfile);

const defaultContext = {
  user: null,
  profiles: profilesMap(),
  credentials: null,
};

export const UserContext = createContext(defaultContext);

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState(profilesMap());
  const [credentials, setCredentials] = useState();

  useEffect(() => {
    const unsubscribe = AuthProvider.onAuthChange((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [profiles, setUser, setLoading]);

  useEffect(() => {
    const unsubscribe = DataStore.subscribeProfiles((profiles) => {
      setProfiles(profilesMap(profiles));
    });
    return () => unsubscribe();
  }, [setProfiles]);

  useEffect(() => {
    if (user) {
      const unsubscribe = DataStore.subscribeCredentials(user.uid, (cred) => {
        console.log("New cred", cred);
        setCredentials(cred);
      });
      return () => unsubscribe();
    }
  }, [user, setCredentials]);

  if (loading) {
    return <div className="loading" />;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        profiles,
        credentials,
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

export const useProfiles = () => {
  const { profiles } = useContext(UserContext);
  return profiles;
};

export const useCredentials = () => {
  const { credentials } = useContext(UserContext);
  return credentials;
};
