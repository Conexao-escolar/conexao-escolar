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
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import React from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { FiAlertCircle, FiAlertOctagon } from "react-icons/fi";
import { MdSend } from "react-icons/md";
import { IComents } from "../../../../types/IEscola";
import { IComentFunctionsProps } from ".";
import ReplyedComment from "./Replyed";

import useAuth from "../../../../User/hooks/useAuth";

export type IComentProp = IComents &
  Omit<IComentFunctionsProps, "onComentEnter"> & {
    report(commentId: string, replyedId: string): void;
  };

const Comentarios: React.FC<IComentProp> = ({
  _id,
  created_date,
  message,
  replyed,
  dislike,
  aproved,
  user_like = [],
  user_dislike = [],
  like,
  report,
  tags,
  onComentReplyedEnter,
  addDislike,
  addLike,
}) => {
  const [replyedComment, setReplyedComment] = React.useState<string>("");

  const { user } = useAuth();
  const formatedDate = React.useMemo(() => {
    if (created_date instanceof Date) {
      return created_date.toISOString();
    }

    return created_date;
  }, [created_date]);

  const userAlredyLiked = React.useMemo(() => {
    if (user) {
      return user_like.includes(user.id);
    }

    return false;
  }, [user, user_like]);

  const userAlredyDisLiked = React.useMemo(() => {
    if (user) {
      return user_dislike.includes(user.id);
    }

    return false;
  }, [user, user_dislike]);

  const _onComentReplyedEnter = React.useCallback(() => {
    onComentReplyedEnter({
      coment_id: _id,
      comment: replyedComment,
    });

    setReplyedComment("");
  }, [_id, onComentReplyedEnter, replyedComment]);

  const _addLike = React.useCallback(() => {
    addLike({
      commnetId: _id,
    });
  }, [_id, addLike]);

  const _addDislike = React.useCallback(() => {
    addDislike({
      commnetId: _id,
    });
  }, [_id, addDislike]);

  return (
    <Flex
      w="full"
      p={4}
      flexDir="column"
      border="1px solid #e0e0e0"
      borderRadius="8px"
      bg={aproved ? "white" : "gray.200"}
      position="relative"
    >
      {!aproved && (
        <Box position="absolute" right="0" w="50px" h="50px">
          <Popover trigger="hover" placement="bottom-end">
            <PopoverTrigger>
              <IconButton
                aria-label="Info"
                variant="ghost"
                colorScheme="facebook"
                icon={<FiAlertCircle size={24} />}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Comentário em avaliação!</PopoverHeader>
              <PopoverBody>
                Seu comentário esta sendo avaliado por nossos moderadores
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      )}

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
        <Flex>
          <Box>
            <Button
              leftIcon={<Icon as={BiLike} />}
              variant={userAlredyLiked ? "solid" : "ghost"}
              colorScheme="blue"
              onClick={_addLike}
            >
              Gostei
            </Button>
            {" "}- {like}
          </Box>
          <Box ml={5}>
            <Button
              leftIcon={<Icon as={BiDislike} />}
              colorScheme="red"
              onClick={_addDislike}
              variant={userAlredyDisLiked ? "solid" : "ghost"}
            >
              Não gostei
            </Button>
            {" "}- {dislike}
          </Box>
        </Flex>
        <IconButton
          variant="ghost"
          colorScheme="red"
          title="denunciar comentário"
          aria-label="Denunciar comentário"
          icon={<Icon as={FiAlertOctagon} />}
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
            <ReplyedComment
              {...rep}
              report={(e: string) => report(_id, e)}
              addDislike={({ commnetId }) =>
                addDislike({
                  commnetId: _id,
                  replyedId: commnetId,
                })
              }
              addLike={({ commnetId }) =>
                addLike({
                  commnetId: _id,
                  replyedId: commnetId,
                })
              }
            />
            <Divider my={4} />
          </React.Fragment>
        ))}
      </Box>
    </Flex>
  );
};

export default Comentarios;
