import React, { useState } from "react";
import { View, StyleSheet,Text,Image,ImageBackground } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";
import Loading from "./../components/Loading";
const image = { uri:'https://cdn.hipwallpaper.com/i/84/22/ljrBvi.jpg'};

const SignUpScreen = (props) => {
  const [Name, setName] = useState("");
  const [SID, setSID] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <View style={styles.viewStyle}>
        <ImageBackground source={image} style={styles.image}>
        <Text style={styles.textStyle}>Enter Your Information</Text>
        <Card>

          <Input
            leftIcon={<Ionicons name="ios-person" size={24} color="black" />}
            placeholder="Name"
            onChangeText={function (currentInput) {
              setName(currentInput);
            }}
          />
          <Input
            leftIcon={<Ionicons name="ios-school" size={24} color="black" />}
            placeholder="Student ID"
            onChangeText={function (currentInput) {
              setSID(currentInput);
            }}
          />
          <Input
            leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
            placeholder="E-mail Address"
            onChangeText={function (currentInput) {
              setEmail(currentInput);
            }}
          />

          <Input
            placeholder="Password"
            leftIcon={<Feather name="key" size={24} color="black" />}
            secureTextEntry={true}
            onChangeText={function (currentInput) {
              setPassword(currentInput);
            }}
          />

          <Button
            icon={<AntDesign name="user" size={24} color="white" />}
            title="  Sign Up!"
            type="solid"
            onPress={() => {
              if (Name && SID && Email && Password) {
                setIsLoading(true);
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(Email, Password)
                  .then((userCreds) => {
                    userCreds.user.updateProfile({ displayName: Name });
                    firebase
                    .firestore()
                    .collection("notification")
                    .doc(userCreds.user.uid)
                    .set(
                      {}
                    )
                    firebase
                      .firestore()
                      .collection("users")
                      .doc(userCreds.user.uid)
                      .set({
                        name: Name,
                        sid: SID,
                        email: Email,
                        notifications:[],
                      })
                      .then(() => {
                        setIsLoading(false);
                        alert("Account created successfully User ID :"+userCreds.user.uid );
                        console.log(userCreds.user);
                        props.navigation.navigate("SignIn");
                      })
                      .catch((error) => {
                        setIsLoading(false);
                        alert(error);
                      });
                  })
                  .catch((error) => {
                    setIsLoading(false);
                    alert(error);
                  });
              } else {
                alert("Fields can not be empty!");
              }
            }}
          />
          <Button
            type="clear"
            icon={<AntDesign name="login" size={24} color="dodgerblue" />}
            title="  Already have an account?"
            onPress={function () {
              props.navigation.navigate("SignIn");
            }}
          />
        </Card>
        </ImageBackground>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#4bacb8",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  textStyle:{
      fontSize:30,
      color:'#ffffff',
      justifyContent:'center',
      textAlign:'center',
      marginBottom: 50,
 
  }
});
export default SignUpScreen;