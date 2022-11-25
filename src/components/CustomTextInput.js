import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";
import { TextInput } from "react-native-paper";

const CustomTextInput = ({
  state,
  setState,
  placholder,
  Icon = false,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {Icon && <Icon />}
      <TextInput
        label={placholder}
        value={state}
        onChangeText={(text) => setState(text)}
        style={[styles.simpleInput, !Icon && { marginLeft: 30 }, style]}
        {...props}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  simpleInput: {
    marginVertical: 5,
    backgroundColor: colors.white,
    flex: 1,
  },
});
