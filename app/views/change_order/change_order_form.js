import React, { Component } from "react"
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import {Ionicons} from "@expo/vector-icons";
// Required to save to cache
// ExcelJS
// Share excel via share dialog
// From @types/node/buffer

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
import { addChangeOrderForm, getForms} from "app/classes/griffin_api.js"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Header from 'views/shared/header.js'
import FormDetail from 'views/change_order/form_detail.js'
import AddForm from 'views/change_order/add_form.js'

const REFRESH_VIEW_HEIGHT = 80;

const ref = firebase.firestore().collection("ChangeOrderForms")



export default class ChangeOrderForm extends Component {

  state = {
    formList: [],
    currentForm: null,
    loading:false,
    isFetching:false,
    searchInput:"",
    isSearchingByName:true,
    allCustomers:{},
    forms:{},
    setFormList:() => {},
    scrollY: new Animated.Value(0),
  }

  onRefresh() {
    this.setState({isFetching: true,},() => {this.getForms();});
  }


  getForms() {

    this.setState({loading:true});
    firebase.firestore().collection("ChangeOrderForms").get().then(() => {
      ref.onSnapshot((querySnapshot) => {
        const items=[];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
         this.setState({forms: items, allCustomers:items});
         doc.ref.update({id:doc.id})
        });

        this.setState({loading:false, isFetching:false,});
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
      onPress={()=>this.props.navigation.navigate("FormDetail", {item:item, index:index})}
      underlayColor={"transparent"}
      >
        <View style={styles.rowButtonStyle}>
          <Text style={{color:Colors.primary,marginLeft:Margin.mediumMargin, fontFamily:Fonts.systemBoldFont, fontSize:Fonts.largeFontSize}}>{item.customerName}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  onFormAdded = (customer) => {

  }

  onFormReceived = (formList) => {
    this.setState(prevState => ({
      formList: prevState.formList = formList
    }));
  }

  searchForName = (input) => {
    this.setState({searchInput:input})
    if(input == ""){
        console.log("NOTHING");
        this.getForms();
    }

    let data = this.state.allCustomers;
    let searchData = data.filter((item) => {
      return item.customerName.toLowerCase().includes(input.toLowerCase());
    })
    this.setState({forms:searchData})
  }

  searchForAddress = (input) => {
    this.setState({searchInput:input})
    if(input == ""){
        console.log("NOTHING");
        this.getForms();
    }

    let data = this.state.allCustomers;
    let searchData = data.filter((item) => {
      console.log(item)
      return item.address.toLowerCase().includes(input.toLowerCase());
    })
    this.setState({forms:searchData})
  }

  handleKeyPress = (e) => {
    if(e.nativeEvent.key == "Backspace"){

    }
  }




  render(){
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Header/>


          <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:Margin.mediumMargin, marginBottom:Margin.largeMargin, marginHorizontal:Margin.xlargeMargin}}>
            <TouchableHighlight
            onPress={() => {
              this.getForms()
            }}
            underlayColor={"transparent"}
            >

              <View style={styles.buttonContainer}>
                <Text style={styles.buttonTextStyle}>Get Forms</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
            onPress={ () => {
              this.props.navigation.navigate("AddForm")
            }




            }
            underlayColor={"transparent"}
            >
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonTextStyle}>Add Form</Text>
              </View>
            </TouchableHighlight>

            </View>

            <View style={{justifyContent:"space-between", marginBottom:Margin.largeMargin, marginHorizontal:Margin.largeMargin, alignItems:"center", flexDirection:"row", }}>
              <View style={{justifyContent:"center",  paddingHorizontal:Padding.xlargePadding*2,paddingVertical:Padding.smallPadding, alignItems:"center", borderWidth:2, borderRadius:Sizes.smallBorderRadius,borderColor:Colors.convertHexToRGBA(Colors.primary, .3)}}>
                <TextInput
                  placeholder= {this.state.isSearchingByName ? "Search Name" : "Search Address"}
                  onChangeText={(input) => {
                    this.state.isSearchingByName ? this.searchForName(input) : this.searchForAddress(input)
                  }}
                  onKeyPress={(e) => this.handleKeyPress(e)}
                />


              </View>
              <TouchableHighlight
                onPress={() => {
                  this.setState({isSearchingByName:!this.state.isSearchingByName})
                }}
                underlayColor={"transparent"}
              >
                <View style={{textAlign:"center", paddingVertical:Padding.smallPadding+2, paddingHorizontal:Padding.mediumPadding, backgroundColor:Colors.primaryLight, borderRadius:Sizes.mediumBorderRadius}}>
                  <Text style={{fontFamily:Fonts.systemBoldFont, color:"#fff", fontSize:Fonts.mediumFontSize}}>{this.state.isSearchingByName ? "Name" : "Address"}</Text>
                </View>
              </TouchableHighlight>

            </View>



          <Animated.FlatList
          data={this.state.forms}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => this.renderItem(item, index)}
          onScroll={this._onScroll}

        />



        </View>





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
