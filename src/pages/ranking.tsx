import { collection, getDocs, getFirestore } from "firebase/firestore";
import Ranking from "../School/pages/ranking";
import firebase from '../database';
import { ISchoolProps } from "../School/entities/school";
import FirestoreDocumentoToSchool from "../School/mappers/firestore-to-school";

const RankingNext = ({schools = ""}) => {
  const parsedSchools = JSON.parse(schools);
  return (
    <Ranking schools={parsedSchools} />
  )
}

export default RankingNext;

export async function getStaticProps() {
  const db = getFirestore(firebase);

  const schoolsCollections = collection(db, "schools");
  const allSchools: ISchoolProps[] = await getDocs(schoolsCollections)
    .then((el) => {
      const result = el.docs.map((ab) => {
        const school = FirestoreDocumentoToSchool(ab).Data;
        return school
      });

      return result;
    })
    .catch((err) => {
      console.error("Erro ao buscar no database ", err.message || err);
      return [] as ISchoolProps[];
    });

  return {
    props: {
      schools: JSON.stringify(allSchools),
    },
  };
}