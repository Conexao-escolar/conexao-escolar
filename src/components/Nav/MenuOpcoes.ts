enum Menus {
  Home = "Home",
  Categorias = "Categorias",
  Ranking = "Ranking",
  Escolas = "Escolas",
  "Sobre nós" = "Sobre nós",
}

export const MenusPopHouver = {
  [Menus.Categorias]:
    "Pesquise as instituições de ensino de acordo com as categorias.",
  [Menus.Ranking]:
    "Lista das melhores escolas de acordo com a opinião popular.",
  [Menus.Escolas]: "Lista das escolas distribuidas por região.",
  [Menus["Sobre nós"]]: "Sobre o projeto Conexão Escolar.",
};

export const MenuOpcoes = Object.values(Menus);

export default Menus;
