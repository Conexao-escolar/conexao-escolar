import React from "react";
import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
  Avatar,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";

export type ICardEscla = {
  modal: "Publico" | "Privado";
  nome: string;
  endereco: string;
  cidade: string;
  rank: number;
};

const SchoolCard: React.FC<ICardEscla> = ({
  cidade,
  endereco,
  modal,
  nome,
  rank,
}) => {
  const FormatSchoolNameWithProfileIMG = React.useMemo(() => {
    let _resut = nome.replaceAll("E.E.E.", "").replaceAll("F.M", "");
  
    while (_resut.indexOf(" ") === 0) {
      _resut = _resut.replace(" ", "")
    }

    return _resut;
  }, [nome]);

  const _flex = useBreakpointValue({
    base: [1, 2],
    sm: [0, 0]
  })
  return (
    <Center py={8}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ md: "385px", base: "300px" }}
        height={{ md: "10rem", base: "300px" }}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"lg"}
        padding={4}
        position="relative"
      >
        <Box position="absolute" right="3%" textColor="_orange.100">
          {rank}
        </Box>
        <Flex
          flex={_flex[1]}
          alignItems="center"
          justifyContent="center"
        >
          <Avatar
            size={{
              base: "2xl",
            }}
            name={FormatSchoolNameWithProfileIMG}
            // src={
            //   "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            // }
          />
        </Flex>
        <Stack
          flex={_flex[2]}
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Text fontFamily={"body"} fontSize="xx-small">
            {modal}
          </Text>
          <Box
            fontWeight={600}
            color={"gray.700"}
            marginTop="0"
            p={0}
            fontSize="sm"
          >
            {nome}
          </Box>
          <Box
            textAlign="left"
            fontSize="sm"
            color={useColorModeValue("gray.700", "gray.400")}
            marginTop="0"
            p={0}
          >
            {endereco}
          </Box>
          <Text
            textAlign="left"
            fontSize="sm"
            color={useColorModeValue("gray.700", "gray.400")}
            mt={0}
          >
            {cidade}
          </Text>
          {/* <Stack align={"center"} justify={"center"} direction={"row"}>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              #art
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              #photography
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              #music
            </Badge>
          </Stack> */}

          {/* <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"row"}
            padding={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              _focus={{
                bg: "gray.200",
              }}
            >
              Message
            </Button>
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
            >
              Follow
            </Button>
          </Stack> */}
        </Stack>
      </Stack>
    </Center>
  );
};

export default SchoolCard;
