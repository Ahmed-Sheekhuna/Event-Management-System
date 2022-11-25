import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../config/colors";

export default function SponsorPackage({
  title = "NaN",
  c1 = "#4c669f",
  c2 = "#3b5998",
  iconImage = "",
  price = "00",
  img,
  onPress,
}) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <LinearGradient
        colors={[c1, c2]}
        start={[0, 1]}
        end={[1, 0]}
        style={styles.maincontainer}
      >
        <View style={{ flex: 3, padding: 20 }}>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.price}>{price + " PKR"}</Text>
        </View>
        <View
          style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
        >
          <Image source={img} style={styles.img} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    height: 150,
    width: "90%",
    flexDirection: "row",
    borderRadius: 10,
  },
  text: { color: colors.white, fontSize: 36, fontWeight: "bold" },
  price: { fontSize: 22, color: colors.white },
  img: { height: 80, width: 80 },
});
