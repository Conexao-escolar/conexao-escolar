import React from "react";
import IReactComponentType from "../types/IReactComponentType";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../chakra-config";
import { SchoolProvider } from "./SchoolContext";

const AppContext: IReactComponentType = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <SchoolProvider>{children}</SchoolProvider>
    </ChakraProvider>
  );
};

export default AppContext;
