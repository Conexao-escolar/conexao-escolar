import generateSchols from '../utils/generateRandomSchools';

async function getAllSchols() {
    const ENV_IS_DEVELOPMENT = process.env.NODE_ENV !== "production";

    if (ENV_IS_DEVELOPMENT) {
        const allSchools = generateSchols(150);
        return allSchools
    }
}

export default getAllSchols;