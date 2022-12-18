import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Container from "../../components/Container";
import Menus from "../../components/Nav/MenuOpcoes";
// import { Container } from './styles';
import ALL_CIDADES_RO from "../../utils/allCidadesRO";
const RegisterNewSchool: React.FC = () => {

  return (
    <Container activeMenu={Menus.Escolas}>
      <Stack mt={4}>
        <Heading textColor="gray.700">
          Cadastre uma nova instituição de ensino
        </Heading>
        <Box border="1px solid #e0e0e0" px={4} py={2} borderRadius={8}>
          <Text>Dados referentes a instituição</Text>
          <Flex flexDir={["column", "row"]} gap={4} p={4}>
            <Flex flex={1}>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input type="text" placeholder="E.E.E. Maria Carmosina" />
                <FormHelperText>
                  Insira o nome da nova instituição de ensino.
                </FormHelperText>
              </FormControl>
            </Flex>
            <Flex flex={1} gap="20px" flexDir="row">
              <FormControl w="80%">
                <FormLabel>Cidade</FormLabel>
                <Select placeholder="Escolha uma cidade">
                  {ALL_CIDADES_RO.map(
                    (cidade, index) => (
                      <option value={cidade} key={`${cidade}-${index+1}`}>{cidade}</option>
                    )
                  )}
                </Select>
              </FormControl>
              <FormControl w="20%">
                <FormLabel>Estado</FormLabel>
                <Select value="RO">
                  <option value="RO">RO</option>
                </Select>
              </FormControl>
            </Flex>
          </Flex>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterNewSchool;
