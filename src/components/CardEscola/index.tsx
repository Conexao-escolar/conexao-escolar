import React from "react";

import {
  Box,
  Divider,
  Flex,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import CloneOBJ from "../../utils/cloneObj";
import { MdStar } from "react-icons/md";
import ICardEscla from "../../types/IEscola";

export interface ICardEscolaProps {
  escolas: ICardEscla[];
  title: string;
  label?: string;
  main_color: "purple" | "green";
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
}) => {
  const BG_LABEL_COLOR = main_color === "purple" ? "purple.500" : "green.300";

  const MAIN_COLOR = main_color === "green" ? "_orange.500" : "purple.700";

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
      <Text fontSize="lg" color="gray.700">
        {title}
      </Text>
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
          <Flex
            flex="1"
            justifyContent="space-around"
            key={`first-${escola.id}`}
          >
            <Box w="10%">
              <Text color={MAIN_COLOR} fontSize="lg" fontWeight="semibold">
                {index}
              </Text>
            </Box>
            <Box w="60%" textAlign="left" paddingLeft={3}>
              <Link>
                <Text noOfLines={1}>{escola.nome}</Text>
              </Link>
            </Box>
            <Box w="30%" textColor={MAIN_COLOR}>
              <Icon as={MdStar} color={MAIN_COLOR} /> {escola.rank}
            </Box>
          </Flex>
        ))}
      </Flex>
      {reverse && (
        <>
          <Divider my={5} />
          <Flex flexDir="column" w="100%" gap="15px" mt={4}>
            {reverse.escolas.map((escola, index) => (
              <Flex
                flex="1"
                justifyContent="space-around"
                key={`first-${escola.id}`}
              >
                <Box w="10%">
                  <Text color={MAIN_COLOR} fontSize="lg" fontWeight="semibold">
                    {index}
                  </Text>
                </Box>
                <Box w="60%" textAlign="left" paddingLeft={3}>
                  <Link>
                    <Text noOfLines={1}>{escola.nome}</Text>
                  </Link>
                </Box>
                <Box w="30%" textColor={MAIN_COLOR}>
                  <Icon as={MdStar} color={MAIN_COLOR} /> {escola.rank}
                </Box>
              </Flex>
            ))}
          </Flex>
        </>
      )}
    </Box>
  );
};

export default CardEscola;
