import ALL_TAGS from "./ITags";

type ICardEscla = {
  id: string;
  modal: "Publico" | "Privado";
  nome: string;
  endereco: string;
  cidade: string;
  rank: number;
  tags: Array<ALL_TAGS>
};

export default ICardEscla;
