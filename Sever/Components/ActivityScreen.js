import { StatusBar } from "expo-status-bar";
import React from "react";
import { Animated } from "react-native";
import { StyleSheet, Text, View } from "react-native";

export default function ActivityScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ width: 300, height: 300, backgroundColor: "white" }}>
        <Text>ActivityScreen</Text>
      </View>
    </View>
  );
}
