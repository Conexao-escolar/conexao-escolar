/* eslint-disable react/no-children-prop */
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";

import firebase from "../database";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import Container from "../components/Container";
import Menus from "../components/Nav/MenuOpcoes";
import CardEscola from "../School/components/CardEscola";

import School from "../School/entities/school";
import separeteSchoolsByRank from "../School/services/separeteSchoolsByRank";
import FirestoreDocumentoToSchool from '../School/mappers/firestore-to-school';

import ICardEscla, { IEscolaProfile } from "../types/IEscola";
// import School from "../models/school";

import { useRouter } from "next/router";

export default function Home({ schools, god, bad }) {
  const [goodSchols, setGoodSchools] = React.useState<ICardEscla[]>(() => {
    if (god) return JSON.parse(god);
  });
  const [badSchools, setBadSchools] = React.useState<ICardEscla[]>(() => {
    if (bad) return JSON.parse(bad);
  });

  const { push } = useRouter();

  // const { schools } = useSchool();

  // React.useEffect(() => {
  //   const byRank = separeteSchoolsByRank(schools, 4, 4);

  //   setGoodSchools(byRank.desc);
  //   setBadSchools(byRank.asc);
  // }, [schools]);

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
        h="500px"
        flexDir="column"
        align="center"
        justifyContent="center"
        position="relative"
      >
        <Box
          w="full"
          h="full"
          bgImage="/assets/school-banner.jpg"
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPosition="50% 30%"
          position="absolute"
          filter="auto"
          brightness="45%"
          blur="2px"
        />
        <Flex
          filter="auto"
          brightness="100%"
          flexDir="column"
          alignItems="center"
          justifyContent="space-around"
          h="full"
        >
          <Box textAlign="center" px={8}>
            <Text color="white" fontSize="3xl" fontWeight="bold" p={4}>
              Valorize a educação especial!
            </Text>
            <Text color="white" fontSize="xl" fontWeight="medium">
              Deseja saber quais as instituições de ensino mais preparadas para
              receber seu filho?
            </Text>
            <Box textAlign="center">
              <Box>
                <Text color="white">
                  Pesquise e descubra as melhores escolas de sua região. Avalie
                  o ambiente e a estrutura pedagógica escolar.{" "}
                </Text>
              </Box>
            </Box>
          </Box>
          <Flex
            w="full"
            alignItems="center"
            justifyContent="space-around"
            flexDir={["column", "row"]}
            gap={25}
            px={20}
          >
            <Button
              variant="outline"
              borderColor="_orange.100"
              textColor="_orange.100"
              fontWeight="bold"
              onClick={() => push("/ranking")}
            >
              Avalie uma escola
            </Button>
            <Button
              variant="outline"
              borderColor="_blue"
              textColor="_blue"
              fontWeight="bold"
              as="a"
              href="mailto:conexao.escolar.pvh@gmail.com"
            >
              Fale conosco
            </Button>
          </Flex>

          {/* <Stack
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
        </Stack> */}
        </Flex>
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

  const goToFeedback = React.useCallback(() => {
    window.open("https://forms.gle/caPPkkTW5ZrpiLZP6", "_blank");
  }, []);
  const goToRegisterNewInstituicao = React.useCallback(() => {
    window.open("https://forms.gle/ZgRfzsB6GDsgohVVA", "_blank");
  }, []);

  const goToEmail = React.useCallback(() => {
    window.open("mailto:conexao.escolar.pvh@gmail.com", "_blank");
  }, []);

  return (
    <Container activeMenu={Menus.Home} extraContainer={<BannerFilter />}>
      <Box mt="100px">
        <Flex
          flexDir={["column", "column", "row"]}
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
              onClick={() => push("/ranking")}
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
      {/* ["row", "column"] */}
      <Flex flexDir={["column", "row"]} mt={8} justifyContent="space-between">
        <Button mt={[4, 0]} colorScheme="green" onClick={goToFeedback}>
          Deixe sua opinião
        </Button>
        <Button
          mt={[4, 0]}
          colorScheme="_orange"
          onClick={goToRegisterNewInstituicao}
        >
          Cadastre uma escola
        </Button>
        <Button mt={[4, 0]} colorScheme="blue" onClick={goToEmail}>
          Entre em contato
        </Button>
      </Flex>
    </Container>
  );
}

export async function getStaticProps() {
  const db = getFirestore(firebase);

  const schoolsCollections = collection(db, "schools");
  const allSchools: School[] = await getDocs(schoolsCollections)
    .then((el) => {
      const result = el.docs.map((ab) => {
        const school = FirestoreDocumentoToSchool(ab);
        return school;
      });

      return result;
    })
    .catch((err) => {
      console.error("Erro ao buscar no database ", err.message || err);
      return [] as School[];
    });

  const { asc, desc } = separeteSchoolsByRank(allSchools, 4, 4);

  const _ascSchoolData = asc.map(data => data.Data);
  const _descSchoolData = desc.map(data => data.Data);
  const _allSchools = allSchools.map(school => school.Data);

  return {
    props: {
      schools: JSON.stringify(_allSchools),
      god: JSON.stringify(_ascSchoolData),
      bad: JSON.stringify(_descSchoolData),
    },
  };
}
