import { faker } from "@faker-js/faker";
import IEscola from "../School/types/IEscola";
import ALL_TAGS from "../School/types/ITags";

const randomModal = () => {
  const a = Number(faker.random.numeric(2));

  if (a > 50) return "Publico";
  return "Privado";
};

const randonRank = (lestNum = 0): number => {
  if (lestNum > 0 && lestNum <= 5) return lestNum;
  const a = faker.datatype.number({
    max: 5,
    min: 1,
    precision: 0.1,
  });

  return randonRank(a);
};

const generateTags = () => {
  const length = faker.datatype.number({
    max: Object.values(ALL_TAGS).length,
    min: 1,
  });

  return Object.values(ALL_TAGS).slice(0, length);
};

function generateSchols(length: number = 1): IEscola[] {
  const arrayResult: IEscola[] = Array.from({
    length: length,
  }).map(() => ({
    id: faker.datatype.uuid(),
    cidade: "Porto Velho",
    endereco: faker.address.street(),
    modal: randomModal(),
    nome:
      `E.E.E.F.M. ` +
      faker.name.firstName("female") +
      " " +
      faker.name.firstName("male"),
    rank: randonRank(),
    tags: generateTags(),
  }));

  return arrayResult;
}

export default generateSchols;
