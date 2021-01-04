import React from 'react';
import {View,ImageBackground,StyleSheet,Image} from 'react-native';
import { Text,Avatar, Card ,Header,Accessory} from 'react-native-elements';
import {AuthContext} from '../providers/AuthProvider';
import HeaderHome from "../components/HeaderHome";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const image = { uri: 'https://png.pngtree.com/thumb_back/fh260/back_our/20190619/ourmid/pngtree-company-profile-background-material-image_131613.jpg' };


const ProfileScreen=(props)=>{
  return(
    <AuthContext.Consumer>
      {(auth)=>(
        <View style={styles.viewStyle} >
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <ImageBackground source={image} style={styles.image}>

                    
           

          
          <View>
            
 
          <Image
                marginTop={20}
                style={{ width: 400, height: 200, borderRadius: 200/5 }}
                resizeMode="contain"
                alignSelf="center"
                source={require('./../../assets/nico.jpg')}
              />
          </View>
 
            <Card>            
            <Text style={styles.textStyle}> Name: {auth.CurrentUser.displayName}</Text>
            </Card>
            <Card>
            <Text style={styles.textStyle}>Email: {auth.CurrentUser.email}</Text>
          </Card>
          </ImageBackground>
        </View>
      )}
    </AuthContext.Consumer>
    
  );
};
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    padding: 10,
    marginStart: 1,
  },
  viewStyle: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  textStyle2: {
    fontSize: 25,
    color: "#000000",
    justifyContent: 'center',
    marginVertical: 20,
    textAlign: 'left'

  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },


});


export default ProfileScreen;