import ALL_TAGS from "./ITags";

type IPrimaryComents = {
  _id: string;
  author_id: string;
  message: string;
  rate: number;
  created_date: Date | string;
  tags: Array<ALL_TAGS>;
};

type IComents = IPrimaryComents & {
  replyed: Array<Omit<IPrimaryComents, "tags">>;
};

type IProfessor = {
  nome: string;
  cargo: string;
};

type ICardEscla = {
  id: string;
  modal: "Publico" | "Privado";
  nome: string;
  endereco: string;
  cidade: string;
  rank: number;
  tags: Array<ALL_TAGS>;
};

export type IReputacao = {
  [Property in ALL_TAGS]?: {
    rank: number;
  };
};

export type IEscolaProfile = ICardEscla & {
  profile_img?: string;
  sobre?: string;
  conteudo?: Array<string>;
  localizacao?: {
    lat?: string;
    lon?: string;
    g_link: string
  };
  membros: Array<IProfessor>;
  comentarios: Array<IComents>;
  reputacao: IReputacao;
};

export default ICardEscla;
