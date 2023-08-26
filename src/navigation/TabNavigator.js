import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import MyTripsScreen from '../screens/MyTripsScreen';
import SavedScreen from '../screens/SavedScreen';
import AccountScreen from '../screens/ProfileScreen';
import Dist from '../screens/Distinations';
import Test from '../screens/Test';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#007A00',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#F8F8F8',
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 20,
          right: 20,
          left: 20,
          borderRadius: 20,
          elevation: 10,
        },
        tabBarLabelStyle: {
          display: 'none', // تعديل هنا لإخفاء النصوص
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'MyTrips') {
            iconName = 'briefcase';
          } else if (route.name === 'Dist') {
            iconName = 'map-marker';
          } else if (route.name === 'Saved') {
            iconName = 'bookmark';
          } else if (route.name === 'Account') {
            iconName = 'account';
          }

          return (
            <View style={{ marginBottom: 8, alignItems: 'center' }}>
              <MaterialCommunityIcons
                name={iconName}
                size={22}
                color={focused ? '#007A00' : '#8E8E93'}
              />
              {focused && (
                <Text style={{ color: '#007A00', fontSize: 12 }}>{route.name}</Text>
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="MyTrips"
        component={MyTripsScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Dist"
        component={Dist}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;