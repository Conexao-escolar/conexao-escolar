import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
import React from "react";
import { MdStar } from "react-icons/md";
import ICardEscla from "../../types/IEscola";
import NextLink from "next/link";

type Props = Omit<
  Omit<Omit<Omit<ICardEscla, "tags">, "modal">, "cidade">,
  "endereco"
> & {
  color: string;
  index: number;
};

const SchoolLine: React.FC<Props> = ({ color, id, nome, rank, index }) => {
  const formatedLink = React.useMemo(() => {
    return nome.replaceAll(" ", "")
  }, [nome])
  return (
    <Flex flex="1" justifyContent="space-around" key={`first-${id}`}>
      <Box w="10%">
        <Text color={color} fontSize="lg" fontWeight="semibold">
          {index}
        </Text>
      </Box>
      <Box w="60%" textAlign="left" paddingLeft={3}>
        <NextLink href={`/school/${formatedLink}`}>
          <Link>
            <Text noOfLines={1}>{nome}</Text>
          </Link>
        </NextLink>
      </Box>
      <Box w="30%" textColor={color}>
        <Icon as={MdStar} color={color} /> {rank}
      </Box>
    </Flex>
  );
};

export default SchoolLine;
