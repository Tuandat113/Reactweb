import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

// import Icon from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import SplashScreen from './SplashScreen';
export function DrawerContent(props) {

    const paperTheme = useTheme();

    // const { signOut, toggleTheme } = React.useContext(AuthContext);

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'data:image/jpeg;base64,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'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>Tuấn đạt</Title>
                                <Caption style={styles.caption}>dathtpk01816@fpt.edu.vn</Caption>
                            </View>
                        </View>

                        {/* <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View> */}
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <FontAwesome name="home" size={24} color="#05375a" />

                            )}
                            label="Trang chủ"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem style = {{marginLeft: 15}}
                       

                            icon={({color, size}) => (
                                
                                <FontAwesome name="info" size={24} color="#05375a" />
                            )}
                            label="Thông tin phiên bản"
                            onPress={() => {props.navigation.navigate('Thông tin phiên bản')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <MaterialIcons name="exit-to-app" size={24} color="#05375a" />
                        
                    )}
                    label="Đăng xuất"
                    // onPress={() => {signOut()}}
                    onPress={() => {props.navigation.navigate(SplashScreen)
                    
                    
                    }
                        
                    
                }


                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
