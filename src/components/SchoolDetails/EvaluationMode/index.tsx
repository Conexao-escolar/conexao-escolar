import React from "react";
import { Box, Flex, Input, Text, Checkbox, Textarea } from "@chakra-ui/react";

import ModalApp from "../../Modal";
import ALL_TAGS from "../../../types/ITags";
import EvaluationModeSliderInput, { IRefProps } from "./Slider";

export type IOncloseProps = {
  rankResult: {
    infraAcessibilityResult: number;
    infraRestroomResult: number;
    pedagogiAcessibilityResult: number;
    pedagogiPreparationResult: number;
  };
  profile: string;
  modal: Array<ALL_TAGS>;
  infraConsideracao: string;
  pedadogiConsideracao: string;
  freeComent: string;
};

type Props = {
  isOpen: boolean;
  onClose(prop: IOncloseProps): void;
};

const EvaluationMode: React.FC<Props> = ({ isOpen, onClose }) => {
  const [thisProfile, setThisProfile] = React.useState<string>();
  const [modalCategoria, setModalCategoria] = React.useState<Array<ALL_TAGS>>(
    []
  );

  const [freeComent, setFreeComent] = React.useState("");
  const [pedagogiConsideracao, setPedagogiConsideracao] = React.useState("");
  const [considecaraoInfra, setConsideracaoInfra] = React.useState<string>("");

  const inputRef = React.useRef<HTMLInputElement>(null);

  const infraAcessibilityRef = React.useRef<IRefProps>(null);
  const infraRestroomRef = React.useRef<IRefProps>(null);
  const pedagogiAcessibilityRef = React.useRef<IRefProps>(null);
  const pedagogiPreparationRef = React.useRef<IRefProps>(null);

  const _onClose = React.useCallback((e) => {
    if(!e) {
      return onClose(null)
    }
    const infraAcessibilityResult = infraAcessibilityRef.current.value();
    const infraRestroomResult = infraRestroomRef.current.value();
    const pedagogiAcessibilityResult = pedagogiAcessibilityRef.current.value();
    const pedagogiPreparationResult = pedagogiPreparationRef.current.value();

    const body: IOncloseProps = {
      rankResult: {
        infraAcessibilityResult,
        infraRestroomResult,
        pedagogiAcessibilityResult,
        pedagogiPreparationResult,
      },
      freeComent,
      infraConsideracao: considecaraoInfra,
      modal: modalCategoria,
      pedadogiConsideracao: pedagogiConsideracao,
      profile: thisProfile,
    };

    onClose(body);
  }, [
    considecaraoInfra,
    freeComent,
    modalCategoria,
    onClose,
    pedagogiConsideracao,
    thisProfile,
  ]);

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
            <EvaluationModeSliderInput
              label="Como você avalia no geral a acessibilidade da escola em relação
              a rampas, corredores acessíveis e guias para deficientes visuais"
              ref={infraAcessibilityRef}
            />
            <EvaluationModeSliderInput
              label="Como você avalia no geral a acessibilidade da escola em relação
              ao banheiro. Há sanitários limpos e acessíveis a pessoas com
              necessidades especiais? Como barras de apoio por exemplo e guias
              no chão."
              ref={infraRestroomRef}
            />

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
            <EvaluationModeSliderInput
              label="Como você avalia no geral o nível de acessibilidade pedagógica,
              que envolve elementos e equipamentos que possibilitam uma melhor
              experiência e vivência para o aluno especial? A escola
              proporciona uma melhor vivência no meio escolar?"
              ref={pedagogiAcessibilityRef}
            />

            <EvaluationModeSliderInput
              label="Como você avalia no geral o nível de preparo dos profissionais
              da instituições para lidar com os alunos especiais?"
              ref={pedagogiPreparationRef}
            />

            <Box mt={8} px={4}>
              <Text>
                Há alguma consideração ou sugestão de melhoria para a escola?
              </Text>
              <Input
                value={pedagogiConsideracao}
                onChange={({ target: { value } }) =>
                  setPedagogiConsideracao(value)
                }
                placeholder="Escreva aqui suas considerações"
              />
            </Box>
          </Flex>
          <Flex mt={4} flexDir="column" border="1px solid #e1e1e1" p={2}>
            <Box mt={8} px={4}>
              <Text>
                Use esse espaço para reclamar ou deixar recomendações gerais.
                Ele será visível no perfil da escola:
              </Text>
              <Textarea
                onChange={({ target: { value } }) => setFreeComent(value)}
                value={freeComent}
                placeholder="Aba livre para comentários, fique a vontade!"
              />
            </Box>
          </Flex>
        </Flex>
      }
      isOpen={isOpen}
      label="Esse formulário tem o intuito de coletar informações gerais sobre as escolas em Geral.
        Fique a vontade para colocar suas considerações, pois as respostas são anônimas e tem o intuito de levar mais conhecimento para o público em Geral."
      onClose={_onClose}
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
