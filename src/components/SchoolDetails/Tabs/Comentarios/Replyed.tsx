import { Box, Button, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { FiAlertCircle } from "react-icons/fi";
import { IPrimaryComents } from "../../../../types/IEscola";
import { IComentFunctionsProps } from "./";
// import { Container } from './styles';

export type IReplyedComents = Omit<IPrimaryComents, "tags"> & {
  report(replyedId: string): void;
};

const ReplyedComents: React.FC<IReplyedComents> = ({
  _id,
  created_date,
  message,
  report,
}) => {
  const _report = React.useCallback(() => {
    report(_id);
  }, [report, _id]);

  const formatedDate = React.useMemo(() => {
    if (created_date instanceof Date) {
      return created_date.toISOString();
    }

    return created_date;
  }, [created_date]);

  return (
    <Box>
      <Text fontSize="md" fontWeight="bold" color="gray.700">
        Usuário anônimo
        <span className="time"> - {formatedDate}</span>
      </Text>
      <Box px={4} py={2}>
        <Text textAlign="justify" fontSize="sm">
          {message}
        </Text>
      </Box>
      <Flex mt={2} w="full" justifyContent="space-between">
        <Box>
          <Button
            leftIcon={<Icon as={BiLike} />}
            variant="ghost"
            colorScheme="blue"
          >
            Gostei
          </Button>
          <Button
            leftIcon={<Icon as={BiDislike} />}
            variant="ghost"
            colorScheme="red"
          >
            Não gostei
          </Button>
        </Box>
        <Box>
          <IconButton
            variant="ghost"
            colorScheme="red"
            title="denunciar comentário"
            aria-label="Denunciar comentário"
            icon={<Icon as={FiAlertCircle} />}
            onClick={_report}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default ReplyedComents;
