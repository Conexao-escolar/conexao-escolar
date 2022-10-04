function formatRank(rank: number) {
  if (rank <= 2) return "Péssimo";
  if (rank <= 2.5) return "Ruim";
  if (rank <= 3) return "Bom";
  if (rank <= 4) return "Muito bom";
  
  return "Excelente";
}

export default formatRank;
