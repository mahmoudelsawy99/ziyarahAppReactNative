import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/SignUpScreen";
import SplashScreen from "../screens/SplashScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen ";
import TripsScreen from "../screens/trips/TripDetailsScreen";
import TripDetailsScreen from "../screens/trips/TripDetailsScreen";
import SettingsScreen from "../screens/profile/SettingsScreen";
import WelcomeScreenOne from "../screens/welcomeScreens/WelcomeScreenOne";
import WelcomeScreenTwo from "../screens/welcomeScreens/WelcomeScreenTwo";
import WelcomeScreenThree from "../screens/welcomeScreens/WelcomeScreenThree";
import DistDetails from "../screens/DistDetails";
import TourDetails from "../screens/TourDetails";
import TourSchedules from "../screens/TourSchedules";
import TourBooking from "../screens/TourBooking";
import Details from "../screens/Details";
import TabBar from "./TabNavigator";
// import DrawerNavigation from './DrawerNavigation';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator>
      {/* <Stack.Navigator initialRouteName="LoginScreen"> */}
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: "Register", //Set Header Title
          headerStyle: {
            backgroundColor: "#307ecc", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="WelcomeScreenOne"
        component={WelcomeScreenOne}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WelcomeScreenTwo"
        component={WelcomeScreenTwo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WelcomeScreenThree"
        component={WelcomeScreenThree}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabNavigator"
        component={TabBar}
        options={{ headerShown: false }}
        initialParams={{
          screens: [
            {
              name: "Home",
              component: require("../screens/HomeScreen").default,
              options: {
                // tabBarLabel: 'Home',
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="home"
                    size={size}
                    color={color}
                  />
                ),
              },
            },
          ],
        }}
      />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="TourBooking" component={TourBooking} />
      <Stack.Screen name="TourSchedules" component={TourSchedules} />
      <Stack.Screen name="TourDetails" component={TourDetails} />
      <Stack.Screen name="DistDetails" component={DistDetails} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Trips" component={TripsScreen} />
      <Stack.Screen name="TripDetails" component={TripDetailsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
