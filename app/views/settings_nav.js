import React, { Component } from "react"
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
  TouchableHighlight,
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





const REFRESH_VIEW_HEIGHT = 80;


export default class SettingsNav extends Component {

  

  render(){
    return (
        
    null
         
            
         
    )
  }

  renderModal(){
      return(
          null
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    alignItems:'center',
    
  },

  
  header:{
    width:"100%",
    height:80,
    backgroundColor:Colors.primary,
  }, 
  
  homeScreenContent:{
    marginTop:Margin.xxlargeMargin*1.5,
  },

  buttonContainer:{
    marginVertical:Margin.largeMargin,
    backgroundColor:Colors.primaryLight,
    paddingVertical:Padding.largePadding,
    borderRadius:Sizes.mediumBorderRadius,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  buttonText:{
      textAlign:'center',
      color:'white',
      fontSize:Fonts.largeFontSize,
      fontFamily:Fonts.systemBoldFont,
  },

  settingsContainer:{
    width:75,
    height:75,
    backgroundColor:"#C4C4C4",
    position:'absolute',
    left:20,
    bottom:10,
    top:750,
    zIndex:5,
    borderRadius:Sizes.mediumBorderRadius,
    justifyContent:'center',
    alignItems:'center',
  },

  bottomView:{
    zIndex:4,
  },



})

