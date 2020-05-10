import React from "react";
export default React.createContext({
  token: null,
  tokenExpiration: null,
  login: () => {},
  logout: () => {},
});
