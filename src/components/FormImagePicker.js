import React, { useState } from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
} from "react-native";
import { Avatar } from "react-native-paper";
import * as imagePicker from "expo-image-picker";

import colors from "../config/colors";

function FormImagePicker({ imageUri, setImageUri }) {
  const pickImage = async () => {
    try {
      imagePicker
        .launchImageLibraryAsync({
          mediaTypes: imagePicker.MediaTypeOptions.Images,
          quality: 0.5,
          allowsMultipleSelection: false,
        })
        .then(({ cancelled, uri }) => {
          if (!cancelled) setImageUri(uri);
        });
    } catch (error) {
      Alert.alert(
        "Error !!!",
        "An unexpected error occurred while picking your image."
      );
    }
  };

  const handleOnPressImp = () => {
    !imageUri
      ? pickImage()
      : Alert.alert("Delete", "Are you sure?", [
          { text: "No" },
          {
            text: "Yes",
            onPress: () => setImageUri(null),
          },
        ]);
  };

  const handleOnPress = () => {
    imagePicker.getMediaLibraryPermissionsAsync().then(({ status }) => {
      if (status != "granted") {
        imagePicker.requestMediaLibraryPermissionsAsync().then(({ status }) => {
          if (status != "granted")
            Alert.alert("Error !!", "Media library permission required.");
          else handleOnPressImp();
        });
      } else handleOnPressImp();
    });
  };

  return (
    <>
      {!imageUri ? (
        <View style={styles.imagePickerContainer}>
          <TouchableOpacity
            style={styles.imagePickerBtn}
            onPress={() => handleOnPress()}
          >
            <Text style={styles.btnText}>Attach Image</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ImageBackground
          source={{ uri: imageUri }}
          style={styles.imagePickerContainer}
        >
          <TouchableOpacity
            style={styles.imagePickerBtn}
            onPress={() => handleOnPress()}
          >
            <Text style={styles.btnText}>Change Image</Text>
          </TouchableOpacity>
        </ImageBackground>
      )}
    </>
  );
}

export default FormImagePicker;
const styles = StyleSheet.create({
  imagePickerContainer: {
    width: "100%",
    height: 175,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    overflow: "hidden",
  },
  imagePickerBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: colors.white,
    borderWidth: 1,
  },
  btnText: {
    color: colors.white,
  },
});
