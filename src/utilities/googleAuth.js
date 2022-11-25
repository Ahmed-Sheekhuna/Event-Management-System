import {
  androidClientIdGoogle,
  androidStandaloneAppClientId,
  iosClientIdGoogle,
  iosStandaloneAppClientId,
} from "../config/APIKeys";
import * as Google from "expo-google-app-auth";
import { auth, db, googleAuthProvider } from "../config/firebase";

const createUser = (user, setIsLogged) => {
  db.collection("users")
    .doc(user.email.toLowerCase())
    .set({
      name: user.displayName,
      email: user.email,
      imageUri: user.photoURL,
      role: "Participant",
    })
    .then(() => {
      setIsLogged({ ...user, role: "Participant" });
    });
};

export const googleAuth = async (setIsLogged) => {
  try {
    const result = await Google.logInAsync({
      androidClientId: androidClientIdGoogle,
      iosClientId: iosClientIdGoogle,
      androidStandaloneAppClientId: androidStandaloneAppClientId,
      iosStandaloneAppClientId: iosStandaloneAppClientId,
      behavior: "system",
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      const credential = googleAuthProvider.credential(
        result.idToken,
        result.accessToken
      );
      auth
        .signInWithCredential(credential)
        .then(async (userCredential) => {
          createUser(userCredential.user, setIsLogged);
        })
        .catch((error) => alert(error));
    } else {
      alert("Google Login Cancelled");
    }
  } catch (e) {
    alert(`Google Login Error: ${e}`);
  }
};
