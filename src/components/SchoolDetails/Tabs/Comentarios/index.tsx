import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Textarea,
  VStack,
  IconButton,
  Icon,
  Text,
  Tag,
  Divider,
  useDisclosure,
  CheckboxGroup,
  Checkbox,
  Center,
} from "@chakra-ui/react";

import { MdSend } from "react-icons/md";
import { FiAlertCircle } from "react-icons/fi";
import { BiLike, BiDislike } from "react-icons/bi";

import { SelectInput } from "../../../Input";
import ALL_TAGS from "../../../../types/ITags";
import { IEscolaProfile } from "../../../../types/IEscola";
import Modal from "../../../Modal";

import ComentLine from "./Coment";

export type ICommentCallBackProps = {
  comment: string;
  tags: ALL_TAGS[];
};

export type IReplyedCommentCallBackProps = {
  comment: string;
  coment_id: string;
};

export type IComentProps = {
  data: string;
  message: string;
  _id: string;
  tags: Array<ALL_TAGS>;
};

export type IComentFunctionsProps = {
  onComentEnter(props: ICommentCallBackProps): void;
  onComentReplyedEnter(props: IReplyedCommentCallBackProps): void;
};

type IProp = Pick<IEscolaProfile, "comentarios"> & IComentFunctionsProps;

const Comentarios: React.FC<IProp> = ({
  comentarios = [],
  onComentEnter,
  onComentReplyedEnter,
}) => {
  const [selectedTagsToComent, setSelectedTagsToComent] = React.useState<
    Array<ALL_TAGS>
  >([]);
  const [mappedFunction, setMappedFunction] = React.useState(null);

  const [ofensiveComent, setOfensiveComent] = React.useState(false);
  const [tendicioseComent, setTendencioseComent] = React.useState(false);
  const [racismComent, setRacismComent] = React.useState(false);
  const [comment, setComment] = React.useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: confirmIsOpen,
    onOpen: onOpenConfirmDenuncia,
    onClose: onCloseConfirmDenuncia,
  } = useDisclosure();

  const reset = React.useCallback(() => {
    setSelectedTagsToComent([]);
    setMappedFunction(null);
    setOfensiveComent(false);
    setTendencioseComent(false);
    setRacismComent(false);
    setComment("");
  }, []);

  const onSelectTagsToComent = React.useCallback(
    (e: ALL_TAGS) =>
      setSelectedTagsToComent((old) => {
        if (!e || old.includes(e)) return [...old];

        old.push(e);

        return [...old];
      }),
    []
  );

  const removeTagToComent = React.useCallback((e: ALL_TAGS) => {
    setSelectedTagsToComent((old) => {
      const _new = old.filter((el) => el !== e);

      return [..._new];
    });
  }, []);

  const allTags = React.useMemo(() => Object.keys(ALL_TAGS), []);

  const reportComent = React.useCallback((comentId: string) => {
    console.log(`report comment ${comentId}`);
  }, []);

  const reportReplyedComment = React.useCallback(
    (comentId: string, replyedId: string) => {
      console.log(`report replyed ${comentId} ${replyedId}`);
    },
    []
  );

  const _closeModal = React.useCallback(
    (e: boolean) => {
      onClose();

      if (mappedFunction && e) {
        mappedFunction();
        onOpenConfirmDenuncia();
      }
    },
    [mappedFunction, onClose, onOpenConfirmDenuncia]
  );

  const _onComentEnter = React.useCallback(() => {
    const body: ICommentCallBackProps = {
      comment,
      tags: selectedTagsToComent,
    };

    onComentEnter(body);
    reset();
  }, [comment, onComentEnter, selectedTagsToComent, reset]);

  const _onComentReplyedEnter = React.useCallback(
    ({ coment_id, comment }: IReplyedCommentCallBackProps) => {
      const body: IReplyedCommentCallBackProps = {
        comment,
        coment_id,
      };

      onComentReplyedEnter(body);
      reset();
    },
    [onComentReplyedEnter, reset]
  );

  const _reportComment = React.useCallback(
    (comentId: string, replyedId: string) => {
      if (replyedId) {
        setMappedFunction(
          () => () => reportReplyedComment(comentId, replyedId)
        );
      } else {
        setMappedFunction(() => () => reportComent(comentId));
      }

      onOpen();
    },
    [onOpen, reportComent, reportReplyedComment]
  );

  React.useEffect(() => {
    return () => reset();
  }, [reset]);

  return (
    <>
      <Modal
        body={
          <Box w="full" mt={4}>
            <CheckboxGroup>
              <Flex flexDir="column" gap={4}>
                <Checkbox
                  value="ofensivo"
                  isChecked={ofensiveComent}
                  onChange={() => setOfensiveComent((el) => !el)}
                >
                  Comentário ofensivo
                </Checkbox>
                <Checkbox
                  value="tendencioso"
                  isChecked={tendicioseComent}
                  onChange={() => setTendencioseComent((el) => !el)}
                >
                  Comentário tendencioso
                </Checkbox>
                <Checkbox
                  value="racista"
                  isChecked={racismComent}
                  onChange={() => setRacismComent((el) => !el)}
                >
                  Racismo / Discurso de ódio
                </Checkbox>
              </Flex>
            </CheckboxGroup>
          </Box>
        }
        isOpen={isOpen}
        label="Qual motivo do seu reporte?"
        negative_label="Cancelar"
        onClose={_closeModal}
        positve_label="Denunciar"
        title="Reportar comentário"
      />
      <Modal
        body={<Center>Comentário denunciado com sucesso!</Center>}
        isOpen={confirmIsOpen}
        label=""
        positve_label="Confirmar"
        onClose={onCloseConfirmDenuncia}
        title="Obrigado pela denuncia"
      />
      <Flex flexDir="column" alignItems="center" gap={4} p={2}>
        <Container w="full">
          <Flex w="full" px={8} flexDir="column">
            <Textarea
              value={comment}
              onChange={({ target: { value } }) => setComment(value)}
              placeholder="Escreva aqui seu comentário anônimo"
              size="lg"
            />
            <Flex w="full" gap={4} flexDir="column" mt={4}>
              <Flex flex={1}>
                <SelectInput
                  placeholder="Selecione suas tags"
                  onSelectItem={onSelectTagsToComent}
                  elements={allTags}
                />
              </Flex>
              <Flex flex={1} gap={4}>
                {selectedTagsToComent.map((tag) => (
                  <Tag
                    key={`coments-tag-${tag}`}
                    colorScheme="blue"
                    size="lg"
                    as="em"
                    cursor="pointer"
                    title="remover tag"
                    onClick={() => removeTagToComent(tag)}
                  >
                    #{tag}
                  </Tag>
                ))}
              </Flex>
            </Flex>
            <Button
              mt={4}
              onClick={_onComentEnter}
              colorScheme="green"
              rightIcon={<Icon as={MdSend} />}
            >
              Comentar
            </Button>
          </Flex>
          <VStack w="full" mt={4}>
            {comentarios.map((coment) => (
              <ComentLine
                {...coment}
                report={_reportComment}
                key={`first-coments-${coment._id}`}
                onComentReplyedEnter={_onComentReplyedEnter}
              />
            ))}
          </VStack>
        </Container>
      </Flex>
    </>
  );
};

export default React.memo(Comentarios);