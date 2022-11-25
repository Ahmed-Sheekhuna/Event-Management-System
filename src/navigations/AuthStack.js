import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPassword from "../screens/ForgotPassword";
import colors from "../config/colors";
import RegisterCollectionScreen from "../screens/RegisterCollectionScreen";
import RegistrationDone from "../screens/RegistrationDone";

const stack = createNativeStackNavigator();

const AuthStack = () => (
  <stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      tabBarActiveTintColor: colors.primary,
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
      headerTitleAlign: "center",
    }}
  >
    <stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <stack.Screen name="Forgot Password" component={ForgotPassword} />
    <stack.Screen name="Register" component={RegisterScreen} />
    <stack.Screen
      name="RegisterCollection"
      component={RegisterCollectionScreen}
      options={{ title: "About yourself" }}
    />

    <stack.Screen
      name="RegistrationDone"
      component={RegistrationDone}
      options={{ title: "Registering" }}
    />
  </stack.Navigator>
);

export default AuthStack;
