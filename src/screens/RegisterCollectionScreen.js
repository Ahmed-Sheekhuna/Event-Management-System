import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";

import colors from "../config/colors";
import ImagePicker from "../components/ImagePicker";
import AgeItem from "../components/AgeItem";

const height = Dimensions.get("screen").height;
const iconSize = 75;

export default function RegisterCollectionScreen({ navigation, route }) {
  const [imageUri, setImageUri] = useState();
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("15-20");
  const [role, setRole] = useState("Participant");
  let { user } = route.params;

  const hanldeSubmit = () => {
    user = {
      imageUri: imageUri,
      gender: gender,
      age: age,
      role: role,
      ...user,
    };

    navigation.navigate("RegistrationDone", {
      user: user,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 0.3,
            justifyContent: "center",
          }}
        >
          <Text
            style={{ fontSize: 28, fontWeight: "bold", color: colors.black }}
          >
            SIGN UP
          </Text>

          <Text
            style={{ fontSize: 18, color: colors.lightgrey, marginTop: 10 }}
          >
            Let us know about your self
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={{ fontWeight: "bold" }}>Upload your image</Text>
          <ImagePicker imageUri={imageUri} setImageUri={setImageUri} />
        </View>

        <View style={[styles.row, { marginTop: 40 }]}>
          <Text style={{ fontWeight: "bold" }}>Gender</Text>

          <View style={styles.row}>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={() => setGender("male")}>
                <View
                  style={[
                    styles.genderIcon,
                    {
                      borderColor: gender == "male" ? colors.primary : "grey",
                    },
                  ]}
                >
                  <Image
                    source={require("../assets/male.png")}
                    style={{ width: iconSize - 25, height: iconSize - 25 }}
                  />
                </View>
              </TouchableOpacity>

              <Text style={{ marginTop: 5 }}>Male</Text>
            </View>

            <View style={{ alignItems: "center", marginLeft: 10 }}>
              <TouchableOpacity onPress={() => setGender("female")}>
                <View
                  style={[
                    styles.genderIcon,
                    {
                      borderColor: gender == "female" ? colors.primary : "grey",
                    },
                  ]}
                >
                  <Image
                    source={require("../assets/female.png")}
                    style={{ width: iconSize - 25, height: iconSize - 25 }}
                  />
                </View>
              </TouchableOpacity>

              <Text style={{ marginTop: 5 }}>Female</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Age</Text>

          <View style={[styles.row, { marginTop: 15 }]}>
            <AgeItem title="15-20" age={age} setAge={setAge} />
            <AgeItem title="21-30" age={age} setAge={setAge} />
            <AgeItem title="31-45" age={age} setAge={setAge} />
            <AgeItem title="45-65" age={age} setAge={setAge} />
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Who are you?</Text>
          <View
            style={[
              styles.row,
              { marginTop: 15, justifyContent: "space-around" },
            ]}
          >
            <AgeItem title="Participant" age={role} setAge={setRole} />
            <AgeItem title="Executive" age={role} setAge={setRole} />
            <AgeItem title="Head" age={role} setAge={setRole} />
          </View>

          <View
            style={[
              styles.row,
              { marginTop: 15, justifyContent: "space-around" },
            ]}
          >
            <AgeItem title="Ambassador" age={role} setAge={setRole} />
            <AgeItem title="Mentor" age={role} setAge={setRole} />
            <AgeItem title="Sponsor" age={role} setAge={setRole} />
          </View>
        </View>

        <Button mode="contained" onPress={hanldeSubmit} style={styles.button}>
          next
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  genderIcon: {
    backgroundColor: "lightgrey",
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize / 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 30,
    zIndex: 1,
  },
  bottomImage: {
    width: Dimensions.get("window").width,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
});
