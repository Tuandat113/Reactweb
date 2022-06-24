import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import RevenueScreen from "./RevenueScreen";
import ContainerScreen from "./ContainerScreen";
import ShowCaseScreen from "./ShowCaseScreen";


//
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
  barStyle={{backgroundColor: "#015C92"}}
  
  initialRouteName="Home" activeColor="white">
    <Tab.Screen
      name="Home"
      component={ContainerScreen}
      options={{
        tabBarLabel: "Trang chủ",
        tabBarColor: "#00FFFF",
        tabBarIcon: ({ color }) => (
          <FontAwesome name="home" size={24} color="white" />
        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={ShowCaseScreen}
      options={{    
        headerLeft: false,
        headerShown: false,    
        tabBarLabel: "Thông tin",
        tabBarColor: "#1f65ff",
        tabBarIcon: ({ color }) => (
          <FontAwesome name="info" size={24} color="white" />
        ),
      }}
    />
    {/* <Tab.Screen
      name="Profile"
      component={RevenueScreen}
      options={{
        tabBarLabel: "Revenue",
        tabBarColor: "#694fad",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" size={24} color="white" />
        ),
      }}
    /> */}
  </Tab.Navigator>
);

export default MainTabScreen;

