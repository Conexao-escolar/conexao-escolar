import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  IconButton,
  Tag,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { FiAlertCircle } from "react-icons/fi";
import { MdSend } from "react-icons/md";
import { IComents } from "../../../../types/IEscola";
import { IComentFunctionsProps } from "./";
import ReplyedComment from "./Replyed";
// import { Container } from './styles';

type IComentProp = IComents &
  Pick<IComentFunctionsProps, "onComentReplyedEnter"> & {
    report(commentId: string, replyedId: string): void;
  };

const Comentarios: React.FC<IComentProp> = ({
  _id,
  created_date,
  message,
  replyed,
  report,
  tags,
  onComentReplyedEnter,
}) => {
  const [replyedComment, setReplyedComment] = React.useState<string>("");

  const formatedDate = React.useMemo(() => {
    if (created_date instanceof Date) {
      return created_date.toISOString();
    }

    return created_date;
  }, [created_date]);

  const _onComentReplyedEnter = React.useCallback(() => {
    onComentReplyedEnter({
      coment_id: _id,
      comment: replyedComment,
    });
  }, [_id, onComentReplyedEnter, replyedComment]);

  return (
    <Flex
      w="full"
      p={4}
      flexDir="column"
      border="1px solid #e0e0e0"
      borderRadius="8px"
    >
      <Text fontSize="lg" fontWeight="bold" color="gray.700">
        Usuário anônimo
        <span className="time"> - {formatedDate}</span>
      </Text>
      <Box px={4} py={2}>
        <Text textAlign="justify">{message}</Text>
        <Flex mt={4} gap={4}>
          {tags.map((tag) => (
            <Tag
              key={`coment-${_id}-tag-${tag}`}
              colorScheme="blue"
              size="lg"
              as="em"
            >
              #{tag}
            </Tag>
          ))}
        </Flex>
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
        <IconButton
          variant="ghost"
          colorScheme="red"
          title="denunciar comentário"
          aria-label="Denunciar comentário"
          icon={<Icon as={FiAlertCircle} />}
          onClick={() => report(_id, null)}
        />
      </Flex>
      <Box mt={2}>
        <Textarea
          value={replyedComment}
          onChange={({ target: { value } }) => setReplyedComment(value)}
          placeholder="Escreva aqui sua resposta anônima"
          size="lg"
        />
        <Button
          mt={4}
          colorScheme="green"
          rightIcon={<Icon as={MdSend} />}
          onClick={_onComentReplyedEnter}
        >
          Responder comentário
        </Button>
      </Box>
      <Divider mt={4} />
      <Box mt={4} paddingLeft={10}>
        {replyed.map((rep) => (
          <React.Fragment key={`coment-${_id}-replyed-${rep._id}`}>
            <ReplyedComment {...rep} report={(e: string) => report(_id, e)} />
            <Divider my={4} />
          </React.Fragment>
        ))}
      </Box>
    </Flex>
  );
};

export default Comentarios;
