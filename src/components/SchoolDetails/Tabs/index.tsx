import { Flex, TabPanel, TabPanels } from "@chakra-ui/react";
import React from "react";

import { IEscolaProfile } from "../../../types/IEscola";

import Reputacao from "./Reputacao";
import Conteudo from "./Conteudo";
import Comentarios from "./Comentarios";
import Localizacao from "./Localizacao";

type Props = {
  school: IEscolaProfile;
};

const Tabs: React.FC<Props> = ({ school = {} as IEscolaProfile }) => {
  return (
    <TabPanels w="full">
      <TabPanel>
        <Reputacao reputacao={school.reputacao} />
      </TabPanel>
      <TabPanel>
        <Flex w="full" bg="red">
          asdf
        </Flex>
      </TabPanel>
      <TabPanel>
        <Conteudo />
      </TabPanel>
      <TabPanel>
        <Localizacao
          localizacao={school.localizacao}
        />
      </TabPanel>
      <TabPanel>
        <Comentarios comentarios={school.comentarios} />
      </TabPanel>
    </TabPanels>
  );
};

export default Tabs;
