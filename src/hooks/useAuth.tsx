import React from "react";

import AuthContext from "../context/Auth";

const useAuth = () => React.useContext(AuthContext);

export default useAuth;