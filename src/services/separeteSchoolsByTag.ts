import ICardEscla from "../types/IEscola";
import ALL_TAGS from "../types/ITags";

export type SchoolsByTag = {
  [Property in ALL_TAGS]?: ICardEscla[];
};

function separeteSchoolsByTag(orders: ICardEscla[]): SchoolsByTag {
  const result: SchoolsByTag = orders.reduce(
    (prev, curr) => {
      const thisTags = curr.tags;
      const tagsNotIncluded = thisTags.filter((tag) => {

        if(!prev[tag]) {
          console.log("i")
          console.log(tag)
          console.log(prev[tag])
        }
        const alredyIncluded = prev[tag].find(
          (school) => school.id === curr.id
        );
        return !alredyIncluded;
      });

      tagsNotIncluded.forEach((tag) => prev[tag].push(curr));
      return prev;
    },
    {
      AUTISMO: [],
      VISUAL: [],
      FISICO: [],
      TDH: [],
      AUDITIVO: []
    }
  );

  return result;
}

export default separeteSchoolsByTag;
