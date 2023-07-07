import React, { createContext, useState } from "react";

const userContext = createContext();

const UserState = (props) => {
  const [data, setData] = useState({});
  return (
    <userContext.Provider value={{ data, setData }}>
      {props.children}
    </userContext.Provider>
  );
};

export { UserState, userContext };
