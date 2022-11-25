import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, DefaultTheme } from "react-native-paper";
import { StripeProvider } from "@stripe/stripe-react-native";

import AppNavigator from "./src/navigations/AppNavigator";
import NavigationTheme from "./src/navigations/NavigationTheme";
import AuthStack from "./src/navigations/AuthStack";
import { StateProvider } from "./src/hooks/useStates";
import colors from "./src/config/colors";
import { auth, db } from "./src/config/firebase";
import LoadingScreen from "./src/screens/LoadingScreen";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [eventTimings, setEventTimings] = useState();

  LogBox.ignoreLogs([
    "Setting a timer",
    "Deprecated: Native Google Sign-In has been moved to Expo.GoogleSignIn",
    "Can't perform a React state",
    'Each child in a list should have a unique "key" prop',
    "VirtualizedLists should never be",
  ]);

  const fetchUserData = (user) => {
    db.collection("users")
      .doc(user.email.toLowerCase())
      .get()
      .then((doc) => {
        if (doc.exists) setIsLogged({ ...user, ...doc.data() });
        else setIsLogged(user);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user);
        setIsLogged(user);
      } else {
        setIsLogged(false);
      }
      setLoaded(true);
    });
  }, []);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.white,
      text: colors.black,
      placeholder: "gray",
    },
  };

  return (
    <StateProvider
      states={{
        isLogged,
        setIsLogged,
        eventTimings,
        setEventTimings,
      }}
    >
      <StripeProvider
        publishableKey={"pk_test_qblFNYngBkEdjEZ16jxxoWSM"}
        merchantIdentifier="merchant.com.stripe.react.native"
        setUrlSchemeOnAndroid={true}
      >
        <Provider theme={theme}>
          <NavigationContainer theme={NavigationTheme}>
            {isLoaded ? (
              isLogged ? (
                <AppNavigator />
              ) : (
                <AuthStack />
              )
            ) : (
              <LoadingScreen />
            )}
          </NavigationContainer>
        </Provider>
      </StripeProvider>
    </StateProvider>
  );
}
