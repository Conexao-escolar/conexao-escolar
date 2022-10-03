import { faker } from "@faker-js/faker";
import IEscola, { IEscolaProfile } from "../types/IEscola";
import ALL_TAGS from "../types/ITags";
import generateSchols from "./generateRandomSchools";

/**
 *   profile_img?: string;
  sobre?: string;
  conteudo?: Array<string>;
  localização?: {
    lat: number;
    lon: number;
  };
  membros: Array<IProfessor>;
  comentarios: Array<IComents>
 */

/**
   *   nome: string;
        cargo: string;
   */

/**
 * type IPrimaryComents = {
  author_id: string;
  message: string;
  rate: number;
  created_date: Date | string;
  tags: Array<ALL_TAGS>;
};

type IComents = IPrimaryComents & {
  replyed: Array<IPrimaryComents>;
};

 * 
 */
const profile_img = () => {
  return faker.image.abstract();
};

const local = () => {
  return {
    lat: faker.address.latitude(),
    lon: faker.address.longitude(),
  };
};

const members = () => {
  const qtd = faker.datatype.number(5);

  const response = Array.from({
    length: qtd,
  }).map((el) => {
    return {
      nome: faker.name.fullName(),
      cargo: "Professor",
    };
  });

  return response;
};

const coments = () => {
  const qtd = faker.datatype.number(5);
  const qtd_2 = faker.datatype.number(2);

  const generateComent = () => {
    return {
      author_id: faker.datatype.uuid(),
      message: faker.lorem.lines(2),
      rate: faker.datatype.number({
        max: 5,
        min: 0,
        precision: 0.1,
      }),
      created_date: faker.date.past(10, new Date()),
      tags: [ALL_TAGS.AUTISMO, ALL_TAGS.FISICO],
    };
  };

  const primary_coments = Array.from({
    length: qtd,
  })
    .map(() => generateComent())
    .map((coment) => {
      return {
        ...coment,
        replyed: Array.from({
          length: qtd_2,
        }).map(() => generateComent()),
      };
    });

  return primary_coments;
};

function generateRandomSchoolDetail(schoolCard?: IEscola): IEscolaProfile {
  const primaryDetails = (() => {
    if (schoolCard) return schoolCard;

    return generateSchols(1)[0];
  })();

  return {
    ...primaryDetails,
    profile_img: profile_img(),
    sobre: faker.lorem.lines(3),
    conteudo: [],
    localização: local(),
    membros: members(),
    comentarios: coments(),
    reputacao: {
      AUTISMO: {
        rank: 2,
      },
      FISICO: {
        rank: 4,
      },
      TDH: {
        rank: 3,
      },
      VISUAL: {
        rank: 1,
      },
    },
  };
}

export default generateRandomSchoolDetail;
