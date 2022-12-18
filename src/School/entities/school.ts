import ALL_TAGS from "../../types/ITags";

export type IPrimaryComents = {
  _id: string;
  author_id: string;
  message: string;
  created_date: Date | string;
  tags: Array<ALL_TAGS>;
  like: number;
  dislike: number;
  aproved: boolean;
  user_like: Array<string>;
  user_dislike: Array<string>;
};
export type IComents = IPrimaryComents & {
  replyed: Array<Omit<IPrimaryComents, "tags">>;
};

export type IReputacao = {
  [Property in ALL_TAGS]?: {
    rank: number;
  };
};

export interface ISchoolProps {
  id: string;
  modal: "Publico" | "Privado";
  nome: string;
  endereco: string;
  cidade: string;
  rank: number;
  tags: Array<ALL_TAGS>;

  profile_img?: string;
  sobre?: string;
  conteudo?: Array<string>;
  localizacao?: {
    g_link: string;
  };
  comentarios: Array<IComents>;
  reputacao: IReputacao;
  user_dislike: Array<string>;
  user_like: Array<string>;
}

class School {
  private props: ISchoolProps;

  constructor(schoolProps: ISchoolProps) {
    this.props = schoolProps;
  }

  public get profile_img(): string {
    return this.props.profile_img;
  }

  public get sobre(): string {
    return this.props.sobre;
  }

  public get conteudo(): Array<string> {
    return this.props.conteudo;
  }

  public get localizacao(): {
    g_link: string;
  } {
    return this.props.localizacao;
  }

  public get comentarios(): Array<IComents> {
    return this.props.comentarios;
  }

  public get reputacao(): IReputacao {
    return this.props.reputacao;
  }

  public get id(): string {
    return this.props.id;
  }
  public get modal(): "Publico" | "Privado" {
    return this.props.modal;
  }
  public get nome(): string {
    return this.props.nome;
  }
  public get endereco(): string {
    return this.props.endereco;
  }
  public get cidade(): string {
    return this.props.cidade;
  }
  public get rank(): number {
    return this.props.rank;
  }
  public get tags(): Array<ALL_TAGS> {
    return this.props.tags;
  }

  public get Data(): ISchoolProps {
    return {
      id: this.props.id,
      modal: this.props.modal,
      nome: this.props.nome,
      endereco: this.props.endereco,
      cidade: this.props.cidade,
      rank: this.props.rank,
      tags: this.props.tags,
      profile_img: this.props.profile_img,
      sobre: this.props.sobre,
      conteudo: this.props.conteudo,
      localizacao: this.props.localizacao,
      comentarios: this.props.comentarios,
      reputacao: this.props.reputacao,
      user_dislike: this.props.user_dislike,
      user_like: this.props.user_like,
    };
  }
}

export default School;
