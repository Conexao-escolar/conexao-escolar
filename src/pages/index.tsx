/* eslint-disable react/no-children-prop */
import {
  Box,
  Flex,
  HStack,
  Icon,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

import Container from "../components/Container";
import Menus from "../components/Nav/MenuOpcoes";
import Input, { SelectInput } from "../components/Input";
import CardEscola, { ICardEscolaProps } from "../components/CardEscola";

import { FaSearch } from "react-icons/fa";

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

  return (
    <Container activeMenu={Menus.Home} extraContainer={<BannerFilter />}>
      <Box>
        <CardEscola escolas={escolas} />
      </Box>
    </Container>
  );
}
