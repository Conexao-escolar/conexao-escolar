import React from "react";
import {
    Box,
    Flex,
    Text,
    Icon,
    Link as ChakraLink,
    Heading,
    Center,
  } from "@chakra-ui/react";
  import NextImg from "next/image";
  import {
    FaFacebook,
    FaInstagram,
    FaWhatsapp,
  } from "react-icons/fa";
  import { MdEmail } from "react-icons/md";
  

const Rodape: React.FC = () => {
  return (
    <Box mt={20} bg="#0A709B" px={20} pt={20} pb={8}>
      <Flex direction="row" justifyContent="space-between">
        <Flex flexDirection="column" gap={5}>
          <Box>
            <NextImg src="/logo.png" width="135px" height="96px" />
          </Box>
          <Box maxW="300px">
            <Text textColor="white" fontSize="sm" fontWeight="light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </Text>
          </Box>
          <Flex gap={3} mt={4}>
            <Icon as={FaFacebook} color="white" cursor="pointer" boxSize={5} />
            <Icon as={FaInstagram} color="white" cursor="pointer" boxSize={5} />
          </Flex>
        </Flex>
        <Flex flexDirection="column" gap={5}>
          <Box>
            <Heading textColor="white" fontWeight="normal" fontSize="3xl">
              Pais e cuidadores
            </Heading>

            <Flex flexDir="column" gap="10px" textColor="gray.100" mt={4}>
              <ChakraLink>Compare as escolas</ChakraLink>
              <ChakraLink>Ranking</ChakraLink>
              <ChakraLink>Recomende uma escola</ChakraLink>
              <ChakraLink>Fazer avaliação</ChakraLink>
            </Flex>
          </Box>
        </Flex>
        {/* <Flex flexDirection="column" gap={5}>
            <Box>
              <Heading textColor="white" fontWeight="normal" fontSize="3xl">
                Para escolas
              </Heading>

              <Flex flexDir="column" gap="10px" textColor="gray.100" mt={4}>
                <ChakraLink>Responder avaliações</ChakraLink>
              </Flex>
            </Box>
          </Flex> */}
        <Flex flexDirection="column" gap={5}>
          <Box>
            <Heading textColor="white" fontWeight="normal" fontSize="3xl">
              Contato
            </Heading>

            <Flex flexDir="column" gap="10px" textColor="gray.100" mt={4}>
              <Flex textAlign="center" alignItems="center">
                <Icon as={FaWhatsapp} boxSize={5} mr={2} />
                <ChakraLink>(69) 9 9999-9999</ChakraLink>
              </Flex>
              <Flex textAlign="center" alignItems="center">
                <Icon as={MdEmail} boxSize={5} mr={2} />
                <ChakraLink>conexaoescolar@email.com</ChakraLink>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Flex>

      <Center mt={8}>
        <Text color="gray.300" fontSize="sm" fontWeight="light">
          Conexão Escolar © 2022. Todos os direitos reservados.
        </Text>
      </Center>
    </Box>
  );
};

export default Rodape;
