import React, { Component } from "react"
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {Ionicons} from "@expo/vector-icons";
import Header from 'views/shared/header.js'


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
import { addCustomer, getCustomers, delCustomer} from "app/classes/griffin_api.js"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Notes from 'views/notes.js'




const REFRESH_VIEW_HEIGHT = 80;


export default class CustomerDetail extends Component {

    state = {
        scrollY: new Animated.Value(0),
    } 


    render(){
    const item= this.props.route.params.item
    const index = this.props.route.params.index
    const docRef = firebase.firestore().collection("Customers").doc(item.id).get()
    return (
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <Header style={{marginTop:-30}}/>
            <Text style={{fontSize:Fonts.largeFontSize*1.2, fontFamily:Fonts.systemBoldFont, marginTop:Margin.mediumMargin, marginBottom:Margin.mediumMargin}}>Customer Information</Text>
            <View style={{marginTop:Margin.mediumMargin}}>
                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>Customer Name: </Text>
                    <Text style={styles.valueTextStyle}>{item.customerName ? item.customerName: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>Contract Number: </Text>
                    <Text style={styles.valueTextStyle}>{item.contractNumber ? item.contractNumber: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>Contract Date: </Text>
                    <Text style={styles.valueTextStyle}>{item.contractDate ? item.contractDate: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>Finance Name: </Text>
                    <Text style={styles.valueTextStyle}>{item.financeName ? item.financeName: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>Pool Layout Approval Date: </Text>
                    <Text style={styles.valueTextStyle}>{item.poolLayoutApprovalDate ? item.poolLayoutApprovalDate: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>Dig Date: </Text>
                    <Text style={styles.valueTextStyle}>{item.digDate ? item.digDate: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>Liner/Shell Install Date: </Text>
                    <Text style={styles.valueTextStyle}>{item.linerInstallDate ? item.linerInstallDate: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>Middle Payment Collected: </Text>
                    <Text style={styles.valueTextStyle}>{item.middlePaymentCollected ? item.middlePaymentCollected: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>Backfill Date: </Text>
                    <Text style={styles.valueTextStyle}>{item.backfillDate ? item.backfillDate: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>Deck Layout Completed: </Text>
                    <Text style={styles.valueTextStyle}>{item.deckLayoutCompleted ? item.deckLayoutCompleted: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>Concrete Pour Date: </Text>
                    <Text style={styles.valueTextStyle}>{item.concretePourDate ? item.concretePourDate: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>Electrical Completed: </Text>
                    <Text style={styles.valueTextStyle}>{item.electricalCompleted ? item.electricalCompleted: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>Deposit Amount: </Text>
                    <Text style={styles.valueTextStyle}>{item.depositAmount ?  `$ ${item.depositAmount}`: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>Total Contract Value: </Text>
                    <Text style={styles.valueTextStyle}>{item.totalContractValue ?  `$ ${item.totalContractValue}`: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>Final Total: </Text>
                    <Text style={styles.valueTextStyle}>{item.finalAmountTotal ? `$ ${item.finalAmountTotal}`: "Empty Field"}</Text>
                </View>

                

                
            

            </View>


            <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => {
                firebase.firestore().collection("Customers").doc(item.id).delete().then(()=>{
                    this.props.navigation.goBack()
                    console.log("successfully deleted! ")})
                    .catch((error)=>{ 
                        console.log("Error removing document:", error)
                    })
            }}
            >               
                <View style={styles.deleteButtonContainer}>
                    <Text style={{fontFamily:Fonts.systemBoldFont, fontSize:Fonts.mediumFontSize}}>Delete Customer</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight 
            underlayColor={'transparent'}
            onPress={() => {
                this.props.navigation.navigate("Notes", {item:item})
            }}
            >
                <View style={styles.notesButtonContainer}>
                    <Text style={{fontFamily:Fonts.systemBoldFont, fontSize:Fonts.mediumFontSize}}>Notes</Text>
                </View>
            </TouchableHighlight>

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

  keyTextStyle:{
      color:'black',
      fontSize:Fonts.largeFontSize,
      paddingBottom:Padding.smallPadding,
      fontFamily:Fonts.systemBoldFont

  },

  valueTextStyle:{
    color:'gray',
    fontSize:Fonts.largeFontSize,
    paddingBottom:Padding.smallPadding,
    fontFamily:Fonts.systemBoldFont

    },

    deleteButtonContainer:{
        justifyContent:'center', 
        alignItems:'center', 
        paddingHorizontal:Padding.smallPadding, 
        borderRadius:Sizes.smallBorderRadius, 
        paddingVertical:Padding.smallPadding,
        marginTop:Margin.mediumMargin, 
        backgroundColor:Colors.danger,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,

    },

    notesButtonContainer:{
        justifyContent:'center', 
        alignItems:'center', 
        paddingHorizontal:Padding.smallPadding, 
        borderRadius:Sizes.smallBorderRadius, 
        paddingVertical:Padding.smallPadding,
        marginTop:Margin.mediumMargin, 
        backgroundColor:"#c4c4c4",
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,

    },
  



})

