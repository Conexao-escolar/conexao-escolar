import React from "react";
import IReactComponentType from "../types/IReactComponentType";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../chakra-config";
import { SchoolProvider } from "./SchoolContext";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Auth";

const AppContext: IReactComponentType = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <ToastContainer position="top-right" pauseOnHover draggable newestOnTop />
      <AuthProvider>
        <SchoolProvider>{children}</SchoolProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default AppContext;
