import { Box, Flex, Grid, GridItem, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { MdStar } from "react-icons/md";
import { IReputacao } from "../../../types/IEscola";
// import { Container } from './styles';

type IProps = {
    reputacao: IReputacao
}

const Reputacao: React.FC<IProps> = ({reputacao}) => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      <GridItem>
        <Box p={5}>
          <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="space-around"
            border="1px solid #6C6C6C"
            borderRadius="5px"
            minH="150px"
          >
            <Text>
              Reputação em
              <span className="tag"> #Autismo</span>
            </Text>
            <Text fontSize="3xl" fontWeight="bold" textColor="#FF6736">
              Excelente
            </Text>
            <Flex flexDir="row" justifyContent="space-around" w="full">
              <Flex>
                <Icon as={MdStar} boxSize={5} color="#FF6736" />
                <Text>4,9</Text>
              </Flex>
              <Text>Ver reputação detalhada</Text>
            </Flex>
          </Flex>
        </Box>
      </GridItem>
      <GridItem>
        <Box p={5}>
          <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="space-around"
            border="1px solid #6C6C6C"
            borderRadius="5px"
            minH="150px"
          >
            <Text>
              Reputação em
              <span className="tag"> #Autismo</span>
            </Text>
            <Text fontSize="3xl" fontWeight="bold" textColor="#FF6736">
              Excelente
            </Text>
            <Flex flexDir="row" justifyContent="space-around" w="full">
              <Flex>
                <Icon as={MdStar} boxSize={5} color="#FF6736" />
                <Text>4,9</Text>
              </Flex>
              <Text>Ver reputação detalhada</Text>
            </Flex>
          </Flex>
        </Box>
      </GridItem>
      <GridItem>
        <Box p={5}>
          <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="space-around"
            border="1px solid #6C6C6C"
            borderRadius="5px"
            minH="150px"
          >
            <Text>
              Reputação em
              <span className="tag"> #Autismo</span>
            </Text>
            <Text fontSize="3xl" fontWeight="bold" textColor="#FF6736">
              Excelente
            </Text>
            <Flex flexDir="row" justifyContent="space-around" w="full">
              <Flex>
                <Icon as={MdStar} boxSize={5} color="#FF6736" />
                <Text>4,9</Text>
              </Flex>
              <Text>Ver reputação detalhada</Text>
            </Flex>
          </Flex>
        </Box>
      </GridItem>
      <GridItem>
        <Box p={5}>
          <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="space-around"
            border="1px solid #6C6C6C"
            borderRadius="5px"
            minH="150px"
          >
            <Text>
              Reputação em
              <span className="tag"> #Autismo</span>
            </Text>
            <Text fontSize="3xl" fontWeight="bold" textColor="#FF6736">
              Excelente
            </Text>
            <Flex flexDir="row" justifyContent="space-around" w="full">
              <Flex>
                <Icon as={MdStar} boxSize={5} color="#FF6736" />
                <Text>4,9</Text>
              </Flex>
              <Text>Ver reputação detalhada</Text>
            </Flex>
          </Flex>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Reputacao;
