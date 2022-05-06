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
  Modal,
  Easing,
  Button,
  Dimensions,
  StatusBar
} from "react-native";

import { Sizes, Colors, Padding, Margin, Fonts } from "app/styles"
import GriffinPoolsLogo from "images/griffin-logo.png"
import { auth } from "views/auth/firebase.js"
import SettingsNav from "views/settings_nav"





const REFRESH_VIEW_HEIGHT = 80;


export default class Homescreen extends Component {

  state={
    isModalVisible:false,
  };

  setModalVisible = (visible) => {
    this.setState({ isModalVisible: visible });
  }

  handleSignOut = () => {
    auth
    .signOut()
    .then(() => {
      this.props.navigation.replace("Login")
    })
  }

  render(){
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={{marginTop:Margin.xxlargeMargin, paddingLeft:Padding.mediumPadding, color:"#FFF", fontFamily:Fonts.systemBoldFont, fontSize:Fonts.mediumFontSize}}>{auth.currentUser.email}</Text>
        </View>
        <View style={styles.homeScreenContent}>
            <Image source = {GriffinPoolsLogo} style={{ width: 255, height: 190, resizeMode:"contain"}}/>
            <View style={styles.buttonContainer}>
                <TouchableHighlight
                underlayColor={"transparent"}
                onPress={()=> this.props.navigation.navigate("CustomerDates")}
                >
                  <View>
                    <Text style={styles.buttonText}>View Customer Dates</Text>
                  </View>
                </TouchableHighlight>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableHighlight
                underlayColor={"transparent"}
                onPress={()=> this.props.navigation.navigate("ChangeOrderForm")}
                >
                  <View>
                    <Text style={styles.buttonText}>Change Order Form</Text>
                  </View>
                </TouchableHighlight>
            </View>



        </View>

        <View style={styles.settingsContainer} >
              <TouchableHighlight onPress={this.handleSignOut} underlayColor={'transparent'}>
                <View>
                  <Ionicons name={'log-out-outline'} size={48} color={'black'}/>
                </View>
              </TouchableHighlight>
        </View>



      </View>
    )
  }

  renderModal = () => {
    const { isModalVisible } = this.state
    return(
      <Modal
        style={styles.modal}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => {this.setModalVisible(!isModalVisible)}}
      >

      </Modal>
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
