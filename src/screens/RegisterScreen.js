import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

import { googleAuth } from "../utilities/googleAuth";
import colors from "../config/colors";

function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hanldeSubmit = () => {
    // if (!name || !email || !password) return;

    const user = {
      email,
      password,
      name,
    };

    navigation.navigate("RegisterCollection", {
      user: user,
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.3,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "bold", color: colors.black }}>
          SIGN UP
        </Text>

        <Text style={{ fontSize: 18, color: colors.lightgrey, marginTop: 10 }}>
          Create Your Account
        </Text>
      </View>

      <TextInput
        mode="flat"
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter your name"
        style={styles.TextInput}
      />

      <TextInput
        mode="flat"
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter your email"
        keyboardType="email-address"
        style={styles.TextInput}
      />

      <TextInput
        mode="flat"
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Enter your password"
        secureTextEntry
        style={styles.TextInput}
      />

      <TouchableNativeFeedback onPress={hanldeSubmit}>
        <View style={styles.button}>
          <Text style={styles.btnText}>NEXT</Text>
        </View>
      </TouchableNativeFeedback>

      <View style={styles.signupTextContainer}>
        <Text style={{ fontSize: 16, color: colors.black }}>
          Already have an account?
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              color: colors.primary,
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 5,
            }}
          >
            Log In
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableNativeFeedback onPress={() => googleAuth(setIsLogged)}>
        <View style={styles.loginGoogleBtn}>
          <View style={styles.googleLogoContainer}>
            <Image
              style={styles.googleLogo}
              source={require("../assets/googleLogo.png")}
            />
          </View>
          <Text style={styles.googleLoginText}>
            Login With Google (participants)
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    height: "100%",
  },
  TextInput: {
    marginVertical: 5,
    backgroundColor: colors.white,
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  loginGoogleBtn: {
    flexDirection: "row",
    marginTop: 30,
    backgroundColor: colors.tomato,
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    position: "relative",
    justifyContent: "center",
    zIndex: 1,
  },
  googleLogoContainer: {
    padding: 5,
    // backgroundColor: colors.white,
    borderRadius: 20,
    position: "absolute",
    left: 20,
  },
  googleLogo: {
    width: 30,
    height: 30,
  },
  googleLoginText: {
    color: colors.white,
    alignSelf: "center",
    marginLeft: 10,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    marginTop: 30,
    backgroundColor: colors.primary,
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    position: "relative",
    justifyContent: "center",
    zIndex: 1,
  },
  btnText: {
    color: colors.white,
    fontWeight: "bold",
  },
  signupTextContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  bottomImage: {
    width: Dimensions.get("window").width,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
});

export default RegisterScreen;
