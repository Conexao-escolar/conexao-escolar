import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import {
  IComents,
  IEscolaProfile,
  IProfessor,
  IReputacao,
} from "../types/IEscola";
import ALL_TAGS from "../types/ITags";

class School implements IEscolaProfile {
  profile_img?: string;
  sobre?: string;
  conteudo?: Array<string>;
  localizacao?: {
    g_link: string;
  };
  membros: Array<IProfessor>;
  comentarios: Array<IComents>;
  reputacao: IReputacao;
  id: string;
  modal: "Publico" | "Privado";
  nome: string;
  endereco: string;
  cidade: string;
  rank: number;
  tags: Array<ALL_TAGS>;
  user_dislike: Array<string>;
  user_like: Array<string>;

  constructor(firebaseDocument: QueryDocumentSnapshot<DocumentData>) {
    const data = firebaseDocument.data();

    const _initialData: any = {
      ...data,
      id: firebaseDocument.id,
    };

    const { comentarios, reputacao } = _initialData;

    const newComents: Array<IComents> = comentarios.map((coment) => {
      const newReplyed = coment.replyed.map((rep) => ({
        ...rep,
        created_date: rep.created_date.toDate().toString(),
        like: rep.like || 0,
        dislike: rep.dislike || 0,
        user_like: rep.user_like || [],
        user_dislike: rep.user_like || [],
      }));

      return {
        ...coment,
        created_date: coment.created_date.toDate().toString(),
        replyed: newReplyed,
        like: coment.like || 0,
        dislike: coment.dislike || 0,
        user_like: coment.user_like || [],
        user_dislike: coment.user_like || [],
      };
    });

    const newReputacao: IReputacao = {};

    Object.keys(ALL_TAGS).map((el) => {
      const thisRank = reputacao[el];

      if (!thisRank) {
        newReputacao[el] = {
          rank: 0,
        };
      }

      if (Number(thisRank) === NaN && thisRank.rank) {
        newReputacao[el] = {
          rank: Number(thisRank.rank) || 0,
        };
      }

      newReputacao[el] = {
        rank: Number(thisRank) || 0,
      };
    });

    this.comentarios = newComents;
    this.id = _initialData.id;

    this.profile_img = _initialData.profile_img;
    this.sobre = _initialData.sobre;
    this.conteudo = _initialData.conteudo;
    this.localizacao = _initialData.localizacao;
    this.membros = _initialData.membros;
    this.reputacao = newReputacao;
    this.modal = _initialData.modal;
    this.nome = _initialData.nome;
    this.endereco = _initialData.endereco;
    this.cidade = _initialData.cidade;
    this.rank = _initialData.rank;
    this.tags = _initialData.tags;

    this.user_dislike = _initialData.user_dislike;
    this.user_like = _initialData.user_like;
  }

  get(): IEscolaProfile {
    return {
      profile_img: this.profile_img,
      sobre: this.sobre,
      conteudo: this.conteudo,
      localizacao: this.localizacao,
      membros: this.membros,
      comentarios: this.comentarios,
      reputacao: this.reputacao,
      id: this.id,
      modal: this.modal,
      nome: this.nome,
      endereco: this.endereco,
      cidade: this.cidade,
      rank: this.rank,
      tags: this.tags,
    };
  }
}

export default School;
