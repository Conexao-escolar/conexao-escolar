import React from "react";

import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import {
  ISchoolProps
} from "../../entities/school";
import SchoolLine from "./SchoolLine";

export interface ICardEscolaProps {
  escolas: ISchoolProps[];
  title: string;
  label?: string;
  main_color: "purple" | "green";
  tag?: string;
}

type IChildrenCardProps = ICardEscolaProps & {
  reverse?: ICardEscolaProps;
};

const CardEscola: React.FC<IChildrenCardProps> = ({
  escolas,
  reverse,
  main_color,
  title,
  label,
  tag,
}) => {
  const BG_LABEL_COLOR = main_color === "purple" ? "purple.500" : "green.300";

  const MAIN_COLOR = (_color) =>
    _color === "green" ? "_orange.500" : "purple.700";

  if (!escolas.length) return;

  const Title = ({
    tag,
    title,
    bad = false,
  }: {
    tag: string;
    title: string;
    bad?: boolean;
  }) => {
    return (
      <Text fontSize="lg" color="gray.700">
        {`${title}`}
        <span className={`tag ${bad ? "bad" : ""}`}> #{tag}</span>
      </Text>
    );
  };

  return (
    <Box
      bg="white"
      flex="1"
      border="1px solid #B9B9B9"
      px={5}
      py={10}
      textAlign="center"
      maxW="305px"
      borderRadius="5px"
    >
      <>
        <Flex justifyContent="center" h="50px">
          <Title tag={tag} title={title} />
        </Flex>

        {label && (
          <Box
            bg={BG_LABEL_COLOR}
            borderRadius="5px"
            textAlign="center"
            mt={4}
            p={2}
            textColor="white"
          >
            <Text>{label}</Text>
          </Box>
        )}

        <Flex flexDir="column" w="100%" gap="15px" mt={4}>
          {escolas.map((escola, index) => (
            <SchoolLine
              {...escola}
              index={index + 1}
              color={MAIN_COLOR(main_color)}
              key={`first-${escola.id}`}
            />
          ))}
        </Flex>
        {reverse && (
          <>
            <Divider my={5} />
            <Flex flexDir="column" w="100%" gap="15px" mt={4}>
              <Flex justifyContent="center" h="50px">
                <Title tag={reverse.tag} title={reverse.title} bad />
              </Flex>
              {reverse.escolas.map((escola, index) => {
                return (
                  <SchoolLine
                    id={escola.id}
                    nome={escola.nome}
                    rank={escola.rank}
                    index={index + 1}
                    color={MAIN_COLOR(reverse.main_color)}
                    key={`first-${escola.id}`}
                  />
                );
              })}
            </Flex>
          </>
        )}
      </>
    </Box>
  );
};

export default CardEscola;
