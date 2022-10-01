import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
import React from "react";
import { MdStar } from "react-icons/md";
import ICardEscla from "../../types/IEscola";

type Props = Omit<Omit<Omit<Omit<ICardEscla, "tags">, "modal">, "cidade">, "endereco"> & {
  color: string;
  index: number;
};

const SchoolLine: React.FC<Props> = ({
  color,
  id,
  nome,
  rank,
  index,
}) => {

  return (
    <Flex flex="1" justifyContent="space-around" key={`first-${id}`}>
      <Box w="10%">
        <Text color={color} fontSize="lg" fontWeight="semibold">
          {index}
        </Text>
      </Box>
      <Box w="60%" textAlign="left" paddingLeft={3}>
        <Link>
          <Text noOfLines={1}>{nome}</Text>
        </Link>
      </Box>
      <Box w="30%" textColor={color}>
        <Icon as={MdStar} color={color} /> {rank}
      </Box>
    </Flex>
  );
};

export default SchoolLine;
