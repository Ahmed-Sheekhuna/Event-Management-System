import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import firebase from "firebase";

import { useStates } from "../hooks/useStates";

export default function RegistrationDone({ route, navigation }) {
  const { user } = route.params;
  const { name, email, password, imageUri, gender, age, role } = user;

  const { setIsLogged } = useStates();

  const _uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error("uriToBlob failed"));
      };

      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  const createUser = (downloadURI) => {
    firebase
      .firestore()
      .collection("users")
      .doc(email.toLowerCase())
      .set({
        name,
        email,
        password,
        imageUri: downloadURI,
        gender,
        age,
        role,
        points: 0,
      })
      .then(() => {
        firebase.auth().currentUser.updateProfile({
          displayName: name,
          photoURL: downloadURI,
        });
      })
      .then(() => setIsLogged(user));
  };

  useEffect(() => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        if (imageUri) {
          let newPostImagesDir = firebase.storage().ref("users/" + email + "/");
          const fileType = imageUri.substring(imageUri.lastIndexOf(".") + 1);

          _uriToBlob(imageUri).then((blob) => {
            newPostImagesDir
              .child("profile_picture." + fileType)
              .put(blob, {
                contentType: "image/" + fileType,
              })
              .then((snapshot) => {
                snapshot.ref.getDownloadURL().then((downloadURI) => {
                  createUser(downloadURI);
                });
              });
          });
        } else {
          createUser(
            "https://www.kindpng.com/picc/m/269-2697881_computer-icons-user-clip-art-transparent-png-icon.png"
          );
        }
      })
      .catch((error) => {
        navigation.goBack();
        Alert.alert("Error", error.message);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator />

      <Text style={{ color: "grey", marginTop: 10 }}>
        Registration in process
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
