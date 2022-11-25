import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import colors from "../config/colors";
import FormImagePicker from "../components/FormImagePicker";
import { ActivityIndicator, List, Switch, TextInput } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import CustomTextInput from "../components/CustomTextInput";
import { FontAwesome } from "@expo/vector-icons";
import { auth, db, storage } from "../config/firebase";

const CreateCompetition = ({ navigation }) => {
  const [imageUri, setImageUri] = useState("");
  const [eventName, setEventName] = useState("");
  const [hourStarting, setHourStarting] = useState("");
  const [minuteStarting, setMinuteStarting] = useState("");
  const [hourEnding, setHourEnding] = useState("");
  const [minuteEnding, setMinuteEnding] = useState("");
  const [location, setlocation] = useState("");
  const [details, setDetails] = useState("");
  const [eligibilty, setEligibility] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [category, setCategory] = useState(false);
  const [isPayed, setIsPayed] = useState(false);
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);

  const _uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error("uriToBlob failed"));
      };

      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const user = auth.currentUser;
    if (
      imageUri &&
      eventName &&
      hourStarting &&
      minuteStarting &&
      hourEnding &&
      minuteEnding &&
      location &&
      details &&
      category &&
      eligibilty
    ) {
      if (hourStarting < 21 && hourStarting > 8) {
        setError1(false);
      } else {
        setError1(true);
      }
      if (hourEnding < 21 && hourEnding > 8) {
        setError2(false);
      } else {
        setError2(true);
      }
      if (
        hourStarting < 21 &&
        hourStarting > 8 &&
        hourEnding < 21 &&
        hourEnding > 8
      ) {
        let newCompitionImages = storage.ref("compitions/" + user.uid);
        const fileType = imageUri.substring(imageUri.lastIndexOf(".") + 1);

        _uriToBlob(imageUri).then((blob) => {
          newCompitionImages
            .child(new Date().getTime().toString() + fileType)
            .put(blob, {
              contentType: "image/" + fileType,
            })
            .then((snapshot) => {
              snapshot.ref.getDownloadURL().then((downloadURI) => {
                db.collection("competitions")
                  .add({
                    userId: user.uid,
                    startTime:
                      hourStarting > 12
                        ? hourStarting - 12 + ":" + minuteStarting + "pm"
                        : hourStarting + ":" + minuteStarting + "am",
                    endTime:
                      hourEnding > 12
                        ? hourEnding - 12 + ":" + minuteEnding + "pm"
                        : hourEnding + ":" + minuteEnding + "am",
                    imageURL: downloadURI,
                    title: eventName,
                    headName: user.displayName,
                    fee: isPayed ? price : 0,
                    venue: location,
                    description: details,
                    eligibilty,
                    category,
                    totalParticipants: 0,
                    participantsID: [],
                  })
                  .then(() => {
                    setLoading(false);
                    navigation.goBack();
                  })
                  .catch((e) => {
                    console.warn(e);
                  });
              });
            });
        });
      } else {
        alert("Fix all the issues.");
        setLoading(false);
      }
    } else {
      alert("Data is missing");
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FormImagePicker imageUri={imageUri} setImageUri={setImageUri} />
      <ScrollView style={styles.container}>
        <TextInput
          label="Competition Name"
          value={eventName}
          onChangeText={(text) => setEventName(text)}
          style={styles.input}
        />
        <CustomTextInput
          placholder="Location"
          state={location}
          setState={(text) => setlocation(text)}
          Icon={() => (
            <Entypo name="location-pin" size={30} color={colors.lightgrey} />
          )}
        />

        <List.Accordion
          title={category ? category : "Category"}
          expanded={expanded}
          onPress={() => setExpanded(!expanded)}
          style={styles.dropDown}
        >
          <List.Item
            style={styles.dropDown}
            title="Web Dev"
            onPress={() => {
              setExpanded(!expanded);
              setCategory("Web Dev");
            }}
          />
          <List.Item
            style={styles.dropDown}
            title="App Dev"
            onPress={() => {
              setExpanded(!expanded);
              setCategory("App Dev");
            }}
          />
          <List.Item
            style={styles.dropDown}
            title="Programming"
            onPress={() => {
              setExpanded(!expanded);
              setCategory("Programming");
            }}
          />
          <List.Item
            style={styles.dropDown}
            title="Gaming"
            onPress={() => {
              setExpanded(!expanded);
              setCategory("Gaming");
            }}
          />
        </List.Accordion>
        <CustomTextInput
          placholder="Description"
          state={details}
          setState={(text) => setDetails(text)}
          Icon={() => (
            <FontAwesome
              name="pencil-square-o"
              size={30}
              color={colors.lightgrey}
            />
          )}
          numberOfLines={5}
          multiline
        />
        <CustomTextInput
          placholder="Eligibility"
          state={eligibilty}
          setState={(text) => setEligibility(text)}
          Icon={() => (
            <FontAwesome
              name="pencil-square-o"
              size={30}
              color={colors.lightgrey}
            />
          )}
          numberOfLines={5}
          multiline
        />
        <View style={styles.eventPaying}>
          <FontAwesome name="dollar" size={30} color={colors.lightgrey} />
          <View style={styles.eventPayingTextContainer}>
            <Text>Compitition is payed</Text>
            <Switch
              color={colors.primary}
              value={isPayed}
              onChange={() => setIsPayed(!isPayed)}
            />
          </View>
        </View>
        {isPayed && (
          <CustomTextInput
            placholder="Price"
            state={price}
            setState={(text) => setPrice(text)}
            style={{ flex: 0.5 }}
          />
        )}
        <Text style={styles.heading}>Starting Time</Text>
        <View style={styles.timeContainer}>
          <TextInput
            label="9-20"
            value={hourStarting}
            onChangeText={(text) => setHourStarting(text)}
            style={styles.simpleInput}
            keyboardType="number-pad"
          />
          <TextInput
            label="0-59"
            value={minuteStarting}
            onChangeText={(text) =>
              setMinuteStarting(
                text >= 0 && text < 60
                  ? text
                  : alert("Minutes can only be from 0 to 59")
              )
            }
            style={styles.simpleInput}
            keyboardType="number-pad"
          />
        </View>
        {error1 && (
          <Text style={styles.error}>Hours can only be from 9 to 20</Text>
        )}
        <Text style={styles.heading}>Ending Time</Text>
        <View style={styles.timeContainer}>
          <TextInput
            label="9-20"
            value={hourEnding}
            onChangeText={(text) => setHourEnding(text)}
            style={styles.simpleInput}
            keyboardType="number-pad"
          />
          <TextInput
            label="0-59"
            value={minuteEnding}
            onChangeText={(text) =>
              setMinuteEnding(
                text >= 0 && text < 60
                  ? text
                  : alert("Minutes can only be from 0 to 59")
              )
            }
            style={styles.simpleInput}
            keyboardType="number-pad"
          />
        </View>
        {error2 && (
          <Text style={styles.error}>Hours can only be from 9 to 20</Text>
        )}
        <TouchableNativeFeedback onPress={() => handleSubmit()}>
          <View style={styles.button}>
            {loading ? (
              <ActivityIndicator
                size={20}
                style={styles.ActivityIndicator}
                color={"white"}
              />
            ) : (
              <Text style={styles.btnText}>Create</Text>
            )}
          </View>
        </TouchableNativeFeedback>
      </ScrollView>
    </View>
  );
};

export default CreateCompetition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  input: {
    backgroundColor: colors.white,
    fontSize: 25,
  },
  heading: {
    fontSize: 18,
    color: colors.lightgrey,
    marginLeft: 25,
    marginTop: 15,
  },
  simpleInput: {
    marginLeft: 25,
    backgroundColor: colors.white,
    flex: 1,
  },
  dropDown: {
    marginLeft: 25,
    color: colors.lightgrey,
  },
  eventPaying: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
  },
  eventPayingTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    flex: 1,
    marginRight: 10,
  },
  button: {
    flexDirection: "row",
    marginVertical: 30,
    backgroundColor: colors.primary,
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    position: "relative",
    justifyContent: "center",
    zIndex: 1,
  },
  btnText: {
    color: colors.white,
    fontWeight: "bold",
  },
  ActivityIndicator: {
    alignItems: "center",
    justifyContent: "center",
  },
  timeContainer: {
    flexDirection: "row",
    flex: 1,
  },
  error: {
    color: colors.tomato,
    marginLeft: 25,
    marginTop: 5,
  },
});
