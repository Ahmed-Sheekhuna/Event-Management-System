import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../config/colors";
import { Button } from "react-native-paper";
import { useStates } from "../hooks/useStates";
import firebase from "firebase";
import { auth } from "../config/firebase";
import Section from "../components/Section";

export default function ProfileScreen({ navigation }) {
  const { isLogged } = useStates();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [points, setPoints] = useState(0);

  const handleCompetitionCreate = () => {
    navigation.navigate("CreateCompetition");
  };
  const { uid, email } = firebase.auth().currentUser;

  useEffect(() => {
    let temp1 = [];

    firebase
      .firestore()
      .collection("competitions")
      .where("participantsID", "array-contains", uid)
      .onSnapshot((snapshot) => {
        if (snapshot.empty) return setLoading(false);
        temp1 = [];

        snapshot.forEach((item) => {
          temp1.push({ ...item.data(), id: item.id });
        });

        setList(temp1);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // firebase lisner on users collection
    firebase
      .firestore()
      .collection("users")
      .doc(email)
      .onSnapshot((snapshot) => {
        setPoints(snapshot.data().points || 0);
      });
  }, []);

  return (
    <View style={styles.maincontainer}>
      <View style={styles.profileView}>
        <Image
          source={{ uri: auth.currentUser.photoURL }}
          style={styles.profilePic}
        />
        <Text style={styles.profileName}>{auth.currentUser.displayName}</Text>
        <Text style={styles.profileEmail}>{auth.currentUser.email}</Text>

        {isLogged.role == "Participant" && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ color: colors.white }}>Points: </Text>
            <Text
              style={{ color: colors.white, fontWeight: "bold", fontSize: 18 }}
            >
              {points}
            </Text>
          </View>
        )}
      </View>

      <View style={{ flex: 1 }}>
        {isLogged.role == "Head" && (
          <Button
            mode="contained"
            onPress={handleCompetitionCreate}
            style={styles.createCompetitionButton}
          >
            Create a competition
          </Button>
        )}

        {isLogged.role == "Participant" &&
          (loading ? (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : (
            <View>
              <Section sectionTitle="Your Participations" flatListData={list} />
            </View>
          ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  maincontainer: { flex: 1, backgroundColor: colors.white },
  profileView: {
    height: 300,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePic: {
    height: 130,
    width: 130,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "white",
    marginTop: 10,
    // backgroundColor: "grey",
  },
  profileEmail: {
    fontSize: 16,
    color: colors.white,
    marginTop: 10,
  },
  profileName: {
    fontSize: 22,
    color: colors.white,
    fontWeight: "bold",
    marginTop: 10,
  },
  activityIndicatorContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  createCompetitionButton: {
    backgroundColor: colors.primary,
    width: "70%",
    alignSelf: "center",
    marginTop: 20,
  },
});
