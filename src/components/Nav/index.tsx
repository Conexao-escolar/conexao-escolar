import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  useColorModeValue,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

import MenuItems from "./MenuItems";
import MainInput from "../Input";

import {
  FaUserCircle,
  FaSearch,
  FaChevronDown,
  FaUser,
  FaBackspace,
} from "react-icons/fa";

import Image from "next/image";
import NextLink from "next/link";
import Menus, { MenuOpcoes } from "./MenuOpcoes";
import { useRouter } from "next/router";

import useAuth from "../../hooks/useAuth";

export default function WithSubnavigation({ MenuAtivo }: { MenuAtivo: Menus }) {
  const { isOpen, onToggle } = useDisclosure();
  const { prefetch } = useRouter();

  const { logIn, user, logOut } = useAuth();

  const googleLogin = React.useCallback(() => {
    logIn();
  }, [logIn]);

  React.useEffect(() => {
    Object.keys(Menus).map((el) => prefetch(`/${el}`));
  }, [prefetch]);

  return (
    <>
      <Box boxShadow="md" w="full">
        <Flex
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
          justifyContent="space-between"
        >
          <Flex
            flex={{ base: 1 }}
            justify={{ base: "center", md: "space-around" }}
            alignItems="center"
          >
            <Flex
              flex={{ base: 1, md: "auto" }}
              ml={{ base: -2 }}
              display={{ base: "flex", md: "none" }}
            >
              <IconButton
                onClick={onToggle}
                icon={
                  isOpen ? (
                    <CloseIcon w={3} h={3} />
                  ) : (
                    <HamburgerIcon w={5} h={5} />
                  )
                }
                variant={"ghost"}
                aria-label={"Toggle Navigation"}
              />
            </Flex>
            <NextLink href="/">
              <Image
                src="/logo.png"
                width="119px"
                height="71px"
                alt="conexãoe escolar logo"
                style={{
                  cursor: "pointer",
                }}
              />
            </NextLink>

            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              {/* <DesktopNav /> */}
            </Flex>
            {!user ? (
              <Stack
                flex={{ base: 1, md: 0 }}
                justify={"flex-end"}
                direction={"row"}
                spacing={6}
              >
                <Button
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  colorScheme="_orange"
                  onClick={googleLogin}
                >
                  Cadastrar-se
                </Button>
                <Button
                  fontSize={"sm"}
                  fontWeight={400}
                  variant={"link"}
                  leftIcon={<Icon as={FaUserCircle} />}
                  onClick={googleLogin}
                >
                  Fazer o login
                </Button>
              </Stack>
            ) : (
              <Box>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<Icon as={FaChevronDown} />}
                  >
                    {user.nome}
                  </MenuButton>
                  <MenuList>
                    <MenuItem icon={<Icon as={FaUser} />}>Meu perfil</MenuItem>
                    <MenuDivider />
                    <MenuItem icon={<Icon as={FaBackspace} />} onClick={logOut}>
                      Sair
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            )}
          </Flex>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
        <MenuItems activeMenu={MenuAtivo} />
      </Box>
    </>
  );
}

const DesktopNav = () => {
  return (
    <Box w="100%" minH="44px">
      <MainInput placeholder="O que você procura?" icon={FaSearch} />
    </Box>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  const allMenus = MenuOpcoes;

  const formatLink = React.useCallback((l: string) => {
    if (l == Menus.Home) return "/";
    if (l.split(" ").length > 1) {
      return `/${l.split(" ")[0].toLowerCase()}`;
    }

    return `/${l.toLowerCase()}`;
  }, []);
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {allMenus.map((menu) => (
        <MobileNavItem key={menu} label={menu} href={formatLink(menu)} />
      ))}
      {/* {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))} */}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          <NextLink href={href}>{label}</NextLink>
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Inspiration",
    children: [
      {
        label: "Explore Design Work",
        subLabel: "Trending Design to inspire you",
        href: "#",
      },
      {
        label: "New & Noteworthy",
        subLabel: "Up-and-coming Designers",
        href: "#",
      },
    ],
  },
  {
    label: "Find Work",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "#",
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "#",
      },
    ],
  },
  {
    label: "Learn Design",
    href: "#",
  },
  {
    label: "Hire Designers",
    href: "#",
  },
];
