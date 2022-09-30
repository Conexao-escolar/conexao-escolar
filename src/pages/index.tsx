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
import CardEscola from "../components/CardEscola";

import { FaSearch } from "react-icons/fa";

import { MdStar } from "react-icons/md";
import useSchool from "../hooks/useSchool";
import separeteSchoolsByRank from "../services/separeteSchoolsByRank";

export default function Home() {
  const [goodSchols, setGoodSchools] = React.useState([]);
  const [badSchools, setBadSchools] = React.useState([]);

  const { schools } = useSchool();

  React.useEffect(() => {
    const byRank = separeteSchoolsByRank(schools, 4, 4);

    setGoodSchools(byRank.asc);
    setBadSchools(byRank.desc);
  }, [schools]);

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

  const PioresEscolas = () => (
    <CardEscola
      escolas={badSchools}
      title="Piores Escolas"
      main_color="purple"
      label="Escolas que menos se destacaram nos últimos 30 dias"
    />
  );
  const MelhoresEscolas = () => (
    <CardEscola
      escolas={goodSchols}
      main_color="green"
      title="Melhores escolas"
      label="Escolas que mais se destacaram nos últimos 30 dias"
    />
  );

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
