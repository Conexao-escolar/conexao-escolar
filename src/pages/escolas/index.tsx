import { Center, Flex } from "@chakra-ui/react";
import React from "react";
import Container from "../../components/Container";
import Menus from "../../components/Nav/MenuOpcoes";
// import { Container } from './styles';

const Schools: React.FC = () => {
  return (
    <Container activeMenu={Menus.Escolas}>
      <Flex w="100vw" h="100vh" align="center" justifyContent="center">
        Em breve...
      </Flex>
    </Container>
  );
};

export default Schools;
