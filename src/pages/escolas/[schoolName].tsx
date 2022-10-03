import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

import Container from "../../components/Container";
import Menus from "../../components/Nav/MenuOpcoes";
import { useRouter } from "next/router";
import getSchoolDetail from "../../services/getSchoolDetail";
import IEscola, { IEscolaProfile } from "../../types/IEscola";

import { MdPhotoCamera, MdStar } from "react-icons/md";
import formatRank from "../../utils/formatRank";
import SchoolTabs from "../../components/SchoolDetails/Tabs";

const SchoolDetail: React.FC = () => {
  const [schoolDetail, setScholDetail] = React.useState<IEscolaProfile>({} as IEscolaProfile);

  const {
    query: { schoolName },
  } = useRouter();

  const Reputacao = React.useMemo(() => {
    const rank = formatRank(schoolDetail.rank);

    if (!schoolDetail.rank) return;

    if (rank === "Ruim" || rank === "Péssimo")
      return (
        <>
          <Flex alignItems="center" justifyContent="center">
            <Text>Reputação geral: </Text> {"  "}{" "}
            <Icon as={MdStar} boxSize={5} color="#874A9F" />
            {schoolDetail.rank}
          </Flex>
          <Text fontSize="2xl" fontWeight="bold" textColor="#874A9F">
            {rank}
          </Text>
        </>
      );

    if (rank === "Excelente") {
      return (
        <>
          <Flex alignItems="center" justifyContent="center">
            <Text>Reputação geral: </Text> {"  "}{" "}
            <Icon as={MdStar} boxSize={5} color="#FF6736" />
            {schoolDetail.rank}
          </Flex>
          <Text fontSize="2xl" fontWeight="bold" textColor="#FF6736">
            {rank}
          </Text>
        </>
      );
    }

    return (
      <>
        <Flex alignItems="center" justifyContent="center">
          <Text>Reputação geral: </Text> {"  "}{" "}
          <Icon as={MdStar} boxSize={5} color="#00CF9A" />
          {schoolDetail.rank}
        </Flex>
        <Text fontSize="2xl" fontWeight="bold" textColor="#00CF9A">
          {rank}
        </Text>
      </>
    );
  }, [schoolDetail]);

  React.useEffect(() => {
    getSchoolDetail(String(schoolName)).then((result) =>
      setScholDetail(result)
    );
  }, [schoolName]);

  const BannerSchool = () => {
    return (
      <Box w="full" h="350px">
        <Box w="full" bg="_blue" h="40%" position="relative" px="100px">
          <Flex
            w="120px"
            h="120px"
            bg="#D9D9D9"
            borderRadius="50%"
            position="absolute"
            bottom="-30%"
            boxShadow="sm"
            alignItems="center"
            justifyContent="center"
            zIndex={2}
          >
            <Icon as={MdPhotoCamera} boxSize={8} color="gray.600" />
          </Flex>

          <Box position="absolute" right="50px" bottom="0">
            Capa
          </Box>
        </Box>
        <Flex
          w="full"
          bg="white"
          h="60%"
          position="relative"
          px="100px"
          justifyContent="space-around"
          alignItems="center"
        >
          <Flex flexDir="column">
            <Heading textColor="gray.600" fontSize="3xl">
              {schoolDetail.nome}
            </Heading>
            <Text>{`${schoolDetail.endereco} - ${schoolDetail.cidade}`}</Text>
          </Flex>
          <Flex flexDir="column">
            <Flex
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              border="1px solid #B9B9B9"
              p={4}
            >
              {Reputacao}
            </Flex>
            <Flex mt={3} alignItems="center" justifyContent="center">
              <Button colorScheme="teal">Deixe sua opinião</Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    );
  };

  return (
    <Container activeMenu={Menus.Escolas} extraContainer={<BannerSchool />}>
      <Divider mt={4} />
      <Flex mt={4} w="full">
        <Tabs w="full" colorScheme="orange">
          <Flex
            flexDir="row"
            w="full"
            alignItems="center"
            justifyContent="center"
          >
            <TabList>
              <Tab>Reputação</Tab>
              <Tab>Sobre</Tab>
              <Tab>Conteúdo</Tab>
              <Tab>Localização</Tab>
              <Tab>Comentários</Tab>
            </TabList>
          </Flex>
          <Flex flex="1" w="full">
            <SchoolTabs school={schoolDetail} />
          </Flex>
        </Tabs>
      </Flex>
      {/* <Box>{schoolDetail.cidade}</Box> */}
    </Container>
  );
};

export default SchoolDetail;

// export async function getStaticProps({ params }) {
//   console.log(params);

//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }
