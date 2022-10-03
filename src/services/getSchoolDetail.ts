import generateSchols from "../utils/generateRandomSchools";
import IEscola from "../types/IEscola";

async function getSchoolDetail(schoolId: string) {
  const ENV_IS_DEVELOPMENT = process.env.NODE_ENV !== "production";

  if (ENV_IS_DEVELOPMENT) {
    const allSchools = generateSchols(1);

    const thisSchool: IEscola = {
      ...allSchools[0],
      id: schoolId,
    };
    return thisSchool;
  }
}

export default getSchoolDetail;
