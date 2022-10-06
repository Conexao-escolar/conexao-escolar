import React from "react";
import IReactComponentType from "../types/IReactComponentType";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../chakra-config";
import { SchoolProvider } from "./SchoolContext";
import { ToastContainer } from "react-toastify";

const AppContext: IReactComponentType = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <ToastContainer position="top-right" pauseOnHover draggable newestOnTop />
      <SchoolProvider>{children}</SchoolProvider>
    </ChakraProvider>
  );
};

export default AppContext;
