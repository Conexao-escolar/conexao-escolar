import { Box, Center, Flex } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

// import { Container } from './styles';

const Main: React.FC = () => {
  const { query } = useRouter();

  const newURL = React.useMemo(() => {
    const keys = Object.keys(query);
    if (!keys.length) return "";

    const { allRoutes } = query;

    const defaultRoute = (allRoutes as Array<String>).join("/");
    const queryParams = keys.filter((key) => key !== "allRoutes");
    if (!queryParams) return defaultRoute;

    const formatedQueryParam = queryParams
      .map((key) => {
        const value = query[key];
        return `${key}=${value}`;
      })
      .join("&");

    return `${defaultRoute}?${formatedQueryParam}`;
  }, [query]);

  React.useEffect(() => {
    if (newURL) {
      setTimeout(
        () => (location.href = `https://conexaoescolar.com/${newURL}`),
        1000
      );
    }
  }, [newURL]);
  return (
    <Box w="100vw" h="100vh">
      <Flex flex="1" justifyContent="center" h="full" alignItems="center">
        Você será redirecionado em breve para o site principal 🥰
      </Flex>
    </Box>
  );
};

export default Main;
