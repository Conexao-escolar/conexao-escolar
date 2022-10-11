import { Box, Flex, Grid, GridItem, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { MdStar } from "react-icons/md";
import { IReputacao } from "../../../types/IEscola";
import IRankSchool from "../../../types/IRankSchool";
// import { Container } from './styles';
import formatRank from "../../../utils/formatRank";

type IProps = {
  reputacao: IReputacao;
};

const Reputacao: React.FC<IProps> = ({ reputacao = {} }) => {
  const AllKeys = React.useMemo(() => Object.keys(reputacao), [reputacao]);

  const rankFormated = React.useCallback(
    (rank: number) => formatRank(rank),
    []
  );

  const Reputacao = React.useCallback(
    (
      reputacao: IRankSchool,
      rank: number,
      key: string
    ) => {
      if (reputacao === IRankSchool.Ruim || reputacao === IRankSchool.Pessimo)
        return (
          <>
            <Text>
              Reputação em
              <span className="tag"> #{key}</span>
            </Text>
            <Text fontSize="3xl" fontWeight="bold" textColor="#874A9F">
              {reputacao}
            </Text>
            <Flex flexDir="row" justifyContent="space-around" w="full">
              <Flex>
                <Icon as={MdStar} boxSize={5} color="#874A9F" />
                <Text>{rank}</Text>
              </Flex>
              {/* <Text>Ver reputação detalhada</Text> */}
            </Flex>
          </>
        );

      if (reputacao === IRankSchool["Muito bom"]) {
        return (
          <>
            <Text>
              Reputação em
              <span className="tag"> #{key}</span>
            </Text>
            <Text fontSize="3xl" fontWeight="bold" textColor="#FF6736">
              {reputacao}
            </Text>
            <Flex flexDir="row" justifyContent="space-around" w="full">
              <Flex>
                <Icon as={MdStar} boxSize={5} color="#FF6736" />
                <Text>{rank}</Text>
              </Flex>
              {/* <Text>Ver reputação detalhada</Text> */}
            </Flex>
          </>
        );
      }

      return (
        <>
          <Text>
            Reputação em
            <span className="tag"> #{key}</span>
          </Text>
          <Text fontSize="3xl" fontWeight="bold" textColor="#00CF9A">
            {reputacao}
          </Text>
          <Flex flexDir="row" justifyContent="space-around" w="full">
            <Flex>
              <Icon as={MdStar} boxSize={5} color="#00CF9A" />
              <Text>{rank}</Text>
            </Flex>
            {/* <Text>Ver reputação detalhada</Text> */}
          </Flex>
        </>
      );
    },
    []
  );

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      {AllKeys.map((key) => {
        const { rank = 0 } = reputacao[key];

        const thisRank = rankFormated(rank);

        return (
          <GridItem key={`tab-reputacao-${key}`}>
            <Box p={5}>
              <Flex
                flexDir="column"
                alignItems="center"
                justifyContent="space-around"
                border="1px solid #6C6C6C"
                borderRadius="5px"
                minH="150px"
              >
                {Reputacao(thisRank, rank, key)}
              </Flex>
            </Box>
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default Reputacao;
