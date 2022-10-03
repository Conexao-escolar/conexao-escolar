import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { IEscolaProfile } from "../../../types/IEscola";


// import { Container } from './styles';

const Localizacao: React.FC<Pick<IEscolaProfile, "localizacao">> = ({ localizacao }) => {
  return (
    <Flex w="full" mt={4} alignItems="center" justifyContent="center">
      <iframe
        src={localizacao.g_link}
        width="100%"
        height="600"
        style={{
          border: "0;",
        }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </Flex>
  );
};

export default Localizacao;
