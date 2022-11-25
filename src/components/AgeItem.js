import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import colors from "../config/colors";

export default function AgeItem({ title, age, setAge }) {
  return (
    <TouchableOpacity onPress={() => setAge(title)}>
      <View
        style={{
          backgroundColor: age == title ? colors.primary : colors.white,
          borderWidth: 0.5,
          borderColor: age == title ? colors.primary : "grey",
          paddingVertical: 9,
          paddingHorizontal: 12,
          borderRadius: 15,
        }}
      >
        <Text style={{ color: age == title ? colors.white : colors.black }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
