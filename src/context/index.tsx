import React from "react";
import IReactComponentType from "../types/IReactComponentType";
import { ChakraProvider } from "@chakra-ui/react";

const AppContext: IReactComponentType = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export default AppContext;
