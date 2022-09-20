import React from "react";
import IReactComponentType from "../types/IReactComponentType";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../chakra-config";

const AppContext: IReactComponentType = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default AppContext;
