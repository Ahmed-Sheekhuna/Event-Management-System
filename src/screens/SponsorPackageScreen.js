import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

import SponsorPackage from "../components/SponsorPackage";
import { ribbon1, ribbon2, ribbon3 } from "../assets";

export default function SponsorPackageScreen({ navigation, route }) {
  const handlePress = (amount) => {
    navigation.navigate("Payment", {
      amount,
      forParticipants: false,
      forSponser: true,
    });
  };

  const packages = [
    {
      c1: "#BC4BE2",
      c2: "#3E0559",
      title: "Premium",
      price: 100000,
      img: ribbon1,
    },
    {
      c1: "#F4BA4D",
      c2: "#590C05",
      title: "Gold",
      price: 50000,
      img: ribbon2,
    },
    {
      c1: "#807A74",
      c2: "#AFAA8E",
      title: "Silver",
      price: 25000,
      img: ribbon3,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.packagesContainer}>
        {packages.map((item, index) => (
          <SponsorPackage
            c1={item.c1}
            c2={item.c2}
            title={item.title}
            price={item.price}
            img={item.img}
            onPress={() => handlePress(item.price)}
            key={index}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  packagesContainer: {
    flex: 0.9,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 30,
  },
  container: { flex: 1 },
});
