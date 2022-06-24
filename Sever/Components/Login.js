import React, { useEffect, useState } from "react";
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
const Width = Dimensions.get('screen').width - 20;
const Height = Dimensions.get('screen').height;
const Width1 = Dimensions.get('screen').width;
const Height1 = Dimensions.get('screen').height;


const LoginScreen = ({ navigation }) => {
    const [tendangnhap, onChangetendangnhap] = useState("");
    const [passdangnhap, onChangepassdangnhap] = useState("");
  
    const checkuser = () => {
      if (tendangnhap === "" || tendangnhap === null) {
        Alert.alert("Cảnh báo", "Tên không được bỏ trống!");
        return;
      }
  
      if (passdangnhap === "" || passdangnhap === null) {
        Alert.alert("Cảnh báo", "Pass không được bỏ trống!");
        return;
      }
  
  
      fetch("http://192.168.2.6:4000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: tendangnhap,
          password: passdangnhap,
        }),
      })
      .then((response) => response.json())
      .then((res) => {
        if (res.success === true) {
          navigation.navigate('Home');
         } else {
            Alert.alert("Cảnh báo",""+ res.message);
         }
      })
    };
  
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View>
          <Text
            style={{
              color: "red",
              fontSize: 30,
              marginLeft: 50,
              marginRight: 50,
              marginBottom: 50,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {' '}
            ĐĂNG NHẬP{' '}
          </Text>
 

          <TextInput
            style={{
              backgroundColor: "#D3D3D3",
              borderRadius: 50,
              opacity: 0.5,
              height: 40,
              marginTop: 5,
              padding: 10,
              marginLeft: 50,
              marginRight: 50,
            }}
            placeholder="Nhập tên tài khoản....."
            onChangeText={onChangetendangnhap}

          />
      
          <TextInput
            style={{
              opacity: 0.5,
              borderRadius: 20,
              height: 40,
              marginTop: 5,
              marginBottom: 5,
             backgroundColor: "#D3D3D3",
              padding: 10,
              marginLeft: 50,
              marginRight: 50,
            }}
            placeholder="Nhập mật khẩu...."
            onChangeText={onChangepassdangnhap}
            textContentType="password"
            secureTextEntry={true}
          />
          <View style={styles.fixToText}>
            
           
            <TouchableOpacity   onPress={() => checkuser()}>
          
          <Text          
          style={{
          fontSize: 20,
          width: 260,
          height: 50,
          backgroundColor: "red",
          borderRadius: 50,
          textAlign: "center",
          color: "white",
          paddingTop: 10,
          marginRight: 10,
        }}
          
          >ĐĂNG NHẬP</Text>
         
        </TouchableOpacity>

            <View
          style={{      
            
            marginTop: 15,
          
          }}
          >
          </View>
            <Text
            style={{   
              fontWeight: "bold",   
              color: "black",
              marginTop: 15,
              textAlign: "center"
            }}         
              

            >
             Chưa có tài khoản?<Text
             style={{   
              fontWeight: "bold",   
              color: "red",
              marginTop: 15,
            
            }}
              onPress={() => navigation.navigate('Register')}>  Đăng Ký</Text>  

            </Text>
          </View>
        </View>
      </View>
    );
  }

export default LoginScreen

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    fixToText: {
      marginTop: 5,
      marginLeft: 50,
      marginRight: 50,
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
      height: Height1 * 0.35,
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