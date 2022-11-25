import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

function MyActivityIndicator({ color }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={color} size="small" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "90%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyActivityIndicator;
