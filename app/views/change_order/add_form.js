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
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Switch,
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
import firebase from 'firebase/compat/app';
import { addForm, getForms} from "app/classes/griffin_api.js"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Header from 'views/shared/header.js'





const REFRESH_VIEW_HEIGHT = 80;


export default class AddForm extends Component {

    state = {
        currentCustomerName: null,
        currentAddress: null,
        currentCity: null,
        currentState: null,
        currentZip: null,
        currentHomeTel: null,
        currentOfficeTel: null,
        currentContractNumber: null,
        currentDeletions: null,

        scrollY: new Animated.Value(0),
      }

  render(){
    return (

      <View style={styles.container}>
      <Header style={{marginTop:-40}}/>
        <View style={{position:'absolute',top:110,}}>
          <Text style={{fontFamily:Fonts.systemBoldFont, fontSize:Fonts.xlargeFontSize,textAlign:'center', color:Colors.primary,justifyContent:'center'}}>Add Form</Text>
        </View>
      <ScrollView
        style={{marginTop:80, height:Sizes.WINDOW_HEIGHT-Sizes.footerHeight-Sizes.headerHeight/2}}
        contentContainerStyle={{marginBottom:100}}
        scrollEventThrottle={16}
        onScroll={this._onScroll}
        showsVerticalScrollIndicator={false}
      >
      <View style={{paddingBottom:200}}>
        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Customer Name"}
          style={styles.inputText}
          defaultValue={this.state.currentCustomerName}
          onChangeText={(name) => {
            this.setState({currentCustomerName:name})
          }}

          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Address"}
          style={styles.inputText}
          defaultValue={this.state.currentAddress}
          onChangeText={(name) => {
            this.setState({currentAddress:name})
          }}

          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"City"}
          style={styles.inputText}
          defaultValue={this.state.currentCity}
          onChangeText={(name) => {
            this.setState({currentCity:name})
          }}

          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"State"}
          style={styles.inputText}
          defaultValue={this.state.currentState}
          onChangeText={(name) => {
            this.setState({currentState:name})
          }}

          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Zip"}
          style={styles.inputText}
          defaultValue={this.state.currentZip}
          onChangeText={(name) => {
            this.setState({currentZip:name})
          }}

          />
        </View>



        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Home Telephone"}
          style={styles.inputText}
          defaultValue={this.state.currentHomeTel}
          onChangeText={(name) => {
            this.setState({currentHomeTel:name})
          }}

          />
        </View>



        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Office Telephone"}
          style={styles.inputText}
          defaultValue={this.state.currentOfficeTel}
          onChangeText={(name) => {
            this.setState({currentOfficeTel:name})
          }}

          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Contract Number"}
          style={styles.inputText}
          defaultValue={this.state.currentContractNumber}
          onChangeText={(name) => {
            this.setState({currentContractNumber:name})
          }}

          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Deletions"}
          style={styles.inputText}
          defaultValue={this.state.currentDeletions}
          onChangeText={(name) => {
            this.setState({currentDeletions:name})
          }}

          />
        </View>





        </View>
        </ScrollView>

        <View style={[styles.saveBackContainer, {backgroundColor:Colors.primaryLight}]}>
            <View style={styles.saveButton}>
               <TouchableHighlight
                 style={[styles.saveContainer, {backgroundColor: Colors.primary}]}
                 underlayColor={Colors.convertHexToRGBA(Colors.primary, .95)}
                 onPress={() => {
                  addForm({
                  customerName:this.state.currentCustomerName ?this.state.currentCustomerName : null,
                  address:this.state.currentAddress ? this.state.currentAddress : null,
                  city:this.state.currentCity ? this.state.currentCity : null,
                  state:this.state.currentState ? this.state.currentState : null,
                  zip:this.state.currentZip ? this.state.currentZip : null,
                  homeTel:this.state.currentHomeTel ? this.state.currentHomeTel : null,
                  officeTel:this.state.currentOfficeTel ? this.state.currentOfficeTel : null,
                  contractNumber:this.state.currentContractNumber ? this.state.currentContractNumber : null,
                  deletions:this.state.currentDeletions ? this.state.currentDeletions : null,
                 }, this.props.navigation.goBack())
               }
              }
               >
                 <View style={styles.saveChangesContent}>
                   <Text style={styles.saveText}>Save Changes</Text>
                 </View>
               </TouchableHighlight>
            </View>
            </View>
      </View>

    )
  }

  _onScroll = Animated.event([{nativeEvent: {contentOffset: {y:this.state.scrollY}}}],
    {useNativeDriver:false})
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',


  },

  inputText:{
    fontSize:Fonts.largeFontSize,
    textAlign:'center'
  },

  inputContainer:{
    marginTop:Margin.mediumMargin,
    borderWidth:2,
    borderColor:Colors.primaryLight,
    paddingHorizontal:Padding.largePadding,
    paddingVertical:Padding.smallPadding,
    borderRadius:Sizes.smallBorderRadius,
  },
  saveBackContainer:{

    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',

  },

  saveButton:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal:Padding.mediumPadding,
    paddingTop:Padding.mediumPadding,
    paddingBottom:Padding.mediumPadding+Sizes.homeIndicatorHeight,
    marginBottom:Margin.mediumMargin
  },

  saveChangesContent:{
    flex:1,
    alignItems:"center",
    paddingVertical: Padding.mediumPadding,
  },

  saveText:{
    fontFamily:Fonts.systemBoldFont,
    fontSize:Fonts.largeFontSize,
    color:"white",
  },

  saveContainer:{
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.smallBorderRadius,
    alignSelf: 'center',
  },




})
