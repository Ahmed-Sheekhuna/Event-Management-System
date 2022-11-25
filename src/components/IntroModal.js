import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Modal from "react-native-modal";
import { FontAwesome5, AntDesign, MaterialIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function IntroModal({ isVisible, onDismiss }) {
  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onDismiss}
        onBackButtonPress={onDismiss}
        animationIn="slideInDown"
        animationOut="slideOutDown"
      >
        <View style={styles.container}>
          <Text
            style={{
              color: colors.black,
              fontWeight: "bold",
              fontSize: 18,
              marginBottom: 15,
            }}
          >
            User Guide
          </Text>

          <View style={styles.row}>
            <View style={styles.iconView}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: colors.primary,
                }}
              >
                - - - - -
              </Text>
            </View>
            <Text style={styles.titleText}>Hiking Track</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.iconView}>
              <FontAwesome5 name="hiking" size={34} color="lightgreen" />
            </View>
            <Text style={styles.titleText}>Starting Point</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.iconView}>
              <AntDesign name="rest" size={30} color={colors.black} />
            </View>
            <Text style={styles.titleText}>Rest Points</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.iconView}>
              <Image
                source={require("../assets/finish.png")}
                style={{ width: 36, height: 36 }}
              />
            </View>
            <Text style={styles.titleText}>Ending Point</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.iconView}>
              <View style={styles.currentLocationIcon}>
                <MaterialIcons
                  name="my-location"
                  size={30}
                  color={colors.white}
                />
              </View>
            </View>
            <Text style={styles.titleText}>Follow Current Location</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  iconView: {
    width: 75,
    alignItems: "center",
  },
  titleText: {
    fontSize: 16,
  },
  currentLocationIcon: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    padding: 7,
  },
});

export default IntroModal;
