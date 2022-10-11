import IRankSchool from "../types/IRankSchool";

function formatRank(rank: number): IRankSchool {
  if (rank <= 2) return IRankSchool.Pessimo;
  if (rank > 2 && rank <= 2.5) return IRankSchool.Ruim;
  if (rank > 2.5 && rank <= 3) return IRankSchool.Razoavel;
  if (rank > 3 && rank <= 4) return IRankSchool.Bom;
  
  return IRankSchool["Muito bom"];
}

export default formatRank;
