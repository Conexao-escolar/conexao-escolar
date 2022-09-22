import React from "react";

import {
  Box,
  Flex,
  IconButton,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import CloneOBJ from "../../utils/cloneObj";
import Card, { ICardEscla } from "./card";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export interface ICardEscolaProps {
  escolas: ICardEscla[];
}

const CardEscola: React.FC<ICardEscolaProps> = ({ escolas }) => {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const [escolaSplited, setEscolasSplited] = React.useState([]);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "50%", md: "50%" });
  const side = useBreakpointValue({ base: "3%", md: "10px" });

  // These are the images used in the slide

  const SHOW_DOTS = useBreakpointValue({
    base: false,
    md: true,
  });

  const _MAX_CARD_BY_SLIDE = useBreakpointValue({
    base: 1,
    md: 4,
  });
  const _MAX_CARD_BY_LINE_ON_SLIDE = useBreakpointValue({
    base: 1,
    md: 2,
  });

  const MAX_H = useBreakpointValue({
    base: "400px",
    md: "500px"
  })

  const EscolaCard = ({ escola }: { escola: ICardEscla[] }) => {
    const [_escolas, _setEscolas] = React.useState<ICardEscla[][]>([]);

    React.useEffect(() => {
      const cloneEscola = CloneOBJ(escola);

      const _result = [];
      while (cloneEscola.length) {
        _result.push(cloneEscola.splice(0, _MAX_CARD_BY_LINE_ON_SLIDE));
      }
      _setEscolas(_result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [escola, _MAX_CARD_BY_LINE_ON_SLIDE]);
    return (
      <Flex flexDir="column" alignItems="center" px={8}>
        {_escolas.map((el, index) => {
          return (
            <Stack direction="row" spacing="20" key={`${index}-1`}>
              {el.map((_el) => (
                <Card key={`${_el.nome}+1`} {..._el} />
              ))}
            </Stack>
          );
        })}
      </Flex>
    );
  };

  React.useEffect(() => {
    const copyEscolas = CloneOBJ(escolas);

    const _result = [];
    while (copyEscolas.length) {
      _result.push(copyEscolas.splice(0, _MAX_CARD_BY_SLIDE));
    }

    setEscolasSplited(_result);
  }, [escolas, _MAX_CARD_BY_SLIDE]);

  return (
    <Box position={"relative"} minH={MAX_H} width={"full"} overflow={"hidden"}>
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      {/* Right Icon */}

      {SHOW_DOTS && (
        <>
          <IconButton
            aria-label="left-arrow"
            colorScheme="messenger"
            borderRadius="full"
            position="absolute"
            left={side}
            top={top}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickPrev()}
          >
            <BiLeftArrowAlt />
          </IconButton>
          <IconButton
            aria-label="right-arrow"
            colorScheme="messenger"
            borderRadius="full"
            position="absolute"
            right={side}
            top={top}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickNext()}
          >
            <BiRightArrowAlt />
          </IconButton>
        </>
      )}

      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {escolaSplited.map((item, index) => (
          <EscolaCard key={index} escola={item} />
        ))}
      </Slider>
    </Box>
  );
};

export default CardEscola;
