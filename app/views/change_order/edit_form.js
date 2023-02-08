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


export default class EditForm extends Component {

    state = {
        currentCustomerName: null,
        currentCustomerBalance: null,
        currentStumpRemoval:null,
        currentGravel:null,
        currentDirtRemoval:null,
        currentConcretePumpCharge:null,
        currentFillDirt:null,
        currentMisc:null,
        currentAdjustedAmt:null,
        currentDeletions: null,

        scrollY: new Animated.Value(0),
      }

  render(){
    const item= this.props.route.params.item
    const index = this.props.route.params.index
    const docRef = firebase.firestore().collection("ChangeOrderForms").doc(item.id).get()
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
          defaultValue={null}
          onChangeText={(name) => {
            this.setState({currentCustomerName:name})
          }}

          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Current Balance"}
          style={styles.inputText}
          defaultValue={null}
          onChangeText={(name) => {
            this.setState({currentCustomerBalance:name})
          }}

          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Stump Removal"}
          style={styles.inputText}
          defaultValue={null}
          onChangeText={(name) => {
            this.setState({currentStumpRemoval:name})
          }}

          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Gravel"}
          style={styles.inputText}
          defaultValue={null}
          onChangeText={(name) => {
            this.setState({currentGravel:name})
          }}

          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Dirt Removal"}
          style={styles.inputText}
          defaultValue={null}
          onChangeText={(name) => {
            this.setState({currentDirtRemoval:name})
          }}

          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Concrete Pump Charge"}
          style={styles.inputText}
          defaultValue={null}
          onChangeText={(name) => {
            this.setState({currentConcretePumpCharge:name})
          }}

          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Fill Dirt"}
          style={styles.inputText}
          defaultValue={null}
          onChangeText={(name) => {
            this.setState({currentFillDirt:name})
          }}

          />
        </View>







        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Deletions"}
          style={styles.inputText}
          defaultValue={null}
          onChangeText={(name) => {
            this.setState({currentDeletions:name})
          }}

          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Misc"}
          style={styles.inputText}
          defaultValue={null}
          onChangeText={(name) => {
            this.setState({currentMisc:name})
          }}

          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
          placeholder={"Total Adjusted Amount"}
          style={styles.inputText}
          defaultValue={null}
          onChangeText={(name) => {
            this.setState({currentAdjustedAmt:name})
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
                  firebase.firestore().collection("ChangeOrderForms").doc(item.id).delete().then(()=>{
                       console.log("successfully deleted! ")})
                       .catch((error)=>{
                           console.log("Error removing document:", error)
                       }).then(() => {addForm({
                  customerName:this.state.currentCustomerName ?this.state.currentCustomerName : null,
                  currentBalance:this.state.currentCustomerBalance ? this.state.currentCustomerBalance : null,
                  stumpRemoval:this.state.currentStumpRemoval ? this.state.currentStumpRemoval : null,
                  gravel:this.state.currentGravel ? this.state.currentGravel : null,
                  dirtRemoval:this.state.currentDirtRemoval ? this.state.currentDirtRemoval : null,
                  concretePumpCharge:this.state.currentConcretePumpCharge ? this.state.currentConcretePumpCharge : null,
                  fillDirt:this.state.currentFillDirt ? this.state.currentFillDirt : null,
                  deletions:this.state.currentDeletions ? this.state.currentDeletions : null,
                  misc:this.state.currentMisc ? this.state.currentMisc : null,
                  totalAdjustedAmount:this.state.currentAdjustedAmt ? this.state.currentAdjustedAmt : null,
                }, this.props.navigation.navigate("ChangeOrderForm"))})
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
