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
  SafeAreaView,
  TextInput,
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
import Header from 'views/shared/header.js'




const REFRESH_VIEW_HEIGHT = 80;


export default class Notes extends Component {
 sss   
state = {
    notesText:"",
}

  render(){
    const item= this.props.route.params.item
    return (
    <View style={{height:Sizes.WINDOW_HEIGHT}}>
      <Header style={{marginTop:-40}}/>
      <View style={{justifyContent:'center', alignItems:'center', marginTop:Margin.mediumMargin, marginHorizontal:Margin.xlargeMargin}}>
        <Text style={{fontSize:Fonts.xlargeFontSize, fontFamily:Fonts.systemBoldFont, color:Colors.primary}}>Notes</Text>
        <View style={{height:400, borderWidth:2, borderColor:"#c4c4c4", width:"100%", marginTop:Margin.mediumMargin}}>
            <TextInput
             placeholder={"Notes"}
             style={styles.inputText}
             defaultValue={item.notes}
             onChangeText={(note) => {
             this.setState({notesText:note})
            }}
            />
        </View>
      </View>
      <View style={[styles.saveBackContainer, {backgroundColor:Colors.primaryLight}]}>
            <View style={styles.saveButton}>
               <TouchableHighlight
                 style={[styles.saveContainer, {backgroundColor: Colors.primary}]}
                 underlayColor={Colors.convertHexToRGBA(Colors.primary, .95)}
                 onPress={() => {
                 firebase.firestore().collection("Customers").doc(item.id).update({notes:this.state.notesText}).then(()=>{
                    this.props.navigation.goBack()
                    console.log(item)})
                    .catch((error)=>{ 
                        console.log("Error removing document:", error)
                    })
                }}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems:'center',
    
  },

  inputText:{
    fontSize:Fonts.largeFontSize,
    fontFamily:Fonts.systemBoldFont,
    flexWrap:'wrap'
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

