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
import { addCustomer, getCustomers} from "app/classes/griffin_api.js"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Header from 'views/shared/header.js'





const REFRESH_VIEW_HEIGHT = 80;


export default class AddCustomer extends Component {

    state = {
        currentCustomerName: null,
        currentBackfillDate: null,
        currentAddress:null,
        currentConcretePourDate: null,
        currentContractDate: null,
        currentContractNumber: null,
        currentDeckLayoutCompleted: null,
        currentDigDate: null,
        currentElectricalCompleted: null,
        currentFinanceName: null,
        currentLinerInstallDate: null,
        currentMiddlePaymentCollected: null,
        currentPoolLayoutApprovalDate: null,
        currentDepositAmount:null,
        currentTotalContractValue:null,
        currentFinalAmountTotal:null,

        scrollY: new Animated.Value(0),
      }

  render(){
    return (

      <View style={styles.container}>
      <Header style={{marginTop:-40}}/>
        <View style={{position:'absolute',top:110,}}>
          <Text style={{fontFamily:Fonts.systemBoldFont, fontSize:Fonts.xlargeFontSize,textAlign:'center', color:Colors.primary,justifyContent:'center'}}>Add Customer</Text>
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
          placeholder={"Customer Address"}
          style={styles.inputText}
          defaultValue={this.state.currentAddress}
          onChangeText={(name) => {
            this.setState({currentAddress:name})
          }}

          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Backfill Date"}
          style={styles.inputText}
          defaultValue={this.state.currentBackfillDate}
          onChangeText={(name) => {
            this.setState({currentBackfillDate:name})
          }}

          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Concrete Pour Date"}
          style={styles.inputText}
          defaultValue={this.state.currentConcretePourDate}
          onChangeText={(name) => {
            this.setState({currentConcretePourDate:name})
          }}

          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Contract Date"}
          style={styles.inputText}
          defaultValue={this.state.currentContractDate}
          onChangeText={(name) => {
            this.setState({currentContractDate:name})
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

        <View style={[styles.inputContainer, {flexDirection:'row',justifyContent:'center', alignItems:'flex-end'}]}>
          <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
            <Text style={{alignItems:'center',color:"#bdbdbd", justifyContent:'center', fontSize:Fonts.largeFontSize, paddingHorizontal:Padding.smallPadding}}>Deck Completed</Text>
            <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            shape={"pill"}
            style={{alignItems:'flex-end', marginLeft:'auto'}}
            value={this.state.currentDeckLayoutCompleted}
            onValueChange={(name) => {
              this.setState({currentDeckLayoutCompleted:name})
            }}

            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Dig Date"}
          style={styles.inputText}
          defaultValue={this.state.currentDigDate}
          onChangeText={(name) => {
            this.setState({currentDigDate:name})
          }}

          />
        </View>

        <View style={[styles.inputContainer, {flexDirection:'row',justifyContent:'center', alignItems:'flex-end'}]}>
          <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
            <Text style={{alignItems:'center',color:"#bdbdbd", justifyContent:'center', fontSize:Fonts.largeFontSize, paddingHorizontal:Padding.smallPadding}}>Electrical Completed</Text>
            <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            shape={"pill"}
            style={{alignItems:'flex-end', marginLeft:'auto'}}
            value={this.state.currentElectricalCompleted}
            onValueChange={(name) => {
              this.setState({currentElectricalCompleted:name})
            }}

            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Finance Name"}
          style={styles.inputText}
          defaultValue={this.state.currentFinanceName}
          onChangeText={(name) => {
            this.setState({currentFinanceName:name})
          }}

          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Liner Install Date"}
          style={styles.inputText}
          defaultValue={this.state.currentLinerInstallDate}
          onChangeText={(name) => {
            this.setState({currentLinerInstallDate:name})
          }}

          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Middle Payment Date"}
          style={styles.inputText}
          defaultValue={this.state.currentMiddlePaymentCollected}
          onChangeText={(name) => {
            this.setState({currentMiddlePaymentCollected:name})
          }}

          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Pool Approval Date"}
          style={styles.inputText}
          defaultValue={this.state.currentPoolLayoutApprovalDate}
          onChangeText={(name) => {
            this.setState({currentPoolLayoutApprovalDate:name})
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
                  addCustomer({
                  customerName:this.state.currentCustomerName ?this.state.currentCustomerName : null,
                  contractNumber:this.state.currentContractNumber ?this.state.currentContractNumber : null,
                  backfillDate:this.state.currentBackfillDate ? this.state.currentBackfillDate : null,
                  concretePourDate:this.state.currentConcretePourDate ?this.state.currentConcretePourDate : null,
                  contractDate:this.state.currentContractDate ? this.state.currentContractDate : null,
                  deckLayoutCompleted:this.state.currentDeckLayoutCompleted ? this.state.currentDeckLayoutCompleted: null,
                  digDate:this.state.currentDigDate ?this.state.currentDigDate : null,
                  electricalCompleted:this.state.currentElectricalCompleted ? this.state.currentElectricalCompleted:null,
                  financeName:this.state.currentFinanceName ? this.state.currentFinanceName : null,
                  linerInstallDate:this.state.currentLinerInstallDate ?this.state.currentLinerInstallDate:null ,
                  middlePaymentCollected:this.state.currentMiddlePaymentCollected ? this.state.currentMiddlePaymentCollected: null,
                  poolLayoutApprovalDate:this.state.poolLayoutApprovalDate ? this.state.poolLayoutApprovalDate : null,
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
    paddingHorizontal:Padding.smallPadding,
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
