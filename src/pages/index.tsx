import { Box, Center, Flex } from "@chakra-ui/react";
import React from "react";

// import { Container } from './styles';

const Main: React.FC = () => {
  React.useEffect(() => {
    setTimeout(
      () => (location.href = "https://conexaoescolar.com?UTM_SOURCE=MVP"),
      3000
    );
  }, []);
  return (
    <Box w="100vw" h="100vh">
      <Flex flex="1" justifyContent="center" h="full" alignItems="center">
        Você será redirecionado para o site principal...
      </Flex>
    </Box>
  );
};

export default Main;
