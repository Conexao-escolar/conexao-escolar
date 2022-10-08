import React from "react";
import db from "../database";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
  signOut
} from "firebase/auth";

import { toast } from "react-toastify";

import { useRouter } from "next/router";

export type IUser = {
  id: string;
  email: string;
  nome: string;
};

type IAuthContext = {
  user: IUser;
  logIn(): Promise<void>;
  logOut(): Promise<void>;
};

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const [user, setThisUser] = React.useState<IUser>();

  const {
    push
  } = useRouter();

  const logIn = React.useCallback(async () => {
    const provider = new GoogleAuthProvider();
    provider.setDefaultLanguage("pt");
    const auth = getAuth(db);

    await setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithPopup(auth, provider);
      })
      .then((result) => {
        setThisUser({
          id: result.user.uid,
          email: result.user.email,
          nome: result.user.displayName
        });

        toast.success("Bem vindo!");
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const logOut = React.useCallback(async () => {
    try {
      const auth = getAuth(db);
      await signOut(auth);

      push("/");
      toast.success("Volte sempre");

    } catch(err) {
      console.error(err);
    }

  }, [push]);

  React.useEffect(() => {
    const auth = getAuth(db);

    auth.onAuthStateChanged((user) => {
      if (user) {
        setThisUser({
          email: user.email,
          id: user.uid,
          nome: user.displayName
        });
      } else {
        setThisUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
