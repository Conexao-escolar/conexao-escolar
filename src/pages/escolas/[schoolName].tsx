import React from "react";
import firebase from "../../database";
import {
  getFirestore,
  getDoc,
  doc,
} from "firebase/firestore";

import School from "../../models/school";

import RankingDetail from "../../School/pages/ranking-detail";

type ISchoolDetail = {
  exists: boolean;
  detail: string;
};

const SchoolDetail: React.FC<ISchoolDetail> = ({
  exists = true,
  detail = "",
}) => {
  return (
    <RankingDetail  detail={detail} exists={exists} />
  )
};

export default SchoolDetail;

export async function getServerSideProps(context) {
  const { schoolName } = context.query;

  const db = getFirestore(firebase);

  const docRef = doc(db, "schools", schoolName);
  const docSnap = await getDoc(docRef);

  const data = new School(docSnap).get();

  return {
    props: {
      exists: docSnap.exists(),
      detail: JSON.stringify(data),
    },
  };
}
