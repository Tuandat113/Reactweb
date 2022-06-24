import React, { useEffect, useRef } from "react";
import {
  View,
  Image,
  Text,
  Animated,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Logo from "../assets/package-box.png";

const Stack = createNativeStackNavigator();

const BGColor = "#00CCFF";

export default function SplashScreen({ navigation }) {
  const edges = useSafeAreaInsets();

  const startAnimation = useRef(new Animated.Value(0)).current;
  const scaleLogo = useRef(new Animated.Value(1)).current;
  const scaleTitle = useRef(new Animated.Value(1)).current;
  const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(startAnimation, {
          toValue: -Dimensions.get("window").height + (edges.top + 175),
          useNativeDriver: true,
        }),
        Animated.timing(scaleLogo, {
          toValue: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(scaleTitle, {
          toValue: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(moveLogo, {
          toValue: {
            x: 0,
            y: Dimensions.get("window").height / 2 - 5,
          },
          useNativeDriver: true,
        }),
        Animated.timing(moveTitle, {
          toValue: {
            x: 0,
            y: Dimensions.get("window").height / 2 - 35,
          },
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);
  }, []);
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          zIndex: 1,
          backgroundColor: BGColor,
          transform: [{ translateY: startAnimation }],
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.Image
            source={Logo}
            style={{
              width: 200,
              height: 200,
              marginBottom: 5,
              transform: [
                { translateX: moveLogo.x },
                { translateY: moveLogo.y },
                { scale: scaleLogo },
              ],
            }}
          ></Animated.Image>
          <Animated.Text
            style={{
              fontSize: 35,
              fontWeight: "bold",
              color: "white",
              transform: [{ translateY: moveTitle.y }, { scale: scaleTitle }],
            }}
          >
            Ứng dụng
          </Animated.Text>
          <Animated.Text
            style={{
              fontSize: 30,
              color: "white",
              transform: [{ translateY: moveTitle.y }, { scale: scaleTitle }],
            }}
          >
            Quản lý kho xe
          </Animated.Text>
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: BGColor,
          zIndex: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: 300,
            height: 50,
            marginTop: 400,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            borderRadius:10,
          }} onPress={() => navigation.navigate('Login')}
        >
          <Text>Đăng Nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 300,
            height: 50,
            marginTop: 10,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            borderRadius:10
          }} onPress={() => navigation.navigate('Register')}
        >
          <Text>Đăng Ký</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
