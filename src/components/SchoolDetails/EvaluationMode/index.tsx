import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  Checkbox,
  CheckboxGroup,
  VStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  Textarea,
} from "@chakra-ui/react";

import ModalApp from "../../Modal";
import ALL_TAGS from "../../../types/ITags";
import formatRank from "../../../utils/formatRank";
// import { Container } from './styles';

type Props = {
  isOpen: boolean;
  onClose(): void;
};

const EvaluationMode: React.FC<Props> = ({ isOpen, onClose }) => {
  const [thisProfile, setThisProfile] = React.useState<string>();
  const [modalCategoria, setModalCategoria] = React.useState<Array<ALL_TAGS>>(
    []
  ); //ALL_TAGS

  const mappedValues = React.useMemo(
    () => ({
      1: 1,
      2: 1.5,
      3: 2,
      4: 2.5,
      5: 3,
      6: 3.5,
      7: 4,
      8: 4.5,
      10: 5,
    }),
    []
  );

  const inputRef = React.useRef<HTMLInputElement>(null);

  // INFRA
  const [showTolTipAcessbilityRank, setShowTolTipAcessbilityRank] =
    React.useState(false);
  const [infraAccessibilityRank, setInfraAccessibilityRank] =
    React.useState<number>(0);
  const [infraAccessibilityResult, setInfraAccessibilityResult] =
    React.useState<string>("");

  const [
    showTolIipinfraAccessibilityRestroomRank,
    setShowTolIipinfraAccessibilityRestroomRank,
  ] = React.useState(false);

  const [infraAccessibilityRestroomRank, setInfraAccessibilityRestroomRank] =
    React.useState<number>(0);
  const [
    infraAccessibilityRestroomResult,
    setInfraAccessibilityRestroomResult,
  ] = React.useState<string>("");

  const [considecaraoInfra, setConsideracaoInfra] = React.useState<string>("");

  // PEDAGOGIA
  const [
    showTolTipPedagogicalAccessibilityRank,
    setShowTolPipPedagogicalAccessibilityRank,
  ] = React.useState(false);
  const [pedagogicalAccessibilityRank, setPedagogicalAccessibilityRank] =
    React.useState<number>(0);
  const [pedagogicalAccessibilityResult, setPedagogicalAccessibilityResult] =
    React.useState<string>("");

  const [
    showTolTipPedagogicalPreparationRank,
    setShowTolPippedagogicalPreparationRank,
  ] = React.useState(false);
  const [pedagogicalPreparationRank, setPedagogicalPreparationRank] =
    React.useState<number>(0);
  const [pedagogicalPreparationResult, setPedagogicalPreparationResult] =
    React.useState<string>("");

  const [considecaraoPedagogical, setConsideracaoPedagogical] =
    React.useState<string>("");

  const [consideracaoFinal, setConsideracaoFinal] = React.useState("");

  const _setInfraAccessibilityRank = React.useCallback(
    (e: number) => {
      const mappedResult = mappedValues[e];

      const result = formatRank(mappedResult);

      setInfraAccessibilityRank(mappedResult);
      setInfraAccessibilityResult(result);
    },
    [mappedValues]
  );

  const _setInfraAccessibilityRestroomRank = React.useCallback(
    (e: number) => {
      const mappedResult = mappedValues[e];

      const result = formatRank(mappedResult);

      setInfraAccessibilityRestroomRank(mappedResult);
      setInfraAccessibilityRestroomResult(result);
    },
    [mappedValues]
  );

  const _setPedagogicalAccessibilityRank = React.useCallback(
    (e: number) => {
      const mappedResult = mappedValues[e];

      const result = formatRank(mappedResult);

      setPedagogicalAccessibilityRank(mappedResult);
      setPedagogicalAccessibilityResult(result);
    },
    [mappedValues]
  );

  const _setPedagogicalPreparationRank = React.useCallback(
    (e: number) => {
      const mappedResult = mappedValues[e];

      const result = formatRank(mappedResult);

      setPedagogicalPreparationRank(mappedResult);
      setPedagogicalPreparationResult(result);
    },
    [mappedValues]
  );

  const checkAllCateg = React.useCallback((e: boolean) => {
    if (e) {
      setModalCategoria(
        () => Object.keys(ALL_TAGS).map((el) => el) as ALL_TAGS[]
      );
    } else {
      setModalCategoria([]);
    }
  }, []);

  return (
    <ModalApp
      body={
        <Flex w="full" p={5} flexDir="column" border="1px solid #e0e0e0" mt={4}>
          <Box>
            <Text fontWeight="bold">Em qual perfil você se encaixa? </Text>
            <Flex flexDir="column">
              <Checkbox
                value="pai"
                isChecked={thisProfile === "pai"}
                ref={inputRef}
                onChange={({ target: { value } }) => setThisProfile(value)}
              >
                Responsável por aluno que estuda na instituição
              </Checkbox>
              <Checkbox
                value="aluno"
                isChecked={thisProfile === "aluno"}
                onChange={({ target: { value } }) => setThisProfile(value)}
              >
                Aluno
              </Checkbox>
              <Checkbox
                value="instrutor"
                isChecked={thisProfile === "instrutor"}
                onChange={({ target: { value } }) => setThisProfile(value)}
              >
                Professor / Instrutor / Funcionário
              </Checkbox>
            </Flex>
          </Box>
          <Box mt={4}>
            <Text fontWeight="bold">
              Sobre qual ótica de acessibilidade você deseja avaliar a
              instituição?{" "}
            </Text>
            <Flex flexDir="column">
              <Checkbox
                value={ALL_TAGS.AUTISMO}
                isChecked={modalCategoria.includes(ALL_TAGS.AUTISMO)}
                onChange={({ target: { checked } }) => {
                  if (checked) {
                    return setModalCategoria((old) => {
                      if (old.includes(ALL_TAGS.AUTISMO)) return [...old];

                      old.push(ALL_TAGS.AUTISMO);
                      return [...old];
                    });
                  }
                  return setModalCategoria((old) => {
                    if (old.includes(ALL_TAGS.AUTISMO)) {
                      const newData = old.filter(
                        (el) => el !== ALL_TAGS.AUTISMO
                      );

                      return [...newData];
                    }

                    return [...old];
                  });
                }}
              >
                Autismo
              </Checkbox>
              <Checkbox
                value={ALL_TAGS.FISICO}
                isChecked={modalCategoria.includes(ALL_TAGS.FISICO)}
                onChange={({ target: { checked } }) => {
                  if (checked) {
                    return setModalCategoria((old) => {
                      if (old.includes(ALL_TAGS.FISICO)) return [...old];

                      old.push(ALL_TAGS.FISICO);
                      return [...old];
                    });
                  }
                  return setModalCategoria((old) => {
                    if (old.includes(ALL_TAGS.FISICO)) {
                      const newData = old.filter(
                        (el) => el !== ALL_TAGS.FISICO
                      );

                      return [...newData];
                    }

                    return [...old];
                  });
                }}
              >
                Físico
              </Checkbox>
              <Checkbox
                value={ALL_TAGS.TDH}
                isChecked={modalCategoria.includes(ALL_TAGS.TDH)}
                onChange={({ target: { checked } }) => {
                  if (checked) {
                    return setModalCategoria((old) => {
                      if (old.includes(ALL_TAGS.TDH)) return [...old];
                      old.push(ALL_TAGS.TDH);
                      return [...old];
                    });
                  }
                  return setModalCategoria((old) => {
                    if (old.includes(ALL_TAGS.TDH)) {
                      const newData = old.filter((el) => el !== ALL_TAGS.TDH);

                      return [...newData];
                    }

                    return [...old];
                  });
                }}
              >
                TDAH
              </Checkbox>
              <Checkbox
                value={ALL_TAGS.VISUAL}
                isChecked={modalCategoria.includes(ALL_TAGS.VISUAL)}
                onChange={({ target: { checked } }) => {
                  if (checked) {
                    return setModalCategoria((old) => {
                      if (old.includes(ALL_TAGS.VISUAL)) return [...old];

                      old.push(ALL_TAGS.VISUAL);
                      return [...old];
                    });
                  }
                  return setModalCategoria((old) => {
                    if (old.includes(ALL_TAGS.VISUAL)) {
                      const newData = old.filter(
                        (el) => el !== ALL_TAGS.VISUAL
                      );

                      return [...newData];
                    }

                    return [...old];
                  });
                }}
              >
                Visual
              </Checkbox>
              <Checkbox
                value={ALL_TAGS.AUDITIVO}
                isChecked={modalCategoria.includes(ALL_TAGS.AUDITIVO)}
                onChange={({ target: { checked } }) => {
                  if (checked) {
                    return setModalCategoria((old) => {
                      if (old.includes(ALL_TAGS.AUDITIVO)) return [...old];

                      old.push(ALL_TAGS.AUDITIVO);
                      return [...old];
                    });
                  }
                  return setModalCategoria((old) => {
                    if (old.includes(ALL_TAGS.AUDITIVO)) {
                      const newData = old.filter(
                        (el) => el !== ALL_TAGS.AUDITIVO
                      );

                      return [...newData];
                    }

                    return [...old];
                  });
                }}
              >
                Auditivo
              </Checkbox>
              <Checkbox
                value="ALL"
                onChange={({ target: { checked } }) => checkAllCateg(checked)}
              >
                Geral. Não desejo avaliar sobre uma perspectiva apenas, mas a
                instituição em geral.
              </Checkbox>
            </Flex>
          </Box>
          <Flex mt={4} flexDir="column" border="1px solid #e1e1e1" p={2}>
            <Text fontWeight="bold" fontSize="lg">
              Infraestrutura :
            </Text>
            <Box mt={4} px={4}>
              <Text fontWeight="bold">
                Como você avalia no geral a acessibilidade da escola em relação
                a rampas, corredores acessíveis e guias para deficientes visuais
              </Text>
              <Flex flexDir="column" px={8} mt={5}>
                <Slider
                  aria-label="slider-ex-1"
                  defaultValue={0}
                  onChange={(val) => _setInfraAccessibilityRank(val)}
                  max={10}
                  onMouseEnter={() => setShowTolTipAcessbilityRank(true)}
                  onMouseLeave={() => setShowTolTipAcessbilityRank(false)}
                >
                  <SliderMark value={1}>1</SliderMark>
                  <SliderMark value={2}>1.5</SliderMark>
                  <SliderMark value={3}>2</SliderMark>
                  <SliderMark value={4}>2.5</SliderMark>
                  <SliderMark value={5}>3</SliderMark>
                  <SliderMark value={6}>3.5</SliderMark>
                  <SliderMark value={7}>4</SliderMark>
                  <SliderMark value={8}>4.5</SliderMark>
                  <SliderMark value={10}>5</SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <Tooltip
                    hasArrow
                    bg="teal.500"
                    color="white"
                    placement="top"
                    isOpen={showTolTipAcessbilityRank}
                    label={infraAccessibilityResult}
                  >
                    <SliderThumb />
                  </Tooltip>
                </Slider>
                <Flex
                  flexDir="row"
                  w="full"
                  justifyContent="space-between"
                  mt={5}
                >
                  <Text>Muito ruim</Text>
                  <Text>Muito bom</Text>
                </Flex>
              </Flex>
            </Box>
            <Box mt={4} px={4}>
              <Text fontWeight="bold">
                Como você avalia no geral a acessibilidade da escola em relação
                ao banheiro. Há sanitários limpos e acessíveis a pessoas com
                necessidades especiais? Como barras de apoio por exemplo e guias
                no chão.
              </Text>
              <Flex flexDir="column" px={8} mt={5}>
                <Slider
                  aria-label="slider-ex-1"
                  defaultValue={0}
                  onChange={(val) => _setInfraAccessibilityRestroomRank(val)}
                  max={10}
                  onMouseEnter={() =>
                    setShowTolIipinfraAccessibilityRestroomRank(true)
                  }
                  onMouseLeave={() =>
                    setShowTolIipinfraAccessibilityRestroomRank(false)
                  }
                >
                  <SliderMark value={1}>1</SliderMark>
                  <SliderMark value={2}>1.5</SliderMark>
                  <SliderMark value={3}>2</SliderMark>
                  <SliderMark value={4}>2.5</SliderMark>
                  <SliderMark value={5}>3</SliderMark>
                  <SliderMark value={6}>3.5</SliderMark>
                  <SliderMark value={7}>4</SliderMark>
                  <SliderMark value={8}>4.5</SliderMark>
                  <SliderMark value={10}>5</SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <Tooltip
                    hasArrow
                    bg="teal.500"
                    color="white"
                    placement="top"
                    isOpen={showTolIipinfraAccessibilityRestroomRank}
                    label={""}
                  >
                    <SliderThumb />
                  </Tooltip>
                </Slider>
                <Flex
                  flexDir="row"
                  w="full"
                  justifyContent="space-between"
                  mt={5}
                >
                  <Text>Muito ruim</Text>
                  <Text>Muito bom</Text>
                </Flex>
              </Flex>
            </Box>

            <Box mt={8} px={4}>
              <Text>
                Há alguma consideração ou sugestão de melhoria para a escola?
              </Text>
              <Input
                value={considecaraoInfra}
                onChange={({ target: { value } }) =>
                  setConsideracaoInfra(value)
                }
                placeholder="Escreva aqui suas considerações"
              />
            </Box>
          </Flex>
          <Flex mt={4} flexDir="column" border="1px solid #e1e1e1" p={2}>
            <Text fontWeight="bold" fontSize="lg">
              Pedagogia :
            </Text>
            <Box mt={4} px={4}>
              <Text fontWeight="bold">
                Como você avalia no geral o nível de acessibilidade pedagógica,
                que envolve elementos e equipamentos que possibilitam uma melhor
                experiência e vivência para o aluno especial? A escola
                proporciona uma melhor vivência no meio escolar?
              </Text>
              <Flex flexDir="column" px={8} mt={5}>
                <Slider
                  aria-label="slider-ex-1"
                  defaultValue={0}
                  onChange={(val) => _setPedagogicalAccessibilityRank(val)}
                  max={10}
                  onMouseEnter={() =>
                    setShowTolPipPedagogicalAccessibilityRank(true)
                  }
                  onMouseLeave={() =>
                    setShowTolPipPedagogicalAccessibilityRank(false)
                  }
                >
                  <SliderMark value={1}>1</SliderMark>
                  <SliderMark value={2}>1.5</SliderMark>
                  <SliderMark value={3}>2</SliderMark>
                  <SliderMark value={4}>2.5</SliderMark>
                  <SliderMark value={5}>3</SliderMark>
                  <SliderMark value={6}>3.5</SliderMark>
                  <SliderMark value={7}>4</SliderMark>
                  <SliderMark value={8}>4.5</SliderMark>
                  <SliderMark value={10}>5</SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <Tooltip
                    hasArrow
                    bg="teal.500"
                    color="white"
                    placement="top"
                    isOpen={showTolTipPedagogicalAccessibilityRank}
                    label={pedagogicalAccessibilityResult}
                  >
                    <SliderThumb />
                  </Tooltip>
                </Slider>
                <Flex
                  flexDir="row"
                  w="full"
                  justifyContent="space-between"
                  mt={5}
                >
                  <Text>Muito ruim</Text>
                  <Text>Muito bom</Text>
                </Flex>
              </Flex>
            </Box>
            {/* <Box mt={4} px={4}>
              <Text>Há alguma consideração ou motivo para sua resposta?</Text>
              <Input
                placeholder="Escreva aqui suas considerações"
                onChange={({ target: { value } }) =>
                  setConsideracaoPedagogicalAccessibility(value)
                }
                value={considecaraoPedagogicalAccessibility}
              />
            </Box> */}
            <Box mt={4} px={4}>
              <Text fontWeight="bold">
                Como você avalia no geral o nível de preparo dos profissionais
                da instituições para lidar com os alunos especiais?
              </Text>
              <Flex flexDir="column" px={8} mt={5}>
                <Slider
                  aria-label="slider-ex-1"
                  defaultValue={0}
                  onChange={(val) => _setPedagogicalPreparationRank(val)}
                  max={10}
                  onMouseEnter={() =>
                    setShowTolPippedagogicalPreparationRank(true)
                  }
                  onMouseLeave={() =>
                    setShowTolPippedagogicalPreparationRank(false)
                  }
                >
                  <SliderMark value={1}>1</SliderMark>
                  <SliderMark value={2}>1.5</SliderMark>
                  <SliderMark value={3}>2</SliderMark>
                  <SliderMark value={4}>2.5</SliderMark>
                  <SliderMark value={5}>3</SliderMark>
                  <SliderMark value={6}>3.5</SliderMark>
                  <SliderMark value={7}>4</SliderMark>
                  <SliderMark value={8}>4.5</SliderMark>
                  <SliderMark value={10}>5</SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <Tooltip
                    hasArrow
                    bg="teal.500"
                    color="white"
                    placement="top"
                    isOpen={showTolTipPedagogicalPreparationRank}
                    label={`Penîs`}
                  >
                    <SliderThumb />
                  </Tooltip>
                </Slider>
                <Flex
                  flexDir="row"
                  w="full"
                  justifyContent="space-between"
                  mt={5}
                >
                  <Text>Muito ruim</Text>
                  <Text>Muito bom</Text>
                </Flex>
              </Flex>
            </Box>
            {/* <Box mt={4} px={4}>
              <Text>Há alguma consideração ou motivo para sua resposta?</Text>
              <Input
                placeholder="Escreva aqui suas considerações"
                onChange={({ target: { value } }) =>
                  setConsideracaoPedagogicalPreparation(value)
                }
                value={considecaraoPedagogicalPreparation}
              />
            </Box> */}
            <Box mt={8} px={4}>
              <Text>
                Há alguma consideração ou sugestão de melhoria para a escola?
              </Text>
              <Input placeholder="Escreva aqui suas considerações" />
            </Box>
          </Flex>
          <Flex mt={4} flexDir="column" border="1px solid #e1e1e1" p={2}>
            <Box mt={8} px={4}>
              <Text>
                Use esse espaço para reclamar ou deixar recomendações gerais.
                Ele será visível no perfil da escola:
              </Text>
              <Textarea placeholder="Aba livre para comentários, fique a vontade!" />
            </Box>
          </Flex>
        </Flex>
      }
      isOpen={isOpen}
      label="Esse formulário tem o intuito de coletar informações gerais sobre as escolas em Geral.
        Fique a vontade para colocar suas considerações, pois as respostas são anônimas e tem o intuito de levar mais conhecimento para o público em Geral."
      onClose={onClose}
      title="Avaliar a escola"
      negative_label="Cancelar"
      positve_label="Enviar"
      modalProps={{
        size: "5xl",
      }}
    />
  );
};

export default EvaluationMode;
