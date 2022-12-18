import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import ALL_TAGS from "../../types/ITags";
import School, { IComents, IReputacao } from "../entities/school";

export default function FirestoreDocumentoToSchool(
  firebaseDocument: QueryDocumentSnapshot<DocumentData>
) {
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

  const validRank = (rank): number => (!Number.isNaN(rank) ? Number(rank) : 0);

  const newReputacao: IReputacao = {};

  Object.keys(ALL_TAGS).map((el) => {
    if (el.toLowerCase() === "tdah") {
      const haveOldKeyValue = reputacao["TDH"];
      const haveNewKey = reputacao["TDAH"];

      console.log({
        haveOldKeyValue,
        haveNewKey,
      });

      if (haveOldKeyValue) {
        newReputacao["TDAH"] = {
          rank: validRank(haveOldKeyValue),
        };
      } else if (haveNewKey) {
        newReputacao["TDAH"] = {
          rank: validRank(haveNewKey),
        };
      } else {
        newReputacao["TDAH"] = {
          rank: 0,
        };
      }

      return;
    }

    const thisRank = reputacao[el];

    if (!thisRank) {
      newReputacao[el] = {
        rank: 0,
      };

      return;
    }

    if (Number.isNaN(thisRank) && thisRank.rank) {
      newReputacao[el] = {
        rank: Number(thisRank.rank) || 0,
      };

      return;
    }

    newReputacao[el] = {
      rank: Number(thisRank) || 0,
    };
  });

  return new School({
    comentarios: newComents,
    id: _initialData.id,
    profile_img: _initialData.profile_img,
    sobre: _initialData.sobre,
    conteudo: _initialData.conteudo,
    localizacao: _initialData.localizacao,
    reputacao: newReputacao,
    modal: _initialData.modal,
    nome: _initialData.nome,
    endereco: _initialData.endereco,
    cidade: _initialData.cidade,
    rank: _initialData.rank,
    tags: _initialData.tags,
    user_dislike: _initialData.user_dislike,
    user_like: _initialData.user_like,
  });
}
