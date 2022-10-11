import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Text,
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
import { IPrimaryComents } from "../../../../types/IEscola";
import { IComentFunctionsProps } from "./";
// import { Container } from './styles';
import useAuth from "../../../../hooks/useAuth";

export type IReplyedComents = Omit<IPrimaryComents, "tags"> &
  Omit<Omit<IComentFunctionsProps, "onComentEnter">, "onComentReplyedEnter"> & {
    report(replyedId: string): void;
  };

const ReplyedComents: React.FC<IReplyedComents> = ({
  _id,
  created_date,
  message,
  report,
  dislike,
  aproved,
  user_dislike,
  user_like,
  like,
  addDislike,
  addLike,
}) => {
  const { user } = useAuth();

  const _report = React.useCallback(() => {
    report(_id);
  }, [report, _id]);

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

  return (
    <Box position="relative">
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
        <Flex>
          <Box>
            <Button
              leftIcon={<Icon as={BiLike} />}
              variant={userAlredyLiked ? "solid" : "ghost"}
              colorScheme="blue"
              size="sm"
              onClick={() =>
                addLike({
                  commnetId: _id,
                })
              }
            >
              Gostei
            </Button>
            {" "} - {like}
          </Box>
          <Box ml={5}>
            <Button
              leftIcon={<Icon as={BiDislike} />}
              variant={userAlredyDisLiked ? "solid" : "ghost"}
              colorScheme="red"
              size="sm"
              onClick={() =>
                addDislike({
                  commnetId: _id,
                })
              }
            >
              Não gostei
            </Button>
            {" "} - {dislike}
          </Box>
        </Flex>
        <Box>
          <IconButton
            variant="ghost"
            colorScheme="red"
            title="denunciar comentário"
            aria-label="Denunciar comentário"
            icon={<Icon as={FiAlertOctagon} />}
            onClick={_report}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default ReplyedComents;
