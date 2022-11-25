import { View, Text } from "react-native";
import React from "react";
import colors from "../config/colors";

export default function TagItem({
  title,
  icon,
  bgColor,
  style,
  fontSize = 20,
}) {
  return (
    <View
      style={[
        {
          width: 160,
          backgroundColor: bgColor,
          height: 30,
          justifyContent: "space-around",
          alignItems: "center",
          borderRadius: 20,
          marginLeft: 10,
          flexDirection: "row",
          paddingLeft: 4,
          paddingRight: 4,
        },
        style,
      ]}
    >
      <Text
        style={{ fontSize: fontSize, fontWeight: "bold", color: colors.white }}
      >
        {title}
      </Text>
      {icon}
    </View>
  );
}
