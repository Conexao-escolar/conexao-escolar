import {
  Box,
  Flex,
  HStack,
  Text,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import React from "react";

import NextLink from "next/link";
import MenuEnum, { MenuOpcoes, MenusPopHouver } from "./MenuOpcoes";

const menus = MenuOpcoes;

const MenuItems: React.FC<{
  activeMenu: MenuEnum;
}> = ({ activeMenu = MenuEnum.Home }) => {
  const THIS_ACTIVE_MENU = React.useMemo(() => {
    return activeMenu.toLowerCase();
  }, [activeMenu]);

  const formatLink = React.useCallback((l: string) => {
    if (l.split(" ").length > 1) {
      return l.split(" ")[0].toLowerCase();
    }

    return l.toLowerCase();
  }, []);

  const validateIsActiveMenu = React.useCallback(
    (menu: string) => {
      if (THIS_ACTIVE_MENU.includes(menu.toLowerCase()))
        return {
          fontWeight: "bold",
          borderBottom: "4px solid",
          borderRadius: "2px",
          borderColor: "orange",
        };

      return {};
    },
    [THIS_ACTIVE_MENU]
  );

  const havePophouver = React.useCallback((menu: string) => {
    return MenusPopHouver[menu];
  }, []);
  return (
    <Box>
      <Flex
        bg="_dark_blue"
        minH="60px"
        w="full"
        align="center"
        justifyContent="center"
        display={{
          sm: "none",
          md: "flex",
          lg: "flex"
        }}
      >
        <HStack spacing={{ base: "50px", md: "100px" }}>
          {menus.map((_menu) => (
            <Box key={_menu}>
              <Popover trigger="hover" placement="bottom-start">
                <NextLink href={formatLink(_menu)}>
                  <PopoverTrigger>
                    <Text
                      cursor="pointer"
                      color="white"
                      {...validateIsActiveMenu(_menu)}
                    >
                      {_menu}
                    </Text>
                  </PopoverTrigger>
                </NextLink>
                {havePophouver(_menu) && (
                  <PopoverContent
                    border={0}
                    boxShadow={"xl"}
                    bg="white"
                    p={4}
                    rounded={"xl"}
                    minW={"sm"}
                  >
                    {havePophouver(_menu)}
                  </PopoverContent>
                )}
              </Popover>
            </Box>
          ))}
        </HStack>
      </Flex>
    </Box>
  );
};

export default MenuItems;
