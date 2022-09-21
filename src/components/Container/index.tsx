import React from "react";
import { Box, Container as ChakraContainer } from "@chakra-ui/react";
import IReactComponentType from "../../types/IReactComponentType";
import Nav from "../Nav";

const Container: IReactComponentType = ({ children }) => {
  return (
    <Box h="100vh" bg="_default_bg" overflowX="hidden">
      <Nav />
      <ChakraContainer>{children}</ChakraContainer>
    </Box>
  );
};

export default Container;
