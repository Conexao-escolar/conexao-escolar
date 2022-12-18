import { collection, getDocs, getFirestore } from "firebase/firestore";
import Ranking from "../School/pages/ranking";
import firebase from '../database';
import School from "../models/school";
import { IEscolaProfile } from "../types/IEscola";
import separeteSchoolsByTag from "../services/separeteSchoolsByTag";
import ALL_TAGS from "../types/ITags";
import separeteSchoolsByRank, { ISchoolOrdenedByRank } from "../services/separeteSchoolsByRank";

type IListSchool = {
  [Property in ALL_TAGS]?: ISchoolOrdenedByRank;
};

const RankingNext = ({distribution}) => {
  return (
    <Ranking distribution={distribution} />
  )
}

export default Ranking;

export async function getStaticProps() {
  const db = getFirestore(firebase);

  const schoolsCollections = collection(db, "schools");
  const allSchools = await getDocs(schoolsCollections)
    .then((el) => {
      const result = el.docs.map((ab) => {
        const school = new School(ab);
        return school.get();
      });

      return result;
    })
    .catch((err) => {
      console.error("Erro ao buscar no database ", err.message || err);
      return [] as IEscolaProfile[];
    });

  // const allSchools = await getAllSchols();
  const byTag = separeteSchoolsByTag(allSchools);
  const byRank: IListSchool = {
    AUTISMO: separeteSchoolsByRank(byTag.AUTISMO, 3, 10),
    FISICO: separeteSchoolsByRank(byTag.FISICO, 3, 10),
    TDH: separeteSchoolsByRank(byTag.TDH, 3, 10),
    VISUAL: separeteSchoolsByRank(byTag.VISUAL, 3, 10),
    AUDITIVO: separeteSchoolsByRank(byTag.AUDITIVO, 3, 10),
  };

  return {
    props: {
      distribution: JSON.stringify(byRank),
    },
  };
}