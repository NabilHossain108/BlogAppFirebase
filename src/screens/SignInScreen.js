import React, { useState } from "react";
import { View, StyleSheet,Image,ImageBackground,Text } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import * as firebase from "firebase";
import Loading from "./../components/Loading";

const image = { uri:'https://cdn.hipwallpaper.com/i/84/22/ljrBvi.jpg'};
const SignInScreen = (props) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AuthContext.Consumer>
        {(auth) => (
          <View style={styles.viewStyle}>
            <ImageBackground source={image} style={styles.image}>
            <Text style={styles.textStyle}>Welcome to My Blog</Text>
            <Card>

              <Input
                leftIcon={
                  <FontAwesome name="envelope" size={24} color="black" />
                }
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
                icon={<AntDesign name="login" size={24} color="white" />}
                title="  Sign In!"
                type="solid"
                onPress={() => {
                  setIsLoading(true);
                  firebase
                    .auth()
                    .signInWithEmailAndPassword(Email, Password)
                    .then((userCreds) => {
                      setIsLoading(false);
                      auth.setIsLoggedIn(true);
                      auth.setCurrentUser(userCreds.user);
                    })
                    .catch((error) => {
                      setIsLoading(false);
                      alert(error);
                    });
                }}
              />
              <Button
                type="clear"
                icon={<AntDesign name="user" size={24} color="dodgerblue" />}
                title="  Don't have an account?"
                onPress={function () {
                  props.navigation.navigate("SignUp");
                }}
              />
            </Card>
            </ImageBackground>
          </View>
        )}
      </AuthContext.Consumer>
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
export default SignInScreen;