import React, { Component, useState, useEffect } from "react"
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {Ionicons} from "@expo/vector-icons";


import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  KeyboardAvoidingView,
  Animated,
  Platform,
  RefreshControl,
  ScrollView,
  Easing,
  Button,
  Dimensions,
  StatusBar
} from "react-native";

import { Sizes, Colors, Padding, Margin, Fonts } from "app/styles"
import GriffinPoolsLogo from "images/griffin-logo.png"
import { auth } from "views/auth/firebase.js"
import Homescreen from "views/homescreen.js";






const REFRESH_VIEW_HEIGHT = 80;




export default class Login extends Component {
    state = {
        email:"",
        password:"",
    }






    setEmail = (email) => {
        this.setState({email});
    }

    setPassword = (password) => {
        this.setState({password});
    }

    handleSignUp = () => {
       auth
       .createUserWithEmailAndPassword(this.state.email, this.state.password)
       .then(userCredentials => {
         const user=userCredentials.user;
         console.log("Registered in with: ",user.email)
       })
       .catch(error => alert(error.message))
      }

    handleLogin = () => {
      auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
        const user=userCredentials.user;
        console.log("Logged in with: ",user.email)
        if(user){
        this.props.navigation.replace("Homescreen")
        }
      })
      .catch(error => alert(error.message))
    }

  render(){
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.header}>
        </View>
        <View style={styles.topView}>
         <Image source = {GriffinPoolsLogo} style={{ width: 255, height: 190, resizeMode:"contain"}}/>
        </View>
        <View style={styles.inputContainer}>
            <TextInput
            placeholder="Email"
            style={styles.input}
            value = {this.state.email}
            onChangeText = {text => this.setEmail(text)}
            />

            <TextInput
            placeholder="Password"
            style={styles.input}
            value = {this.state.password}
            onChangeText = {text => this.setPassword(text)}
            secureTextEntry
            />

            <View style={styles.buttonContainer}>
                <TouchableHighlight
                onPress={this.handleLogin}
                style={styles.button}
                underlayColor={"transparent"}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>


                <TouchableHighlight
                onPress={this.handleSignUp}
                style={[styles.button, styles.buttonOutline]}
                underlayColor={"transparent"}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableHighlight>

            </View>


        </View>

      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    alignItems:'center',
    justifyContent:'center',

  },

  inputContainer:{
    width:"80%",

  },

  header:{
    width:"100%",
    height:80,
    backgroundColor:Colors.primary,
    position:'absolute',
    left:0,
    right:0,
    top:0,
    bottom:800,
  },

  input:{
    backgroundColor:'white',
    paddingHorizontal:Padding.mediumPadding,
    paddingVertical:Padding.mediumPadding,
    borderRadius:Sizes.smallBorderRadius,
    marginTop:Margin.xsmallMargin,

  },

  buttonContainer:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:Margin.xlargeMargin,

  },

  button:{
    backgroundColor:Colors.primaryLight,
    width:"60%",
    padding:Padding.mediumPadding-1,
    borderRadius:Sizes.smallBorderRadius,
    alignItems:'center'

  },

  buttonText:{
    fontSize:Fonts.mediumFontSize,
    fontFamily:Fonts.systemBoldFont,
    color:Colors.primary
  },

  buttonOutline:{
    backgroundColor:'white',
    marginTop:Margin.smallMargin,
    borderColor:Colors.primaryLight,
    borderWidth:2,
  },

  topView:{
    marginBottom:Margin.largeMargin,
  },




})
