/* eslint-disable react/no-children-prop */
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  Icon,
} from "@chakra-ui/react";
import React from "react";

import Container from "../components/Container";
import Menus from "../components/Nav/MenuOpcoes";
import Input, { SelectInput } from "../components/Input";
import CardEscola, { ICardEscolaProps } from "../components/CardEscola";

import { FaSearch } from "react-icons/fa";

import { MdStar } from "react-icons/md";

export default function Home() {
  const BannerFilter = () => {
    const listOfStates = React.useMemo(() => ["Rondônia", "Mato Grosso"], []);

    const listOfCitys = React.useMemo(
      () => ({
        Rondônia: ["Porto Velho", "Vilhena"],
      }),
      []
    );

    return (
      <Flex
        bg="_blue"
        w="full"
        h="300px"
        flexDir="column"
        align="center"
        justifyContent="center"
      >
        <Text color="white" fontSize="3xl" fontWeight="semibold">
          Pesquise a escola desejada
        </Text>
        <Stack
          mt={8}
          direction={{
            base: "column",
            md: "row",
          }}
        >
          <Input
            placeholder="Escola"
            icon={FaSearch}
            inputProps={{
              background: "white",
              minW: "300px",
            }}
          />
          <SelectInput
            placeholder="Estado"
            inputProps={{
              background: "white",
              minW: "300px",
            }}
            elements={listOfStates}
            defaultIndexSelected={0}
            disabledIndex={[1]}
            popHouverMessageOnDisabledItems="Em breve..."
          />
          <SelectInput
            placeholder="Cidade"
            inputProps={{
              background: "white",
              minW: "300px",
            }}
            elements={listOfCitys["Rondônia"]}
            defaultIndexSelected={0}
            disabledIndex={[1]}
            popHouverMessageOnDisabledItems="Em breve..."
          />
        </Stack>
      </Flex>
    );
  };

  const { escolas }: ICardEscolaProps = {
    escolas: [
      {
        cidade: "Porto Velho RO",
        endereco: "Avenida Brasil, 6235",
        modal: "Publico",
        nome: "E.E.E.F.M Maria Antonia",
        rank: 4.5,
      },
      {
        cidade: "Porto Velho RO",
        endereco: "Avenida Brasil, 6235",
        modal: "Publico",
        nome: "E.E.E.F.M Maria Antonia",
        rank: 4.5,
      },
      {
        cidade: "Porto Velho RO",
        endereco: "Avenida Brasil, 6235",
        modal: "Publico",
        nome: "E.E.E.F.M Maria Antonia",
        rank: 4.5,
      },
      {
        cidade: "Porto Velho RO",
        endereco: "Avenida Brasil, 6235",
        modal: "Publico",
        nome: "E.E.E.F.M Maria Antonia",
        rank: 4.5,
      },
      {
        cidade: "Porto Velho RO",
        endereco: "Avenida Brasil, 6235",
        modal: "Publico",
        nome: "E.E.E.F.M Maria Antonia",
        rank: 4.5,
      },
      {
        cidade: "Porto Velho RO",
        endereco: "Avenida Brasil, 6235",
        modal: "Publico",
        nome: "E.E.E.F.M Maria Antonia",
        rank: 4.5,
      },
      {
        cidade: "Porto Velho RO",
        endereco: "Avenida Brasil, 6235",
        modal: "Publico",
        nome: "E.E.E.F.M Maria Antonia",
        rank: 4.5,
      },
      {
        cidade: "Porto Velho RO",
        endereco: "Avenida Brasil, 6235",
        modal: "Publico",
        nome: "E.E.E.F.M Maria Antonia",
        rank: 4.5,
      },
      {
        cidade: "Porto Velho RO",
        endereco: "Avenida Brasil, 6235",
        modal: "Publico",
        nome: "E.E.E.F.M Maria Antonia",
        rank: 4.5,
      },
      {
        cidade: "Porto Velho RO",
        endereco: "Avenida Brasil, 6235",
        modal: "Publico",
        nome: "E.E.E.F.M Maria Antonia",
        rank: 4.5,
      },
    ],
  };

  const PioresEscolas = () => {
    return (
      <Box
        bg="white"
        flex="1"
        border="1px solid #B9B9B9"
        px={5}
        py={10}
        textAlign="center"
        maxW="305px"
        borderRadius="5px"
      >
        <Text fontSize="lg" color="gray.700">
          Piores escolas
        </Text>
        <Box
          bg="purple.500"
          borderRadius="5px"
          textAlign="center"
          mt={4}
          p={2}
          textColor="white"
        >
          <Text>Escolas que mais se destacaram nos últimos 30 dias</Text>
        </Box>
        <Flex flexDir="column" w="100%" gap="15px" mt={4}>
          <Flex flex="1" justifyContent="space-around">
            <Box maxW="10%">
              <Text color="purple.700" fontSize="lg" fontWeight="semibold">
                1
              </Text>
            </Box>
            <Box maxW="60%">
              <Link>
                <Text noOfLines={1}>EEEFM Juscelino Kubitecheksksks</Text>
              </Link>
            </Box>
            <Box maxW="30%" textColor="gray.600">
              <Icon as={MdStar} color="purple.700" /> 4,9
            </Box>
          </Flex>
          <Flex flex="1" justifyContent="space-around">
            <Box maxW="10%">
              <Text color="purple.700" fontSize="lg" fontWeight="semibold">
                1
              </Text>
            </Box>
            <Box maxW="60%">
              <Link>
                <Text noOfLines={1}>EEEFM Juscelino Kubitecheksksks</Text>
              </Link>
            </Box>
            <Box maxW="30%" textColor="gray.600">
              <Icon as={MdStar} color="purple.700" /> 4,9
            </Box>
          </Flex>
          <Flex flex="1" justifyContent="space-around">
            <Box maxW="10%">
              <Text color="purple.700" fontSize="lg" fontWeight="semibold">
                1
              </Text>
            </Box>
            <Box maxW="60%">
              <Link>
                <Text noOfLines={1}>EEEFM Juscelino Kubitecheksksks</Text>
              </Link>
            </Box>
            <Box maxW="30%" textColor="gray.600">
              <Icon as={MdStar} color="purple.700" /> 4,9
            </Box>
          </Flex>
          <Flex flex="1" justifyContent="space-around">
            <Box maxW="10%">
              <Text color="purple.700" fontSize="lg" fontWeight="semibold">
                1
              </Text>
            </Box>
            <Box maxW="60%">
              <Link>
                <Text noOfLines={1}>EEEFM Juscelino Kubitecheksksks</Text>
              </Link>
            </Box>
            <Box maxW="30%" textColor="gray.600">
              <Icon as={MdStar} color="purple.700" /> 4,9
            </Box>
          </Flex>
        </Flex>
      </Box>
    );
  };
  const MelhoresEscolas = () => {
    return (
      <Box
        bg="white"
        flex="1"
        border="1px solid #B9B9B9"
        px={5}
        py={10}
        textAlign="center"
        maxW="305px"
        borderRadius="5px"
      >
        <Text fontSize="lg" color="gray.700">
          Melhores escolas
        </Text>
        <Box
          bg="green.300"
          borderRadius="5px"
          textAlign="center"
          mt={4}
          p={2}
          textColor="white"
        >
          <Text>Escolas que mais se destacaram nos últimos 30 dias</Text>
        </Box>
        <Flex flexDir="column" w="100%" gap="15px" mt={4}>
          <Flex flex="1" justifyContent="space-around">
            <Box maxW="10%">
              <Text color="_orange.500" fontSize="lg" fontWeight="semibold">
                1
              </Text>
            </Box>
            <Box maxW="60%">
              <Link>
                <Text noOfLines={1}>EEEFM Juscelino Kubitecheksksks</Text>
              </Link>
            </Box>
            <Box maxW="30%" textColor="gray.600">
              <Icon as={MdStar} color="_orange.500" /> 4,9
            </Box>
          </Flex>
          <Flex flex="1" justifyContent="space-around">
            <Box maxW="10%">
              <Text color="_orange.500" fontSize="lg" fontWeight="semibold">
                1
              </Text>
            </Box>
            <Box maxW="60%">
              <Link>
                <Text noOfLines={1}>EEEFM Juscelino Kubitecheksksks</Text>
              </Link>
            </Box>
            <Box maxW="30%" textColor="gray.600">
              <Icon as={MdStar} color="_orange.500" /> 4,9
            </Box>
          </Flex>
          <Flex flex="1" justifyContent="space-around">
            <Box maxW="10%">
              <Text color="_orange.500" fontSize="lg" fontWeight="semibold">
                1
              </Text>
            </Box>
            <Box maxW="60%">
              <Link>
                <Text noOfLines={1}>EEEFM Juscelino Kubitecheksksks</Text>
              </Link>
            </Box>
            <Box maxW="30%" textColor="gray.600">
              <Icon as={MdStar} color="_orange.500" /> 4,9
            </Box>
          </Flex>
          <Flex flex="1" justifyContent="space-around">
            <Box maxW="10%">
              <Text color="_orange.500" fontSize="lg" fontWeight="semibold">
                1
              </Text>
            </Box>
            <Box maxW="60%">
              <Link>
                <Text noOfLines={1}>EEEFM Juscelino Kubitecheksksks</Text>
              </Link>
            </Box>
            <Box maxW="30%" textColor="gray.600">
              <Icon as={MdStar} color="_orange.500" /> 4,9
            </Box>
          </Flex>
        </Flex>
      </Box>
    );
  };

  return (
    <Container activeMenu={Menus.Home} extraContainer={<BannerFilter />}>
      <Box mt="100px">
        <Flex
          flexDir="row"
          alignItems="center"
          justifyContent="space-around"
          gap="80px"
          p={4}
          style={{}}
        >
          <Box flex="1" textAlign="left">
            <Heading fontWeight="semibold">Ranking das escolas</Heading>
            <Text fontSize="sm" color="gray.400">
              Referente aos últimos 30 dias
            </Text>
            <Box w="100%" p={4}>
              <Text>
                {"   "} A partir das avaliações dos pais, alunos e professores
                sobre as insituições nós construímos o nosso Ranking e, assim,
                ajudamos pessoas que querem analisar como está a situação das
                escolas em sua cidade no site, qual sua colocação e servir de
                apoio na decisão da matrícula.
              </Text>
            </Box>

            <Button
              variant="outline"
              borderColor="_orange.100"
              textColor="gray.700"
              fontWeight="normal"
            >
              Ver ranking completo
            </Button>
          </Box>
          <MelhoresEscolas />
          <PioresEscolas />
        </Flex>
        {/* <CardEscola escolas={escolas} /> */}
      </Box>
      <Divider mt={4} />

      <Flex mt={8} justifyContent="space-between">
        <Button colorScheme="green">Deixe sua opinião</Button>
        <Button colorScheme="_orange">Cadastre uma escola</Button>
        <Button colorScheme="blue">Entre em contato</Button>
      </Flex>
    </Container>
  );
}
