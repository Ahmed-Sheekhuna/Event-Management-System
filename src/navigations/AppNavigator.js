import React from "react";
import { TouchableOpacity } from "react-native";
import {
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Feather } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import colors from "../config/colors";
import ProfileScreen from "../screens/ProfileScreen";
import CompetitionDetails from "../screens/CompetitionDetails";
import ScheduleScreen from "../screens/ScheduleScreen";
import useAuthentication from "../hooks/useAuthentication";
import PaymentScreen from "../screens/PaymentScreen";
import SponsorPackageScreen from "../screens/SponsorPackageScreen";
import CreateCompetition from "../screens/CreateCompetition";
import { useStates } from "../hooks/useStates";

const Tab = createBottomTabNavigator();
const HomeStackNav = createNativeStackNavigator();

const HomeStack = () => {
  const { signOut } = useAuthentication();

  return (
    <HomeStackNav.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleAlign: "center",
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.white,
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopColor: "transparent",
        },
      }}
    >
      <HomeStackNav.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // headerLeft: () => (
          //   <TouchableOpacity>
          //     <AntDesign
          //       name="infocirlceo"
          //       size={24}
          //       color={colors.white}
          //       style={{ marginLeft: 15 }}
          //     />
          //   </TouchableOpacity>
          // ),
          headerRight: () => (
            <TouchableOpacity onPress={signOut}>
              <MaterialCommunityIcons
                name="logout"
                size={24}
                color={colors.white}
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <HomeStackNav.Screen
        name="CompetitionDetails"
        component={CompetitionDetails}
        options={{ title: "Details" }}
      />

      <HomeStackNav.Screen name="Payment" component={PaymentScreen} />

      <HomeStackNav.Screen
        name="RegisterSubscription"
        component={SponsorPackageScreen}
        options={{ title: "Select your package" }}
      />
    </HomeStackNav.Navigator>
  );
};

const ProfileStackNav = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <ProfileStackNav.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleAlign: "center",
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.white,
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopColor: "transparent",
        },
      }}
    >
      <ProfileStackNav.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />

      <ProfileStackNav.Screen
        name="CreateCompetition"
        component={CreateCompetition}
        options={{ title: "Create a Competition" }}
      />
    </ProfileStackNav.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleAlign: "center",
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          // backgroundColor: colors.primary,
          // borderTopColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          title: "Event Schedule",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="face-profile"
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
