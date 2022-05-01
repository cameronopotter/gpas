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





const REFRESH_VIEW_HEIGHT = 80;


export default class Header extends Component {

  render(){
    return (
      <View style={[styles.headerContainer, this.props.style]}>
        <Image source ={GriffinPoolsLogo} style={styles.imageStyle}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems:'center',
    
  },

  headerContainer:{
    height:Sizes.headerHeight+Sizes.statusBarHeight/1.3,
    width:'100%',
    backgroundColor:Colors.primaryLight,
    marginTop:-Sizes.homeIndicatorHeight-Sizes.statusBarHeight,
    justifyContent:'center',
  },

  imageStyle:{
    width: 75, 
    height: 60,
    resizeMode:"contain",
    zIndex:5,
    position:'absolute',
    left:15,
    top:Sizes.homeIndicatorHeight+Sizes.statusBarHeight/1.3,
  },

  



})

