import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
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
  ScrollView,
  
} from "react-native";
import Swipeout from "react-native-swipeout";

const Width = Dimensions.get("screen").width - 20;
const Height = Dimensions.get("screen").height;
const Width1 = Dimensions.get("screen").width;
const Height1 = Dimensions.get("screen").height;

const image = [
  'https://hanoispiritofplace.com/wp-content/uploads/2016/06/hinh-anh-xe-lamborghini-1.jpg',
  'https://tuvanmuaxe.vn/upload/upload_img/images/chi-tiet-Hyundai-Accent-2018-tuvanmuaxe_vn-2.jpg',
  'https://hyundaianlac.vn/wp-content/uploads/2020/12/xe-hyundai-accent-2021-ban-dac-biet-1.jpg',
  'https://media.vov.vn/uploaded/rgjxainnqfs/2018_06_16/vinfast_1_irhu.jpg',
  'https://otovinfast.vn/wp-content/uploads/2019/12/danh-gia-xe-vinfast-lux-a2.0-18.jpg',
];

const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pageNumber, setPagetNumber] = useState(1);
  const [tenSanPham, setTenSanPham] = useState("");
  const [giaSanPham, setGiaSanPham] = useState("");
  const [diachi, setdiachi] = useState("");
  const [hinhanh, sethinhanh] = useState("");

  const [tenSanPhams, setTenSanPhams] = useState("");
  const [giaSanPhams, setGiaSanPhams] = useState("");
  const [diachis, setdiachis] = useState("");
  const [hinhanhs, sethinhanhs] = useState("");
  const [iditem, setidItem] = useState("");

  const getData = async () => {
    try {
      const response = await fetch(
        "http://192.168.2.6:4000/dssp/" + pageNumber
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onPressLearnMore = (getPage) => {
    setPagetNumber(getPage);
    getData();
  };

  const addSanPham = () => {
    if (tenSanPham === "" || tenSanPham === null) {
      Alert.alert("Cảnh báo", "Tên không được bỏ trống!");
      return;
    }

    if (giaSanPham === "" || giaSanPham === null) {
      Alert.alert("Cảnh báo", "Giá không được bỏ trống!");
      return;
    }

    if (diachi === "" || diachi === null) {
      Alert.alert("Cảnh báo", "Năm sản xuất không được bỏ trống!");
      return;
    }

    if (hinhanh === "" || hinhanh === null) {
      Alert.alert("Cảnh báo", "Hình ảnh không được bỏ trống!");
      return;
    }

    // if (tenSanPham.length < 5) {
    //   Alert.alert("Cảnh báo", "Tên của bạn quá ngắn");
    //   return;
    // }
    if (parseInt(giaSanPham) < 0 ) {
      Alert.alert("Cảnh báo", "Giá xe của bạn không đúng");
      return;
    }
    if (parseInt(diachi) < 0 ) {
      Alert.alert("Cảnh báo", "Năm sản xuất của bạn không đúng");
      return;
    }

    console.log("Add san pham");
    fetch("http://192.168.2.6:4000/addProduc", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ten: tenSanPham,
        tuoi: giaSanPham,
        diachi: diachi,
        hinhanh: hinhanh,
      }),
    }).then((response) => {
      console.log(JSON.stringify(response, null, 4));
      return response.json();
    });
    onPressLearnMore(1);
    setModalVisible(!modalVisible);
    onPressLearnMore(1);
    onItemnull();
  };

  const suaSanPham = () => {
    if (tenSanPhams === "" || tenSanPhams === null) {
      Alert.alert("Cảnh báo", "Tên không được bỏ trống!");
      return;
    }

    if (giaSanPhams === "" || giaSanPhams === null) {
      Alert.alert("Cảnh báo", "Giá không được bỏ trống!");
      return;
    }

    if (diachis === "" || diachis === null) {
      Alert.alert("Cảnh báo", "Năm sản xuất không được bỏ trống!");
      return;
    }

    if (hinhanhs === "" || hinhanhs === null) {
      Alert.alert("Cảnh báo", "Hình ảnh không được bỏ trống!");
      return;
    }

    // if (tenSanPhams.length < 5) {
    //   Alert.alert("Cảnh báo", "Tên của bạn quá ngắn");
    //   return;
    // }
    if (parseInt(giaSanPhams) < 0 ) {
      Alert.alert("Cảnh báo", "Giá của bạn không đúng");
      return;
    }
    if (parseInt(diachis) < 0 ) {
      Alert.alert("Cảnh báo", "Năm của bạn không đúng");
      return;
    }

    console.log("Sửa san pham");
    fetch("http://192.168.2.6:4000/updateProduc", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: iditem,
        tens: tenSanPhams,
        tuois: giaSanPhams,
        diachis: diachis,
        hinhanhs: hinhanhs,
      }),
    }).then((response) => {
      console.log(JSON.stringify(response, null, 4));
      return response.json();
    });
    onPressLearnMore(1);
    console.log("Update Done");
    onPressLearnMore(1);
    onItemnull();
    setModalVisiblec(!modalVisiblec);
  };

  const removeSanPham = (id) => {
    console.log("Remove san pham");
    fetch("http://192.168.2.6:4000/remove", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    }).then((response) => {
      console.log(JSON.stringify(response, null, 4));
      return response.json();
      if (response == "ok") {
        alert(" insert thành công");
      }
    });
    onPressLearnMore(1);
    onPressLearnMore(1);
    onItemnull();
  };

  const onItemnull = () => {
    setTenSanPham(null);
    setGiaSanPham(null);
    setdiachi(null);
    sethinhanh(null);
    sethinhanhs(null);
    setTenSanPhams(null);
    setGiaSanPhams(null);
    setdiachis(null);
  };

  const onItem = (item) => {
    setModalVisiblec(true);
    setTenSanPhams(item.ten);
    setGiaSanPhams(item.gia);
    setdiachis(item.nam);
    sethinhanhs(item.hinhanh);
    setidItem(item.id);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisiblec, setModalVisiblec] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  
  const renderItem = ({ item }) => (
    <View style={{fontSize: 17, marginBottom: 20 }}>
          <Image 
          style={styles.slide}
              source={{uri: item.image}}
              />
          <View style={{backgroundColor: 'rgba(0, 0, 0, 0.243)', width: Width, height: Height * 0.20, position: "absolute"}}>

          </View>
          <Text style={{color: 'rgb(255, 255, 255)', position: "absolute", alignSelf: "center", marginTop: 65, fontSize: 35, fontWeight: 'bold'}}>{item.title}</Text> 
    </View>
    
  );

  return (
    <View style={{ backgroundColor: "#BCE6FF", flex: 1, padding: 14, marginTop: 20, }}>  
    <View
    
    >
      <Text style={{alignSelf: "center", fontSize: 35, fontWeight: "bold", color : "white", marginBottom: 20 }}>
        DANH SÁCH XE
      </Text>
    </View>
  <SafeAreaView >
      <View style={styles.slide}>
        <ScrollView 
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        style={styles.slide}
        >
          {
            image.map((e, index) =>
            <Image 
            key={e}
            resizeMode="stretch"
            style={styles.slide}
            source={{uri: e}}
            />

            )
          }
        </ScrollView>
      </View>
</SafeAreaView>

<View>
      
    </View>

  {/* dssp */}

    <View style={{  margin: 5, borderRadius:50 }}>
    </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        
        <FlatList
        style={{  backgroundColor: "#BCE6FF",  }}
        
          data={data}
          keyExtractor={({ id }, index) => id}
          
          renderItem={({ item }) => (
            
            <Swipeout
              style={{ fontSize: 27, marginBottom: 10 }}
              right={[
                {
                  onPress: () => {
                    Alert.alert(
                      "Cảnh báo",
                      "Bạn muốn xóa nó?",
                      [
                        {
                          text: "No",
                          onPress: () => console.log("Cancel"),
                          style: "cancel",
                        },
                        {
                          text: "Yes",
                          onPress: () => {
                            removeSanPham(item.id);
                          },
                        },
                      ],
                      { cancelable: true }
                    );
                  },
                  backgroundColor: "#FF6666",
                  text: "Xóa",
                },
                {
                  onPress: () => {
                    onItem(item);
                  },
                  backgroundColor: "#00FFFF",
                  text: "Sửa",
                },
              ]}
            >
              <TouchableOpacity
              style={{ borderRadius: 50}}

                onPress={() => 
                navigation.navigate("Chi tiết xe", {
                  id: item.id,
                  ten: item.ten,
                  tuoi: item.gia,
                  diachi: item.nam,
                  hinhanh: item.hinhanh,
                })
              }
              
              >
                <View style={{ flexDirection: "row", height: 100, backgroundColor:"#53A7D8", borderRadius:10, overflow:"hidden" }}>
                  
                  <View style={{ marginEnd: 20 }}>
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={{
                        uri: item.hinhanh,
                      }}
                    />
                  </View>

                  <View>
                    <Text
                      style={{
                        color: "white",
                        alignSelf: "flex-start",
                        paddingTop: 10,
                        fontWeight: "bold",
                      }}
                    >
                      Tên: {item.tensp}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        alignSelf: "flex-start",
                        paddingTop: 10,
                        fontWeight: "bold",
                      }}
                    >
                      Giá Thành: {item.dongia} VNĐ
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        alignSelf: "flex-start",
                        paddingTop: 10,
                        fontWeight: "bold",
                      }}
                    >
                      Số lượng : {item.soluong}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Swipeout>
            ////////////
          )}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView>
        <View
          style={{
            marginTop: "50%",
            marginLeft: 20,
            marginRight: 20,
            color: "black",
            borderRadius: 20,
            padding: 10,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 25,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Text
            style={{
              height: 40,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              color: "red"              
            }}
          >
            THÊM XE
          </Text>

          <TextInput
            style={{
              height: 40,
              margin: 12,
              color: "black",
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}
            onChangeText={setTenSanPham}
            placeholder="Tên Xe"
            keyboardType="default"
          />
          <TextInput
            style={{
              height: 40,
              margin: 12,
              color: "black",
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}
            onChangeText={setGiaSanPham}
            placeholder="Giá xe"
            keyboardType="number-pad"
          />

          <TextInput
            style={{
              height: 40,
              margin: 12,
              color: "black",
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}
            onChangeText={setdiachi}
            placeholder="Năm sản xuất"
            keyboardType="number-pad"
          />

          <TextInput
            style={{
              height: 40,
              margin: 12,
              color: "black",
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}
            onChangeText={sethinhanh}
            placeholder="Link Hình ảnh"
            keyboardType="default"
          />

          <View
            style={{
              margin: 12,
            }}
          >
            <Button
              title="Thêm Xe"
              accessibilityLabel="Trang 1"
              onPress={() => addSanPham()}
            />

            <View
            style={{
                marginBottom: 10,
                
            }}
            >
              
            </View>

            <Button
              title="Hủy bỏ"
              color="red"
              accessibilityLabel="Trang 1"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>

        </ScrollView>

        
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisiblec}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisiblec(!modalVisiblec);
        }}
      >
        <ScrollView>
        <View
          style={{
            marginTop: "50%",
            marginLeft: 20,
            marginRight: 20,
            color: "black",
            borderRadius: 20,
            padding: 10,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 25,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Text
            style={{
              height: 40,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              color: "red",
              
            }}
          >
            SỬA XE
          </Text>

          <TextInput
            style={{
              height: 40,
              margin: 12,
              color: "black",
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}
            onChangeText={setTenSanPhams}
            value={tenSanPhams}
            placeholder="Sửa tên xe"
            keyboardType="default"
          />
          <TextInput
            style={{
              height: 40,
              margin: 12,
              color: "black",
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}
            onChangeText={setGiaSanPhams}
            value={String(giaSanPhams)}
            placeholder="Sửa giá xe"
            keyboardType="number-pad"
          />

          <TextInput
            style={{
              height: 40,
              margin: 12,
              color: "black",
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}
            onChangeText={setdiachis}
            value={String(diachis)}
            placeholder="Sửa năm sản xuất"
            keyboardType="number-pad"
          />

          <TextInput
            style={{
              height: 40,
              margin: 12,
              color: "black",
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}
            onChangeText={sethinhanhs}
            value={hinhanhs}
            placeholder="Sửa Link hình ảnh"
            keyboardType="default"
          />

          <View
            style={{
              margin: 12
            }}
          >
            <Button
              title="Sửa xe"
              accessibilityLabel="Trang 1"
              onPress={() => suaSanPham()}
            />
            <View
            style={{
              marginBottom: 10
            }}
            >
              
            </View>
            <Button
              title="Hủy bỏ"
              color="red"
              accessibilityLabel="Trang 1"
              onPress={() => setModalVisiblec(false)}
            />
          </View>
        </View>
        </ScrollView>
      </Modal>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity   onPress={() => onPressLearnMore(1)}>
          
          <Text style={{
          marginTop: 20,
          width: 25,
          height: 25,
          backgroundColor: "#2D82B5",
          borderRadius: 50,
          textAlign: "center",
          color: "white",
          paddingTop: 2,
          marginRight: 10,
        }}
          
          >1</Text>
         
        </TouchableOpacity>
        <TouchableOpacity   onPress={() => onPressLearnMore(2)}>
          <Text
          style={{
            marginTop: 20,
            width: 25,
            height: 25,
            backgroundColor: "#2D82B5",
            borderRadius: 50,
            textAlign: "center",
            color: "white",
            paddingTop: 2,
            marginRight: 10,
          }}
          >2</Text>
         
        </TouchableOpacity>
     
      </View>
      <View
        style={{
          width: 40,
          height: 40,
          alignSelf: "flex-end",
          borderRadius: 50,
        }}
        onPress={() => setModalVisible(true)}
      >
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            style={{ width: 45, height: 45 }}
            source={{
              uri: "https://hoigicungbiet.com/wp-content/uploads/2018/09/Add-l%C3%A0-g%C3%AC-M%E1%BB%99t-s%E1%BB%91-c%E1%BB%A5m-t%E1%BB%AB-ph%E1%BB%95-bi%E1%BA%BFn-v%E1%BB%9Bi-%E2%80%9CAdd%E2%80%9D.png",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  fixToText: {
    marginTop: 5,
    marginLeft: 50,
    marginRight: 50,
  },
  modalView: {
    margin: 0,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,

    alignItems: "center",
    shadowColor: "#000",
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
    width: "100%",
    elevation: 2,
  },
  input: {
    height: 40,
    width: "100%",
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  slide1: {
    width: Width1,
    height: Height1 * 0.35,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
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
