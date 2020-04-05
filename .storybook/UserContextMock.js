import React from "react";

import { UserContext } from "contexts/UserContext";

const UserContextMock = ({ children }) => (
  <UserContext.Provider
    value={{
      user: {
        uid: "user-1",
        displayName: "Jack",
        photoURL: "https://api.adorable.io/avatars/128/Jack.png",
      },
      profiles: new Map([
        [
          "user-0",
          { displayName: "Tomy", photoURL: "https://api.adorable.io/avatars/128/Tomy.png" },
        ],
        [
          "user-1",
          { displayName: "John", photoURL: "https://api.adorable.io/avatars/128/John.png" },
        ],
        [
          "user-2",
          { displayName: "Jerry", photoURL: "https://api.adorable.io/avatars/128/Jerry.png" },
        ],
      ]),
    }}
  >
    {children}
  </UserContext.Provider>
);

export default UserContextMock;
