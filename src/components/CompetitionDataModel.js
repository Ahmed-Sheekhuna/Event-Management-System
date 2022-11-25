import {
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  StyleSheet,
} from "react-native";
import React from "react";

export default function CompetitionDataModel() {
  return (
    <View style={styles.maincontainer}>
      <Image
        style={styles.topImageView}
        source={{ uri: "https://i.imgur.com/UYiroysl.jpg" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "tomato",
    height: "100%",
    width: "100%",
    marginTop: 200,
  },
  topImageView: {
    height: 250,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
