import React from "react";

import {
  Box,
  Flex,
  Text,
  Container as ChakraContainer,
  Center,
  IconButton,
  Heading,
  Tag,
  useDisclosure,
  Collapse,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";

import Container from "../../components/Container";
import Menus from "../../components/Nav/MenuOpcoes";
import { SelectInput } from "../../components/Input";
import CardEscola from "../components/CardEscola";


// SERVICES
import separeteSchoolsByTag, {
  SchoolsByTag
} from '../services/separeteSchoolsByTag';
import separeteSchoolsByRank, {
  ISchoolOrdenedByRank,
} from "../services/separeteSchoolsByRank";

import ALL_TAGS from "../../types/ITags";
import School, { ISchoolProps } from "../entities/school";

type IListSchool = {
  [Property in ALL_TAGS]?: ISchoolOrdenedByRank;
};

type IRankingProps = {
  schools: ISchoolProps[]
}

/**
 * // const { AUTISMO, FISICO, TDH, VISUAL } = JSON.parse(distribution);
    // return {
    //   AUTISMO,
    //   FISICO,
    //   TDH,
    //   VISUAL,
    // };
 * @returns 
 */
const Ranking: React.FC<IRankingProps> = ({schools}) => {
  const [thisSchool, setSchools] = React.useState<IListSchool>({});

  //return Object.values(ALL_TAGS)
  const [categoriaFilter, setCategoriaFilters] = React.useState([]);

  const { isOpen, onToggle } = useDisclosure();

  const removeTagFilter = React.useCallback((tagRemove: ALL_TAGS) => {
    setCategoriaFilters((old) => {
      const indexRemove = old.findIndex((el) => el === tagRemove);
      old.splice(indexRemove, 1);
      return [...old];
    });
  }, []);

  const addNewTagFilter = React.useCallback((tagAdd: ALL_TAGS) => {
    setCategoriaFilters((old) => {
      old.push(tagAdd);
      return [...old];
    });
  }, []);

  const includeThisTag = React.useCallback(
    (type: ALL_TAGS) => {
      const haveLength =
        !!thisSchool[type] &&
        !!thisSchool[type].asc.length &&
        !!thisSchool[type].desc.length;
      const haveCatFilter = !!categoriaFilter.length;

      if (!haveCatFilter) return haveLength;

      const haveThisTagOnFilter = categoriaFilter.includes(type);

      return haveLength && haveThisTagOnFilter;
    },
    [categoriaFilter, thisSchool]
  );

  React.useEffect(() => {
    if (schools.length) {
      const Schools = schools.map(school => new School(school));
      const byTag = separeteSchoolsByTag(Schools);

      const byRank: IListSchool = {
        AUTISMO: separeteSchoolsByRank(byTag.AUTISMO, 3, 10),
        FISICO: separeteSchoolsByRank(byTag.FISICO, 3, 10),
        TDAH: separeteSchoolsByRank(byTag.TDAH, 3, 10),
        VISUAL: separeteSchoolsByRank(byTag.VISUAL, 3, 10),
      };

      setSchools(byRank);
    }
  }, [schools]);

  const ContainerFilter = () => {
    return (
      <Box position="relative" w="full" minH="50px" bg="#F2F2F2" boxShadow="lg">
        <Collapse in={isOpen} animateOpacity>
          <Box
            bg="#F2F2F2"
            w="full"
            h="300px"
            flexDir="column"
            justifyContent="center"
            boxShadow="lg"
          >
            <ChakraContainer maxW="container.lg">
              <Flex w="full" flexDir="column" p={4} pt={8}>
                <Flex flexDir="row" gap="40px">
                  <Flex flexDir="column" w="80%">
                    <Text color="_orange.500" fontWeight="semibold">
                      Região:
                    </Text>
                    <Flex gap="20px" mt={2}>
                      <SelectInput
                        elements={["Rondônia"]}
                        placeholder="Filtrar por Estado"
                        defaultIndexSelected={0}
                      />
                      <SelectInput
                        elements={["Porto Velho"]}
                        placeholder="Filtarr por Cidade"
                        defaultIndexSelected={0}
                      />
                    </Flex>
                  </Flex>
                  <Flex flexDir="column" w="20%">
                    <Text color="_orange.500" fontWeight="semibold">
                      Categoria:
                    </Text>
                    <Flex mt={2}>
                      <SelectInput
                        elements={["Público", "Privado", "Ambas"]}
                        placeholder="Filtrar por categoria"
                        defaultIndexSelected={2}
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex flexDir="column" w="full" mt={8}>
                  <Text color="_orange.500" fontWeight="semibold">
                    Acessibilidade:
                  </Text>
                  <Flex mt={2} alignItems="center">
                    <Box w="20%">
                      <SelectInput
                        elements={Object.values(ALL_TAGS)}
                        placeholder="Tag para filtragem"
                        onSelectItem={addNewTagFilter}
                      />
                    </Box>
                    <Box w="80%">
                      <Flex flexDir="row" gap="20px" alignItems="center" ml={4}>
                        {categoriaFilter.map((cat) => (
                          <Tag
                            colorScheme="blue"
                            size="lg"
                            key={`filtro1-${cat}`}
                            as="em"
                            cursor="pointer"
                            onClick={(e) => removeTagFilter(cat)}
                          >
                            #{cat}
                          </Tag>
                        ))}
                      </Flex>
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
            </ChakraContainer>
          </Box>
        </Collapse>
        <Center
          position="absolute"
          w="40px"
          h="40px"
          bottom="-20px"
          right="150px"
          boxShadow="lg"
        >
          <IconButton
            title="recolher filtro"
            icon={<FaFilter />}
            onClick={onToggle}
            aria-label="expand-filter"
            colorScheme="orange"
          />
        </Center>
        {!isOpen && (
          <Flex
            flexDir="row"
            gap="20px"
            alignItems="center"
            justifyContent="center"
            p={4}
            ml={4}
          >
            {categoriaFilter.map((cat) => (
              <Tag
                colorScheme="blue"
                size="lg"
                key={`filtro1-${cat}`}
                as="em"
                cursor="pointer"
                onClick={(e) => removeTagFilter(cat)}
              >
                #{cat}
              </Tag>
            ))}
          </Flex>
        )}
      </Box>
    );
  };

  return (
    <Container
      activeMenu={Menus.Ranking}
      // extraContainer={<ContainerFilter />}
      containerSize="container.lg"
    >
      <Box mt={10}>
        <Center>
          <Heading fontWeight="medium" color="gray.600">
            Ranking
          </Heading>
        </Center>
        <Center mt={2}>
          <Text fontSize="lg" textAlign="center" maxW="800px">
            Quer saber quais as escolas com melhor infraestrutura pedagogica ou
            as instituições com mais reclamações dos últimos 30 dias ou até
            mesmo dos últimos 6 meses? Tudo isso você pode encontrar aqui!
          </Text>
        </Center>
        <Center mt={2}>
          <Text fontSize="sm" textAlign="center" maxW="800px">
            A partir das avaliações dos pais, alunos e professores sobre as
            insituições nós construímos o nosso Ranking e, assim, ajudamos
            pessoas que querem analisar como está a situação das escolas em sua
            cidade no site, qual sua colocação e servir de apoio na decisão da
            matrícula.
          </Text>
        </Center>
      </Box>

      <Flex flexDir="row" flex="1" justifyContent="space-between" mt={8}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {Object.values(ALL_TAGS).map((cat) => {
            const exibir = includeThisTag(cat);

            if (exibir)
              return (
                <GridItem key={`exibir-${cat}`}>
                  <CardEscola
                    escolas={thisSchool[cat].desc.map(school => school.Data)}
                    main_color="green"
                    title="Melhores escolas em"
                    tag={cat}
                    reverse={{
                      escolas: thisSchool[cat].asc.map(school => school.Data),
                      main_color: "purple",
                      tag: cat,
                      title: "Piores escolas em",
                    }}
                  />
                </GridItem>
              );
          })}
        </Grid>
      </Flex>
    </Container>
  );
};


export default Ranking;
