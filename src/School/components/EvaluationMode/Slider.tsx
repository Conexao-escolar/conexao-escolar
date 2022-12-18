import {
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import formatRank from "../../../utils/formatRank";

// import { Container } from './styles';

type IProps = {
  label: string;
};

export type IRefProps = {
  value(): number;
  setError(isError: boolean);
};

const EvaluationModeSliderInput: React.ForwardRefRenderFunction<
  IRefProps,
  IProps
> = ({ label }, ref) => {
  const [resultLabel, setResultLabel] = React.useState<string>("");
  const [resultRank, setResultRank] = React.useState<number>(0);
  const [showLabel, setShowLabel] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);

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

  const _setRank = React.useCallback(
    (e: number) => {
      const mappedResult = mappedValues[e];

      const result = formatRank(mappedResult);

      setResultRank(mappedResult);
      setResultLabel(result);
    },
    [mappedValues]
  );

  React.useImperativeHandle(
    ref,
    () => ({
      value: () => resultRank,
      setError: (error: boolean) => setIsError(error),
    }),
    [resultRank]
  );

  return (
    <>
      <Box mt={4} px={4}>
        <Text fontWeight="bold">{label}</Text>
        <Flex flexDir="column" px={8} mt={5}>
          <Slider
            aria-label="slider-ex-1"
            defaultValue={0}
            onChange={(val) => _setRank(val)}
            max={10}
            onMouseEnter={() => setShowLabel(true)}
            onMouseLeave={() => setShowLabel(false)}
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
              isOpen={showLabel}
              label={resultLabel}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <Flex flexDir="row" w="full" justifyContent="space-between" mt={5}>
            <Text>Muito ruim</Text>
            <Text>Muito bom</Text>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default React.forwardRef(EvaluationModeSliderInput);
