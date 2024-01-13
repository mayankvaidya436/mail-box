import React, { createContext, useState } from "react";

const reRenderContext = createContext({
  iSReRender: false,
  setReRender: () => {},
});

export const ReRenderProvider = (props) => {
  const [isReRender, setIsReRender] = useState(false);

  const reRenderValue = {
    iSReRender: isReRender,
    setReRender: () => setIsReRender(!isReRender),
  };

  return (
    <reRenderContext.Provider value={reRenderValue}>
      {props.children}
    </reRenderContext.Provider>
  );
};

export default reRenderContext;