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
import { addForm, getForms, delForm} from "app/classes/griffin_api.js"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';




const REFRESH_VIEW_HEIGHT = 80;


export default class FormDetail extends Component {

    state = {
        scrollY: new Animated.Value(0),
    }


    render(){
    const item= this.props.route.params.item
    const index = this.props.route.params.index
    const docRef = firebase.firestore().collection("ChangeOrderForms").doc(item.id).get()
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
                    <Text style={styles.keyTextStyle}>Address: </Text>
                    <Text style={styles.valueTextStyle}>{item.address ? item.address: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>City: </Text>
                    <Text style={styles.valueTextStyle}>{item.city ? item.city: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>State: </Text>
                    <Text style={styles.valueTextStyle}>{item.state ? item.state: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>Zip: </Text>
                    <Text style={styles.valueTextStyle}>{item.zip ? item.zip: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>Home Telephone: </Text>
                    <Text style={styles.valueTextStyle}>{item.homeTel ? item.homeTel: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>Office Telephone: </Text>
                    <Text style={styles.valueTextStyle}>{item.officeTel ? item.officeTel: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>Contract Number: </Text>
                    <Text style={styles.valueTextStyle}>{item.contractNumber ? item.contractNumber: "Empty Field"}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Text style={styles.keyTextStyle}>Deletions: </Text>
                    <Text style={styles.valueTextStyle}>{item.deletions ? item.deletions: "Empty Field"}</Text>
                </View>










            </View>


            <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => {
                firebase.firestore().collection("ChangeOrderForms").doc(item.id).delete().then(()=>{
                    this.props.navigation.navigate("Homescreen")
                    console.log("successfully deleted! ")})
                    .catch((error)=>{
                        console.log("Error removing document:", error)
                    })
            }}
            >
                <View style={styles.deleteButtonContainer}>
                    <Text style={{fontFamily:Fonts.systemBoldFont, fontSize:Fonts.mediumFontSize}}>Delete Form</Text>
                </View>
            </TouchableHighlight>

            <View style={{width:20}}></View>

            <TouchableHighlight
            onPress={()=>this.props.navigation.navigate("FormPreview", {item:item, index:index})}
            underlayColor={"transparent"}
            >
              <View style={[styles.deleteButtonContainer,{justifyContent:"center", alignItems:"center", backgroundColor:Colors.brandDefault}]}>
                <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"center",fontSize:Fonts.mediumFontSize}}>Print Preview</Text>
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
