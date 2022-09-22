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


export default class FormPreview extends Component {

    state = {
        scrollY: new Animated.Value(0),
        screenCapture: '',
    }




    render(){
    const item= this.props.route.params.item
    const index = this.props.route.params.index
    const docRef = firebase.firestore().collection("ChangeOrderForms").doc(item.id).get()
    return (


        <View style={{}}>

            <Header style={{marginTop:-30}}/>
            <View style={{justifyContent:"center", alignItems:"center"}}>
              <Image source ={GriffinPoolsLogo} style={styles.imageStyle}/>
            </View>
            <View style={{alignItems:"center", marginTop:-Margin.smallMargin}}>
              <Text style={{fontFamily:Fonts.systemBoldFont, fontSize:Fonts.xlargeFontSize, textDecorationLine:"underline"}}>Change Order Form</Text>
            </View>

            <View style={{flexDirection:"row", paddingTop:Padding.largePadding, marginLeft:Margin.mediumMargin, justifyContent:"flex-start"}}>
              <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", color:Colors.text80, marginRight:Margin.smallMargin,fontSize:Fonts.largeFontSize}}>CUSTOMER NAME:</Text>
              <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", fontSize:Fonts.largeFontSize, textDecorationLine:"underline"}}>{item.customerName}</Text>
            </View>

            <View style={{flexDirection:"row", paddingTop:Padding.mediumPadding, marginLeft:Margin.mediumMargin, justifyContent:"flex-start"}}>
              <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", color:Colors.text80, marginRight:Margin.smallMargin,fontSize:Fonts.largeFontSize}}>CURRENT BALANCE:</Text>
              <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", fontSize:Fonts.largeFontSize, textDecorationLine:"underline"}}>${item.currentBalance}</Text>
            </View>

            <View style={{flexDirection:"column", paddingTop:Padding.mediumPadding, marginLeft:Margin.mediumMargin, justifyContent:"flex-start"}}>
              <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", color:Colors.text80, marginRight:Margin.smallMargin,fontSize:Fonts.largeFontSize}}>ADDITIONS</Text>
              <View style={{flexDirection:"column"}}>
                <View style={{flexDirection:"row", marginLeft:Margin.mediumMargin,marginTop: Margin.mediumMargin,justifyContent:"flex-start"}}>
                  <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", color:Colors.text80, marginRight:Margin.smallMargin,fontSize:Fonts.largeFontSize}}>STUMP REMOVAL:</Text>
                  <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", fontSize:Fonts.largeFontSize, textDecorationLine:"underline"}}>{item.stumpRemoval ? "Yes" : "No" }</Text>
                </View>

                <View style={{flexDirection:"row", marginLeft:Margin.mediumMargin,marginTop: Margin.mediumMargin,justifyContent:"flex-start"}}>
                  <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", color:Colors.text80, marginRight:Margin.smallMargin,fontSize:Fonts.largeFontSize}}>GRAVEL:</Text>
                  <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", fontSize:Fonts.largeFontSize, textDecorationLine:"underline"}}>{item.gravel ? "Yes" : "No" }</Text>
                </View>

                <View style={{flexDirection:"row", marginLeft:Margin.mediumMargin,marginTop: Margin.mediumMargin,justifyContent:"flex-start"}}>
                  <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", color:Colors.text80, marginRight:Margin.smallMargin,fontSize:Fonts.largeFontSize}}>DIRT REMOVAL:</Text>
                  <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", fontSize:Fonts.largeFontSize, textDecorationLine:"underline"}}>{item.dirtRemoval ? "Yes" : "No" }</Text>
                </View>

                <View style={{flexDirection:"row", marginLeft:Margin.mediumMargin,marginTop: Margin.mediumMargin,justifyContent:"flex-start"}}>
                  <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", color:Colors.text80, marginRight:Margin.smallMargin,fontSize:Fonts.largeFontSize}}>CONCRETE PUMP CHARGE:</Text>
                  <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", fontSize:Fonts.largeFontSize, textDecorationLine:"underline"}}>{item.stumpRemoval ? "Yes" : "No" }</Text>
                </View>

                <View style={{flexDirection:"row", marginLeft:Margin.mediumMargin,marginTop: Margin.mediumMargin,justifyContent:"flex-start"}}>
                  <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", color:Colors.text80, marginRight:Margin.smallMargin,fontSize:Fonts.largeFontSize}}>FILL DIRT:</Text>
                  <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", fontSize:Fonts.largeFontSize, textDecorationLine:"underline"}}>{item.stumpRemoval ? "Yes" : "No" }</Text>
                </View>
              </View>
              <View style={{flexDirection:"row", marginTop: Margin.mediumMargin,justifyContent:"flex-start"}}>
                <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", color:Colors.text80, marginRight:Margin.smallMargin,fontSize:Fonts.largeFontSize}}>DELETIONS:</Text>
                <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", fontSize:Fonts.largeFontSize, textDecorationLine:"underline"}}>{item.deletions ? item.deletions : "__________________________________"}</Text>
              </View>

              <View style={{flexDirection:"row", marginTop: Margin.mediumMargin,justifyContent:"flex-start"}}>
                <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", color:Colors.text80, marginRight:Margin.smallMargin,fontSize:Fonts.largeFontSize}}>TOTAL ADJUSTED AMOUNT:</Text>
                <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", fontSize:Fonts.largeFontSize, textDecorationLine:"underline"}}>{"______________"}</Text>
              </View>

              <View style={{flexDirection:"row", marginTop: Margin.mediumMargin,justifyContent:"flex-start"}}>
                <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", color:Colors.text80, marginRight:Margin.smallMargin,fontSize:Fonts.largeFontSize}}>CUSTOMER APPROVAL:</Text>
                <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", fontSize:Fonts.largeFontSize, textDecorationLine:"underline"}}>{"__________________"}</Text>
              </View>

              <View style={{flexDirection:"row", marginTop: Margin.mediumMargin,justifyContent:"flex-start"}}>
                <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", color:Colors.text80, marginRight:Margin.smallMargin,fontSize:Fonts.largeFontSize}}>GRIFFIN APPROVAL:</Text>
                <Text style={{fontFamily:Fonts.systemBoldFont, textAlign:"left", fontSize:Fonts.largeFontSize, textDecorationLine:"underline"}}>{"_______________________"}</Text>
              </View>



            </View>
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

    imageStyle:{
      width: 200,
      height: 180,
      resizeMode:"contain",
      zIndex:5,

    },





})
