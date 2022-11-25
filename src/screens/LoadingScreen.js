import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React from "react";

const LoadingScreen = () => {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/splash.png")}
    >
      <View></View>
      <ActivityIndicator size={50} style={styles.loader} color={"white"} />
    </ImageBackground>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  loader: {
    marginBottom: 30,
  },
});
