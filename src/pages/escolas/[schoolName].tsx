import React from "react";
import firebase from "../../database";
import {
  getFirestore,
  getDoc,
  doc,
} from "firebase/firestore";

// import School from "../../models/school";
import FirestoreDocumentoToSchool from "../../School/mappers/firestore-to-school";
import RankingDetail from "../../School/pages/ranking-detail";
import School from "../../School/entities/school";

type ISchoolDetail = {
  exists: boolean;
  detail: string;
};

const SchoolDetail: React.FC<ISchoolDetail> = ({
  exists = true,
  detail = "",
}) => {
  const schoolDetail = JSON.parse(detail);

  return (
    <RankingDetail detail={schoolDetail} exists={exists} />
  )
};

export default SchoolDetail;

export async function getServerSideProps(context) {
  const { schoolName } = context.query;

  const db = getFirestore(firebase);

  const docRef = doc(db, "schools", schoolName);
  const docSnap = await getDoc(docRef);

  const data = FirestoreDocumentoToSchool(docSnap).Data;

  return {
    props: {
      exists: docSnap.exists(),
      detail: JSON.stringify(data),
    },
  };
}
