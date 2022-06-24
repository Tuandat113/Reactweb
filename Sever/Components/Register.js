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

const SignupScreen = ({ navigation }) => {
    const [tendangkys, settendangky] = useState("");
    const [passdangkys, setpassdangky] = useState("");
    const [nhaplaipassdangkys, setnhaplaipassdangky] = useState("");

  
    const checkusers = () => {
      if (tendangkys === "" || tendangkys === null) {
        Alert.alert("Cảnh báo", "Tài khoản không được bỏ trống!");
        return;
      }
      if (tendangkys <3  ) {
        Alert.alert("Cảnh báo", "Tài khoản phải nhiều hơn 3 ký tự!");
        return;
      }
      if (passdangkys < 5 ) {
        Alert.alert("Cảnh báo", "Mật khẩu phải có ít nhất 6 ký tự!");
        return;
      }
  
      if (passdangkys === "" || passdangkys === null) {
        Alert.alert("Cảnh báo", "Mật khẩu không được bỏ trống!");
        return;
      }
  
      if (nhaplaipassdangkys === "" || nhaplaipassdangkys === null) {
        Alert.alert("Cảnh báo", "Nhập lại mật khẩu không được bỏ trống!");
        return;
      }
      if (!(nhaplaipassdangkys === passdangkys)) {
        Alert.alert("Cảnh báo", "Mật khẩu không khớp!");
        return;
      }
  
      fetch("http://192.168.2.6:4000/singup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tentaikhoans: tendangkys,
          matkhaus: passdangkys,
        }),
      })  
      .then((response) => response.json())
      .then((res) => {
        if (res.success === true) {
            Alert.alert("Thông báo","Đăng ký tài khoản thành công!");
            navigation.navigate('Login')
         } else {
            Alert.alert("Thông báo","Tài khoản đã tồn tại!");
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
            Đăng ký{' '}
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
            placeholder="Nhập Tên tài khoản...."
            onChangeText={settendangky}
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
            placeholder="Nhập mật khẩu..."
            onChangeText={setpassdangky}
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
          placeholder="Nhập lại Mật khẩu"
          onChangeText={setnhaplaipassdangky}
        />
          <View style={styles.fixToText}>
          <TouchableOpacity   onPress={() => checkusers()}>
          
          <Text style={{
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
          
          >Đăng ký</Text>
         
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
             Đã có tài khoản?<Text
             style={{   
              fontWeight: "bold",   
              color: "red",
              marginTop: 15,
            
            }}
              onPress={() => navigation.navigate('Login')}> Đăng Nhập</Text>  

            </Text>
          </View>
        </View>
      </View>
    );
  }

  export default SignupScreen

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