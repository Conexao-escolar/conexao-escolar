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
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import NextLink from "next/link";

const Rodape: React.FC = () => {
  return (
    <Box mt={20} bg="#0A709B" px={20} pt={20} pb={8}>
      <Flex
        flexDir={["column", "column", "row"]}
        justifyContent="space-between"
      >
        <Flex flexDirection="column" gap={5}>
          <Box>
            <NextImg src="/logo.png" width="135px" height="96px" />
          </Box>
          <Box maxW="300px">
            <Text textColor="white" fontSize="sm" fontWeight="light">
              Em virtude dos problemas existentes nas escolas brasileiras acerca
              da educação inclusiva.
            </Text>
          </Box>
          {/* <Flex gap={3} mt={4}>
            <Icon as={FaFacebook} color="white" cursor="pointer" boxSize={5} />
            <Icon as={FaInstagram} color="white" cursor="pointer" boxSize={5} />
          </Flex> */}
        </Flex>
        <Flex flexDirection="column" gap={5} mt={[4, 4, 0]}>
          <Box>
            <Heading textColor="white" fontWeight="normal" fontSize="3xl">
              Pais e cuidadores
            </Heading>

            <Flex flexDir="column" gap="10px" textColor="gray.100" mt={4}>
              {/* <ChakraLink>Compare as escolas</ChakraLink> */}
              <NextLink href="/ranking">Ranking</NextLink>
              <NextLink
                href="https://forms.gle/ZgRfzsB6GDsgohVVA"
                target="_blank"
              >
                Recomende uma escola
              </NextLink>
              <NextLink
                href="https://forms.gle/caPPkkTW5ZrpiLZP6"
                target="_blank"
              >
                Fazer avaliação
              </NextLink>
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
        <Flex flexDirection="column" gap={5} mt={[4, 4, 0]}>
          <Box>
            <Heading textColor="white" fontWeight="normal" fontSize="3xl">
              Contato
            </Heading>

            <Flex flexDir="column" gap="10px" textColor="gray.100" mt={4}>
              <Flex textAlign="center" alignItems="center">
                {/*  */}
                <Icon as={FaWhatsapp} boxSize={5} mr={2} />
                <NextLink
                  target="_blank"
                  href="https://api.whatsapp.com/send?phone=556993014603&text=Ol%C3%A1%2C%20vim%20do%20site%20-%20Conex%C3%A3o%20escolar"
                >
                  Whatsapp
                </NextLink>
              </Flex>
              <Flex textAlign="center" alignItems="center">
                <Icon as={MdEmail} boxSize={5} mr={2} />
                <NextLink
                  href="mailto:conexao.escolar.pvh@gmail.com"
                  target="_blank"
                >
                  conexao.escolar.pvh@gmail.com
                </NextLink>
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

export default React.memo(Rodape);
