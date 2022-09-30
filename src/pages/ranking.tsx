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
  FlexProps,
} from "@chakra-ui/react";
import React from "react";

// import { Container } from './styles';

import Container from "../components/Container";
import Menus from "../components/Nav/MenuOpcoes";
import Inpu, { SelectInput } from "../components/Input";
import { FaFilter } from "react-icons/fa";

const Ranking: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();

  const [categoriaFilter, setCategoriaFilters] = React.useState([
    "Autismo",
    "Visual",
    "Fisico",
    "TDH",
  ]);

  const ContainerFilter = () => {
    const CategoriaDetails = (flexProps: FlexProps) => {
      return (
        <Flex
          flexDir="row"
          gap="20px"
          alignItems="center"
          ml={4}
          {...flexProps}
        >
          {categoriaFilter.map((cat) => (
            <Tag colorScheme="blue" size="lg" key={`filtro1-${cat}`} as="em">
              #{cat}
            </Tag>
          ))}
        </Flex>
      );
    };
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
                      <SelectInput elements={[]} placeholder="Estado" />
                      <SelectInput elements={[]} placeholder="Cidade" />
                    </Flex>
                  </Flex>
                  <Flex flexDir="column" w="20%">
                    <Text color="_orange.500" fontWeight="semibold">
                      Região:
                    </Text>
                    <Flex mt={2}>
                      <SelectInput elements={[]} placeholder="Ambas" />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex flexDir="column" w="full" mt={8}>
                  <Text color="_orange.500" fontWeight="semibold">
                    Categoria:
                  </Text>
                  <Flex mt={2} alignItems="center">
                    <Box w="20%">
                      <SelectInput elements={[]} placeholder="Categorias" />
                    </Box>
                    <Box w="80%">
                      <CategoriaDetails alignItems="center"  />
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
        {!isOpen && <CategoriaDetails  justifyContent="center" p={4}/>}
      </Box>
    );
  };

  return (
    <Container
      activeMenu={Menus.Ranking}
      extraContainer={<ContainerFilter />}
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

      <Flex flexDir="column">
        <Flex flexDir="row" w="100%" justifyContent="space-between" mt={10}>
          <Box>Melhor nissso</Box>
          <Box>Melhor nissso</Box>
          <Box>Melhor nissso</Box>
        </Flex>
        <Flex flexDir="row" w="100%" justifyContent="space-between" mt={10}>
          <Box>Melhor nissso</Box>
          <Box>Melhor nissso</Box>
          <Box>Melhor nissso</Box>
        </Flex>
        <Flex flexDir="row" w="100%" justifyContent="space-between" mt={10}>
          <Box>Melhor nissso</Box>
          <Box>Melhor nissso</Box>
          <Box>Melhor nissso</Box>
        </Flex>
        <Flex flexDir="row" w="100%" justifyContent="space-between" mt={10}>
          <Box>Melhor nissso</Box>
          <Box>Melhor nissso</Box>
          <Box>Melhor nissso</Box>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Ranking;
