import React, { Component } from "react"
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {Ionicons} from "@expo/vector-icons";
// Required to save to cache
import * as FileSystem from 'expo-file-system';
// ExcelJS
import ExcelJS from 'exceljs';
// Share excel via share dialog
import * as Sharing from 'expo-sharing';
// From @types/node/buffer
import { Buffer as NodeBuffer } from 'buffer';

import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableHighlight,
  Modal,
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
import { addCustomer, getCustomers} from "app/classes/griffin_api.js"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Header from 'views/shared/header.js'
import CustomerDetail from 'views/customer_information/customer_detail.js'
import GenerateExcel from 'functions/generate_excel.js'
import AddCustomer from 'views/customer_information/add_customer.js'

const REFRESH_VIEW_HEIGHT = 80;

const ref = firebase.firestore().collection("Customers")



export default class CustomerDates extends Component {

  state = {
    customerList: [],
    currentCustomer: null,
    loading:false,
    isFetching:false,
    customers:{},
    setCustomerList:() => {},
    scrollY: new Animated.Value(0),
  }


  onRefresh() {
    this.setState({isFetching: true,},() => {this.getCustomers();});
}


  getCustomers() {

    this.setState({loading:true});
    firebase.firestore().collection("Customers").get().then(() => {
      ref.onSnapshot((querySnapshot) => {
        const items=[];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
         this.setState({customers: items});
         doc.ref.update({id:doc.id})
        });

        this.setState({loading:false, isFetching:false});
      })

    }

    )


  }

  mapIdToCustomer(customer){


  }


  renderItem(item, index){
    this.mapIdToCustomer(item)
    return(
      <TouchableHighlight
      onPress={()=>this.props.navigation.navigate("CustomerDetail", {item:item, index:index})}
      underlayColor={"transparent"}
      >
        <View style={styles.rowButtonStyle}>
          <Text style={{color:Colors.primary,marginLeft:Margin.mediumMargin, fontFamily:Fonts.systemBoldFont, fontSize:Fonts.largeFontSize}}>{item.customerName}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  onCustomerAdded = (customer) => {

  }

  onCustomerReceived = (customerList) => {
    this.setState(prevState => ({
      customerList: prevState.customerList = customerList
    }));
  }



  render(){
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Header/>


          <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:Margin.mediumMargin, marginBottom:Margin.largeMargin, marginHorizontal:Margin.xlargeMargin}}>
            <TouchableHighlight
            onPress={() => {
              this.getCustomers()
            }}
            underlayColor={"transparent"}
            >

              <View style={styles.buttonContainer}>
                <Text style={styles.buttonTextStyle}>Get Customers</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
            onPress={ () => {
              this.props.navigation.navigate("AddCustomer")
            }




            }
            underlayColor={"transparent"}
            >
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonTextStyle}>Add Customer</Text>
              </View>
            </TouchableHighlight>

            </View>


          <Animated.FlatList
          data={this.state.customers}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => this.renderItem(item, index)}
          onScroll={this._onScroll}

        />



        </View>

        <GenerateExcel customers={this.state.customers}/>




      </SafeAreaView>
    )
  }



  _onScroll = Animated.event([{nativeEvent: {contentOffset: {y:this.state.scrollY}}}],
    {useNativeDriver:false})





}

function arrayFromArgs() {
  var results = [];
  for (var i = 0; i < arguments.length; i++) {
      results.push(arguments[i]);
  }
  return results;
}



const styles = StyleSheet.create({
  container: {
    height:Sizes.WINDOW_HEIGHT-Sizes.homeIndicatorHeight-Sizes.statusBarHeight/2,

  },

  buttonContainer:{
    backgroundColor:Colors.primaryLight,
    paddingHorizontal: Padding.mediumPadding,
    paddingVertical:Padding.mediumPadding,
    borderRadius:Sizes.mediumBorderRadius,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,

  },

  buttonTextStyle:{
    fontFamily:Fonts.systemBoldFont,
    fontSize:Fonts.mediumFontSize,
    color:Colors.white,

  },

  rowButtonStyle:{
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:Colors.defaultLight,
    borderRadius:Sizes.mediumBorderRadius,
    marginHorizontal:Margin.mediumMargin ,
    marginBottom:Margin.mediumMargin,
    paddingVertical:Padding.largePadding
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
