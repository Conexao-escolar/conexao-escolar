import React from "react";
import { Box, Container as ChakraContainer } from "@chakra-ui/react";
import { IProps } from "../../types/IReactComponentType";
import Nav from "../Nav";
import MenuItems from "../Nav/MenuOpcoes";

type IContainerProps = IProps & {
  activeMenu: MenuItems;
  extraContainer?: JSX.Element | JSX.Element[]
};

const Container: React.FC<IContainerProps> = ({
  children,
  activeMenu = MenuItems.Home,
  extraContainer
}) => {
  return (
    <Box h="100vh" bg="_default_bg" overflowX="hidden">
      <Nav MenuAtivo={activeMenu} />
      {extraContainer}
      <ChakraContainer maxW="container.xl">{children}</ChakraContainer>
    </Box>
  );
};

export default Container;
