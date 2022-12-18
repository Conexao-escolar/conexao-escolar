import React from "react";
import IReactComponentType from "../types/IReactComponentType";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../chakra-config";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../User/context/Auth";

const AppContext: IReactComponentType = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <ToastContainer position="top-right" pauseOnHover draggable newestOnTop />
      <AuthProvider>{children}</AuthProvider>
    </ChakraProvider>
  );
};

export default AppContext;
