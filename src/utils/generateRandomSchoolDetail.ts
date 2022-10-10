import { faker } from "@faker-js/faker";
import IEscola, { IEscolaProfile } from "../types/IEscola";
import ALL_TAGS from "../types/ITags";
import generateSchols from "./generateRandomSchools";

const profile_img = () => {
  return faker.image.abstract();
};

const local = () => {
  return {
    lat: faker.address.latitude(),
    lon: faker.address.longitude(),
    g_link:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d985.7954105214177!2d-63.87037708882529!3d-8.768974774655558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92325c992c24b3cb%3A0xd3452d5f8342d5b3!2sEeefm%20Prof%20Orlando%20Freire!5e0!3m2!1sen!2sbr!4v1664806790170!5m2!1sen!2sbr",
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
  const qtd = faker.datatype.number(8);
  const qtd_2 = faker.datatype.number(4);

  const generateComent = () => {
    return {
      _id: faker.datatype.uuid(),
      author_id: faker.datatype.uuid(),
      message: faker.lorem.lines(2),
      aproved: true,
      like: faker.datatype.number({
        max: 10,
        min: 0,
      }),
      dislike: faker.datatype.number({
        max: 10,
        min: 0
      }),
      user_like: [],
      user_dislike: [],
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
    localizacao: local(),
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
