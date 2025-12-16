import React from "react";

export const myContext = React.createContext();

const Provider = (props) => {
  return (
    <myContext.Provider
      value={{
        isNavHidden: false,
      }}
    >
      {props.children}
    </myContext.Provider>
  );
};

const thisProvider = ({ element }) => <Provider>{element}</Provider>;

export default thisProvider;
