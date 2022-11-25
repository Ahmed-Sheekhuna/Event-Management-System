import React, { useState } from "react";
import {
  Alert,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  Image,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import firebase from "firebase";

import colors from "../config/colors";

const height = Dimensions.get("screen").height;

function ForgetScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!email) return;

    setLoading(true);

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert("Note !!", "Please check you email."))
      .catch((error) => {
        Alert.alert("Error !!", error.message);
      });

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Please enter your email address. We will send you an email to reset your
        password
      </Text>

      <TextInput
        mode="flat"
        label="Email"
        value={email}
        onChangeText={(password) => setEmail(password)}
        placeholder="Enter your email"
        keyboardType="email-address"
        style={{ backgroundColor: colors.white }}
      />

      <Button
        mode="contained"
        loading={loading}
        onPress={handleSubmit}
        style={[styles.button, { backgroundColor: colors.primary }]}
      >
        Send email
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    width: "90%",
    height: 40,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 30,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    alignSelf: "center",
    width: "85%",
    color: colors.black,
    paddingVertical: 40,
    marginTop: 20,
  },
  bottomImage: {
    width: Dimensions.get("window").width,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
});

export default ForgetScreen;
