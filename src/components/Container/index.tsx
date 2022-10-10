import React from "react";
import {
  Box,
  Container as ChakraContainer,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { IProps } from "../../types/IReactComponentType";
import Nav from "../Nav";
import MenuItems from "../Nav/MenuOpcoes";

import Rodape from "../Rodape";

type IContainerProps = IProps & {
  activeMenu: MenuItems;
  extraContainer?: JSX.Element | JSX.Element[];
  loading?: boolean;
  containerSize?: "container.xl" | "container.lg" | "container.md";
};

const Container: React.FC<IContainerProps> = ({
  children,
  activeMenu = MenuItems.Home,
  extraContainer,
  containerSize = "container.xl",
  loading,
}) => {
  return (
    <Box as="main" h="100vh" bg="_default_bg" overflowX="hidden">
      <Nav MenuAtivo={activeMenu} />
      {loading ? (
        <Box padding="60" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
      ) : (
        <>
          {extraContainer}
          <ChakraContainer maxW={containerSize}>{children}</ChakraContainer>
        </>
      )}
      <Rodape />
    </Box>
  );
};

export default Container;
