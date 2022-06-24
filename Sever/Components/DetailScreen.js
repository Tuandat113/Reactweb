import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  Modal,
  StyleSheet,
  Image,
} from "react-native";

var DATA2 = [];
const Width = Dimensions.get('screen').width - 20;
const Height = Dimensions.get('screen').height;
const Width1 = Dimensions.get('screen').width;
const Height1 = Dimensions.get('screen').height;

const DetailScreen = ({ route }) => {
  const { id, ten, tuoi, diachi, hinhanh } = route.params;
  var Id = JSON.stringify(id);
  var Ten = JSON.stringify(ten);
  var Tuoi = JSON.stringify(tuoi);
  var DiaChi = JSON.stringify(diachi);
  var Hinhanh = JSON.stringify(hinhanh);
  DATA2 = [];
  var itemnew = {
    id: JSON.parse(Id),
    ten: JSON.parse(Ten),
    tuoi: JSON.parse(Tuoi),
    diachi: JSON.parse(DiaChi),
    hinhanh: JSON.parse(Hinhanh),
  };
  DATA2.push(itemnew);

  console.log(DATA2);


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.container}>
        <View style={{ fontSize: 17, padding: 0, height: '100%',backgroundColor: "#0193A5"  }}>
          <FlatList
            data={DATA2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View style={{ fontSize: 17, marginBottom: 0, }}>
                  <Image style={styles.slide1} source={{ uri: item.hinhanh }} />
                  <Text
                    style={{
                      color: 'rgb(255, 255, 255)',
                      alignSelf: 'center',
                      marginTop: 15,
                      fontSize: 25,
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                      <Text>
                      {item.ten}
                      </Text>
                 
                  </Text>
                  <Text
                    style={{
                      color: 'rgb(255, 255, 255)',
                      alignSelf: 'center',
                      marginTop: 15,
                      fontSize: 25,
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                      <Text>
                      Giá: {item.tuoi} VNĐ

                      </Text>
                  </Text>
                  <Text
                    style={{
                      color: 'rgb(255, 255, 255)',
                      alignSelf: 'center',
                      marginTop: 15,
                      fontSize: 25,
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                      <Text>
                        Năm sản xuất: {item.diachi}
                      </Text>
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default DetailScreen

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 0,
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 25,
  
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      marginTop: 10,
      width: '100%',
      elevation: 2,
    },
    input: {
      height: 40,
      width: '100%',
      margin: 5,
      borderWidth: 1,
      padding: 10,
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    slide1: {
      width: Width1,
      height: Height1 * 0.55,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    container: {
      flex: 1,
    },
    slide: {
      borderRadius: 10,
      width: Width,
      height: Height * 0.25,
    },
  });