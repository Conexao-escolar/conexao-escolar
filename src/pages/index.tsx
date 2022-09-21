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

  return (
    <Container activeMenu={Menus.Home} extraContainer={<BannerFilter />}>
      <Box bg="red">sdf</Box>
    </Container>
  );
}
