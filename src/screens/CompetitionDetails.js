import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {
  MaterialCommunityIcons,
  Feather,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import firebase from "firebase";
import { Button } from "react-native-paper";

import colors from "../config/colors";
import { useStates } from "../hooks/useStates";

const CompetitionDetails = ({ route, navigation }) => {
  const { data } = route.params;
  const { isLogged } = useStates();
  const [selectedTab, setSelectedTab] = useState("Details");

  const handleApplyNowParticipant = () => {
    firebase
      .firestore()
      .collection("competitions")
      .doc(data.id)
      .get()
      .then((doc) => {
        if (
          doc.data().participantsID.includes(firebase.auth().currentUser.uid)
        ) {
          Alert.alert(
            "Error!",
            "You are already a participant in this competition"
          );
        } else {
          navigation.navigate("Payment", {
            forParticipants: true,
            amount: data.fee,
            forSponser: false,
            competitionID: data.id,
          });
        }
      });
  };

  const handleApplyNowSponser = () => {
    navigation.navigate("RegisterSubscription");
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: data.imageURL }}
        style={{
          width: "100%",
          height: Dimensions.get("screen").height * 0.25,
        }}
      />

      <View
        style={{
          paddingHorizontal: 30,
          paddingTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {data.title}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Text style={{ color: "grey" }}>Organized by: </Text>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {data.headName}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <MaterialCommunityIcons
                name="currency-usd-circle-outline"
                size={26}
                color="grey"
              />
              <Text>{data.fee}</Text>
            </View>

            <View
              style={{
                backgroundColor: colors.primary,
                borderRadius: 5,
                alignItems: "center",
                paddingHorizontal: 12,
                paddingVertical: 7,
                marginLeft: 10,
              }}
            >
              <Text style={{ color: colors.white, fontWeight: "bold" }}>
                Jan
              </Text>
              <Text style={{ color: colors.white, fontWeight: "bold" }}>
                25
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 15,
            marginBottom: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Feather
              name="clock"
              size={24}
              color="grey"
              style={{ marginRight: 5 }}
            />

            <Text style={{ fontSize: 16 }}>{data.startTime}</Text>
            <Text style={{ fontSize: 16 }}> - </Text>
            <Text style={{ fontSize: 16 }}>{data.endTime}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Entypo
              name="location-pin"
              size={24}
              color="grey"
              style={{ marginRight: 5 }}
            />

            <Text style={{ fontSize: 16 }}>
              {"University of Warwic \nDepartment of Computer Science"}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="ios-people-outline" size={26} color="grey" />

          <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 5 }}>
            {data.totalParticipants}
          </Text>

          <Text> people is going</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F8F8F8",
            borderRadius: 10,
            justifyContent: "space-evenly",
            marginVertical: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setSelectedTab("Details")}
            style={{
              padding: 10,
              borderColor: colors.primary,
              borderBottomWidth: selectedTab == "Details" ? 2 : 0,
            }}
          >
            <Text
              style={{
                color: selectedTab == "Details" ? colors.primary : "grey",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Details
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedTab("Eligibility")}
            style={{
              padding: 10,
              borderColor: colors.primary,
              borderBottomWidth: selectedTab == "Eligibility" ? 2 : 0,
            }}
          >
            <Text
              style={{
                color: selectedTab == "Eligibility" ? colors.primary : "grey",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Eligibility
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: "#F8F8F8", padding: 10 }}>
          {selectedTab == "Details" ? (
            <>
              <Text>{data.description}</Text>
              {isLogged.role == "Sponsor" && (
                <Button
                  mode="contained"
                  onPress={handleApplyNowSponser}
                  style={{
                    backgroundColor: colors.primary,
                    width: "70%",
                    alignSelf: "center",
                    marginTop: 20,
                  }}
                >
                  Become a sponser
                </Button>
              )}
            </>
          ) : (
            <>
              <Text>{data.eligibilty}</Text>

              {isLogged.role == "Participant" && (
                <Button
                  mode="contained"
                  onPress={handleApplyNowParticipant}
                  style={{
                    backgroundColor: colors.primary,
                    width: "70%",
                    alignSelf: "center",
                    marginTop: 20,
                  }}
                >
                  {"Apply now: " + data.fee + "/-"}
                </Button>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default CompetitionDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
