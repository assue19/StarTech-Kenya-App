import React, { Component } from "react";
import {
  AppRegistry,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  Image,
  TextInput,
  StyleSheet, // CSS-like styles
  Text, // Renders text
  View,
  Modal,
  ActivityIndicator,
  ScrollView

} from "react-native";

import { StackNavigator } from "react-navigation";
import Loader from "./Loader";
import renderIf from "./util/renderIf";
//import Spinner from "react-native-loading-spinner-overlay";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      email: "",
      password: ""
    };
  }
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "white",
      elevation: null
    },
    headerTitleStyle: {
      textAlign: "left",
      alignSelf: "center",
      flex: 1
    },
    headerTintColor: "#fff"
  };


  onLoginPress = () => {
    const { email, password } = this.state;

    this.setState({
      loading: true
    });

    fetch("http://login.mysite.com/redirect", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson.statusCode === 200) {

          this.setState({
            loading: false,
            email: "false",
            password: "password"
          });
          //Then open Profile activity and send user email to profile activity.
          this.props.navigation.navigate("HomeScreen");
        } else {
          Alert.alert(responseJson.message);
        }
      })
      .catch(error => {
        this.setState({ error, loading: false });
        console.error(error);
      });
  };

  render() {
    return (
       
      <View style={styles.container}>
      <ScrollView>
        <View behavior="padding" style={styles.container}>
          <View style={styles.logoContainer}>
            <Loader loading={this.state.loading} />
            <Image style={styles.logo} source={require("./logo2.png")} />
            <Text style={styles.subtext}>StarTech Kenya</Text>
          </View>

          <KeyboardAvoidingView style={styles.keyboard}>
            <View style={styles.window}>
              <TextInput
                placeholder="Enter Username"
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.email}
                style={styles.input}
                onChangeText={email => this.setState({ email })}
              />
            </View>

            <View style={styles.window}>
              <TextInput
                placeholder="Enter Password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="go"
                secureTextEntry
                ref={input => (this.passwordInput = input)}
                value={this.state.password}
                style={styles.input}
                onChangeText={password => this.setState({ password })}
              />
            </View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={
                //this.onLoginPress.bind(this)
                () => this.props.navigation.navigate("HomeScreen")
              }
            >
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>

        <View style={styles.horizontalContainer}>

            <TouchableOpacity style={styles.button}
            onPress={() => this.props.navigation.navigate("Register")}>
              <Text
                style={styles.buttonText}
                
                title="Create Account"
              >
                Create Account
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} 
            onPress={() => this.props.navigation.navigate("ForgetPassword")}>
              <Text
                style={styles.buttonText}
              
                title="Forgot Password"
              >
                Forgot Password
              </Text>
            </TouchableOpacity>
        </View>

    </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2f39f2"

  },
  horizontalContainer:{
    flex: 1,
    flexDirection:"row"
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop:15
  },
  logo: {
    width: 200,
    height: 150
  },
  subtext: {
    color: "#ffffff",
    width: "100%",
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 20,
    opacity: 0.8
  },
  keyboard: {
    margin: 20,
    padding: 20,
    alignSelf: "stretch"
  },
  buttonContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 15
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  },
  button: {
    paddingVertical: 15,
    padding: 20,
    marginBottom: 5,
    marginTop: 5,
    marginRight: 20,
    // marginLeft: 20,
    borderRadius:20
  },
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    paddingHorizontal: 10
  },
  window: {
    marginBottom: 15
  }
});

AppRegistry.registerComponent("Login", () => Login);
