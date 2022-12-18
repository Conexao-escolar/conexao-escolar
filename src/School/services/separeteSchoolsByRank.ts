import School from "../entities/school";
import _ from "lodash";

export type ISchoolOrdenedByRank = {
  asc: School[];
  desc: School[];
};

function separeteSchoolsByRank(
  escolas: School[],
  rangeFirstSplit: number = 5,
  rangeSecondSplit: number = 3
): ISchoolOrdenedByRank {
  const asc = _.orderBy(escolas, "rank", "asc");
  const desc = _.orderBy(escolas, "rank", "desc");

  const result: ISchoolOrdenedByRank = {
    asc: asc.splice(0, rangeFirstSplit),
    desc: desc.splice(0, rangeSecondSplit),
  };

  return result;
}

export default separeteSchoolsByRank;