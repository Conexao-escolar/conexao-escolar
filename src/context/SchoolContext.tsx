import React from "react";
import getAllSchols from "../services/getAllSchools";
import IEscola from "../types/IEscola";
// import { Container } from './styles';

type ISchoolContext = {
  schools: Array<IEscola>;
  loading: boolean;
};

const SchoolContext = React.createContext<ISchoolContext>(
  {} as ISchoolContext
);

export const SchoolProvider: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  const [schools, setSchools] = React.useState<Array<IEscola>>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    getAllSchols()
      .then((el) => setSchools(el))
      .finally(() => setLoading(false));
  }, []);
  return (
    <SchoolContext.Provider
      value={{
        schools,
        loading,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const SchoolConsumer = SchoolContext.Consumer;

export default SchoolContext;
