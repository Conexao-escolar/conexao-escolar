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
} from "@chakra-ui/react";

import { MdSend } from "react-icons/md";
import { FiAlertCircle } from "react-icons/fi";
import { BiLike, BiDislike } from "react-icons/bi";

import { SelectInput } from "../../Input";
import ALL_TAGS from "../../../types/ITags";
import { IEscolaProfile } from "../../../types/IEscola";

type IProp = Pick<IEscolaProfile, "comentarios">;

const Comentarios: React.FC<IProp> = ({ comentarios = [] }) => {
  const [selectedTagsToComent, setSelectedTagsToComent] = React.useState<
    Array<ALL_TAGS>
  >([]);

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

  return (
    <Flex flexDir="column" alignItems="center" gap={4} p={2}>
      <Container w="full">
        <Flex w="full" px={8} flexDir="column">
          <Textarea
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
          <Button mt={4} colorScheme="green" rightIcon={<Icon as={MdSend} />}>
            Comentar
          </Button>
        </Flex>
        <VStack w="full">
          {comentarios.map((coment) => (
            <Flex
              key={`first-coments-${coment._id}`}
              w="full"
              p={4}
              flexDir="column"
              border="1px solid #e0e0e0"
              borderRadius="8px"
            >
              <Text fontSize="lg" fontWeight="bold" color="gray.700">
                Usuário anônimo
                <span className="time"> - 8 Meses atrás</span>
              </Text>
              <Box px={4} py={2}>
                <Text textAlign="justify">{coment.message}</Text>
                <Flex mt={4} gap={4}>
                  {coment.tags.map((tag) => (
                    <Tag
                      key={`coment-${coment._id}-tag-${tag}`}
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
                />
              </Flex>
              <Box mt={2}>
                <Textarea
                  placeholder="Escreva aqui sua resposta anônima"
                  size="lg"
                />
                <Button
                  mt={4}
                  colorScheme="green"
                  rightIcon={<Icon as={MdSend} />}
                >
                  Responder comentário
                </Button>
              </Box>
              <Divider mt={4} />
              <Box mt={4} paddingLeft={10}>
                {coment.replyed.map((rep) => (
                  <React.Fragment
                    key={`coment-${coment._id}-replyed-${rep._id}`}
                  >
                    <Box>
                      <Text fontSize="md" fontWeight="bold" color="gray.700">
                        Usuário anônimo
                        <span className="time"> - 8 Meses atrás</span>
                      </Text>
                      <Box px={4} py={2}>
                        <Text textAlign="justify" fontSize="sm">
                          {rep.message}
                        </Text>
                      </Box>
                      <Box mt={2}>
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
                    </Box>
                    <Divider my={4} />
                  </React.Fragment>
                ))}

              </Box>
            </Flex>
          ))}
        </VStack>
      </Container>
    </Flex>
  );
};

export default Comentarios;
