import generateSchols from "../utils/generateRandomSchools";
import IEscola, { IEscolaProfile } from "../School/types/IEscola";
import generateRandomSchoolDetail from "../utils/generateRandomSchoolDetail";

async function getSchoolDetail(schoolId: string): Promise<IEscolaProfile> {
  const ENV_IS_DEVELOPMENT = process.env.NODE_ENV !== "production";

  if (ENV_IS_DEVELOPMENT) {
    const allSchools = generateSchols(1);

    const thisSchool: IEscola = {
      ...allSchools[0],
      id: schoolId,
    };

    return generateRandomSchoolDetail(thisSchool);
  }
}

export default getSchoolDetail;
