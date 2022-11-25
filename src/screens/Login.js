import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";

import { googleAuth } from "../utilities/googleAuth";
import color from "../config/colors";
import useAuthentication from "../hooks/useAuthentication";
import { useStates } from "../hooks/useStates";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { logIn } = useAuthentication();
  const { isLogged, setIsLogged } = useStates();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        textContentType="password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.forgetPassowrdContainer}
        onPress={() => navigation.navigate("Forgot Password")}
      >
        <Text style={styles.forgetPasswordText}>Forget Password?</Text>
      </TouchableOpacity>

      <TouchableNativeFeedback
        onPress={() => {
          logIn(email, password, setLoading);
          // setIsLogged(true);
        }}
      >
        <View style={styles.button}>
          {loading ? (
            <ActivityIndicator
              size={20}
              style={styles.ActivityIndicator}
              color={"white"}
            />
          ) : (
            <Text style={styles.btnText}>LOG IN</Text>
          )}
        </View>
      </TouchableNativeFeedback>

      <View style={styles.signupTextContainer}>
        <Text style={{ fontSize: 16, color: color.black }}>
          Don't have an account?
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text
            style={{
              color: color.primary,
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 5,
            }}
          >
            Sign Up
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

      <ImageBackground
        source={require("../assets/screenBottom.png")}
        style={styles.bottomImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    padding: 20,
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 40,
  },
  input: {
    marginBottom: 20,
    backgroundColor: color.white,
  },
  forgetPassowrdContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  forgetPasswordText: {
    color: color.primary,
  },
  button: {
    flexDirection: "row",
    marginTop: 30,
    backgroundColor: color.primary,
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    position: "relative",
    justifyContent: "center",
    zIndex: 1,
  },
  btnText: {
    color: color.white,
    fontWeight: "bold",
  },
  ActivityIndicator: {
    alignItems: "center",
    justifyContent: "center",
  },
  signupTextContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  loginGoogleBtn: {
    flexDirection: "row",
    marginTop: 30,
    backgroundColor: color.tomato,
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    position: "relative",
    justifyContent: "center",
    zIndex: 1,
  },
  googleLogoContainer: {
    padding: 5,
    // backgroundColor: color.white,
    borderRadius: 20,
    position: "absolute",
    left: 20,
  },
  googleLogo: {
    width: 30,
    height: 30,
    // backgroundColor: "tomato",
  },
  googleLoginText: {
    color: color.white,
    alignSelf: "center",
    marginLeft: 10,
    fontWeight: "bold",
  },
  bottomImage: {
    width: Dimensions.get("window").width,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    zIndex: -1,
  },
});
