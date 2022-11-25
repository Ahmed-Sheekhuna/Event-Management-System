import firebase from "firebase";
import { Alert } from "react-native";

import { useStates } from "./useStates";
import secureStorage from "../utilities/secureStorage";

const useAuthentication = () => {
  const { setIsLogged } = useStates();

  const logIn = (email, password, setLoading) => {
    setLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setIsLogged(true);
        secureStorage.storeUser({ email, password });
      })
      .catch(() => {
        Alert.alert(
          "Invalid Credentials !!",
          "The email or password is incorrect."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const register = (newUser, setLoading) => {
    const { email, password, username } = newUser;
    setLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((current) => {
        secureStorage.storeUser({ email, password });
        setIsLogged(true);
      })
      .catch((error) => Alert.alert("Error !!", error.message))
      .finally(() => setLoading(false));
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        secureStorage.removeUser();
        setIsLogged(false);
      });
  };

  return { logIn, register, signOut };
};

export default useAuthentication;
