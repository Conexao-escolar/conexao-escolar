import { Center, Text } from "@chakra-ui/react";
import React from "react";

// import { Container } from './styles';

import Container from "../components/Container";
import Menus from "../components/Nav/MenuOpcoes";

const Sobre: React.FC = () => {

    const TEXT = `Em virtude dos problemas existentes nas escolas brasileiras acerca da
    educação inclusiva, causados pelo investimento insuficiente na área,
    como o baixo número de profissionais atuando com capacitação para
    lidar com crianças e adolescentes PcD ou com transtorno, a carência de
    material didático especial destinado a estes alunos, e o preconceito,
    seguido pela segregação, sofrido pelos mesmos, elaborou-se o projeto
    "Conexão Escolar". O projeto final funcionaria como uma network, e
    centra-se em um site que visa ajudar os pais e responsáveis a escolher
    uma escola adequada para estas crianças e adolescentes, com o objetivo
    de servir como um "norte" e agilizar o processo de escolha, além de,
    sobretudo, trazer mais visibilidade para a importância da educação
    inclusiva. Alguns elementos que estarão presentes no site são: um
    formulário que os usuários utilizarão para avaliar algumas condições a
    respeito de uma determinada escola; um ranking de reputação escolar
    categorizado por tags baseado nas avaliações dos usuários, sendo que
    as tags se referem ao tipo de deficiência ou transtorno previamente
    avaliado; um perfil escolar, onde será possível obter algumas
    informações a respeito da escola, como sua reputação completa, fotos e
    vídeos, localização e informações extras, que estarão ao lado de uma
    sessão de comentários públicos dos usuários, enviados de maneira
    anônima, que serão analisados por uma equipe de moderação; um filtro
    escolar que estará presente ao utilizar tanto a barra de pesquisa como
    o ranking, a fim de obter maior precisão na escolha.`
  return (
    <Container activeMenu={Menus["Sobre nós"]}>
      <Center mt={20} px={20}>
        <Text textAlign="center">
          {TEXT}
        </Text>
      </Center>
    </Container>
  );
};

export default Sobre;
