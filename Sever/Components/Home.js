import { StatusBar } from "expo-status-bar";
import React from "react";
import { Animated } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';
import ShowCaseScreen from "./ShowCaseScreen";
import Register from "./Register";
import SplashScreen from "./SplashScreen";
import MainTabScreen from "./MainTabScreen";
import DetailScreen from "./DetailScreen";
import LoginScreen from "./Login";


import { DrawerContent } from './DrawerContent';
const Drawer = createDrawerNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null); 

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

 
  return (
    <PaperProvider theme={theme}>
    <NavigationContainer theme={theme}  independent={true}>
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props } />}>
          <Drawer.Screen
           name="Trang Chủ" component={MainTabScreen} />
          <Drawer.Screen name="Thông tin phiên bản" component={ShowCaseScreen} />
          <Drawer.Screen name="SignInScreen" component={Register} />
          <Drawer.Screen name="SplashScreen" component={SplashScreen} />
          <Drawer.Screen name="Chi tiết xe" component={DetailScreen} />
          <Drawer.Screen
             options={{
              headerLeft: false,
              headerShown: false
            }}
          name="Register" component={Register} />

          <Drawer.Screen
          options={{
          headerLeft: false,
          headerShown: false
        }}
          name="Login" component={LoginScreen} />

        </Drawer.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}
export default App;