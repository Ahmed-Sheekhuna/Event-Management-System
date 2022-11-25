import { StyleSheet, Text, View, Alert, Image } from "react-native";
import React, { useState } from "react";
import firebase from "firebase";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { PaymentIcon } from "react-native-payment-icons";
import { Button, IconButton } from "react-native-paper";
import Modal from "react-native-modal";

import colors from "../config/colors";

const API_URL = "https://payforpost.herokuapp.com";

const PaymentScreen = ({ navigation, route }) => {
  const [cardDetails, setCardDetails] = useState({});
  const { confirmPayment } = useConfirmPayment();
  let competitionID = "",
    amount = route.params.amount;

  const { forParticipants, forSponser } = route.params;

  if (forParticipants) competitionID = route.params.competitionID;

  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDone = () => {
    setModalVisible(false);
    navigation.popToTop();
  };

  const MyModal = () => (
    <Modal isVisible={isModalVisible}>
      <View
        style={{
          flex: 0.5,
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 20,
        }}
      >
        <Image
          source={require("../assets/paid.png")}
          style={{ width: 250, height: 280 }}
        />
        <Text
          style={{
            color: colors.primary,
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          Successfully Paid
        </Text>

        <Button
          mode="contained"
          onPress={handleDone}
          style={{
            backgroundColor: colors.primary,
            marginTop: 20,
          }}
        >
          okay
        </Button>
      </View>
    </Modal>
  );

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayNow = async () => {
    if (!cardDetails?.complete)
      return Alert.alert(
        "Error!",
        "Please enter complete and correct card details"
      );

    const billingDetails = {
      email: firebase.auth().currentUser.email,
      amount: amount,
    };

    try {
      setLoading(true);

      const { clientSecret, error } = await fetchPaymentIntentClientSecret();

      if (error) {
        setpaymentError("Unable to process payment");
        setPaymentLoad(false);
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });

        if (error) {
          Alert.alert("Error!", error.message);
        } else if (paymentIntent) {
          if (forParticipants) {
            firebase
              .firestore()
              .collection("competitions")
              .doc(competitionID)
              .update({
                totalParticipants: firebase.firestore.FieldValue.increment(1),
                participantsID: firebase.firestore.FieldValue.arrayUnion(
                  firebase.auth().currentUser.uid
                ),
              })
              .then(() => {
                firebase
                  .firestore()
                  .collection("users")
                  .doc(firebase.auth().currentUser.email)
                  .update({
                    points: firebase.firestore.FieldValue.increment(50),
                  })
                  .then(() => {
                    setLoading(false);
                    setModalVisible(true);
                  });
              });
          } else {
            // update sponser data on firebase

            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.email.toLowerCase())
              .update({
                isSponsered: true,
              })
              .then(() => {
                setLoading(false);
                setModalVisible(true);
              });
          }
        }
      }
    } catch (error) {
      Alert.alert("Error!", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <MyModal />

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#323333",
        }}
      >
        Enter your payment details
      </Text>

      <View style={styles.paymentIconContainer}>
        <PaymentIcon type="visa" />
        <PaymentIcon type="master" />
        <PaymentIcon type="amex" />
        <PaymentIcon type="discover" />
      </View>

      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: "•••• •••• •••• ••••",
        }}
        style={styles.cardContainer}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
        }}
      />

      <Button
        mode="contained"
        onPress={handlePayNow}
        loading={loading}
        style={{
          backgroundColor: colors.primary,
          width: "70%",
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        Pay Now
      </Button>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  paymentIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 180,
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 10,
  },
  cardContainer: {
    height: 50,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
  },
});
