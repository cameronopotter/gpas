import React from 'react';
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
import AddCustomer from 'views/customer_information/add_customer.js'



state = {
  localCustomers:[]
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    height:100,
    width:100,
    alignItems: 'center',
    justifyContent: 'center',

  },
});






// This returns a local uri that can be shared
  const generateShareableExcel = async (props): Promise<string> => {
  console.log("")
  const item = props.item;
  const list = Object.entries(item);
  const now = new Date();
  const fileName = 'CustomerData.xlsx';
  const fileUri = FileSystem.cacheDirectory + fileName;
  return new Promise((resolve, reject) => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Me';
    workbook.created = now;
    workbook.modified = now;
    // Add a sheet to work on
    const worksheet = workbook.addWorksheet('My Sheet', {});
    // Just some columns as used on ExcelJS Readme
    worksheet.columns = [
      { header: 'Field', key: 'desc', width: 58 },
      { header: 'Information', key: 'value', width: 58 },

    ];
    // Add some test data


      worksheet.addRow({id:0, desc:"Customer Name", value:list[findKey(list, "customerName")][1]});
      worksheet.addRow({id:0, desc:"Current Balance", value:list[findKey(list, "currentBalance")][1]});
      worksheet.addRow({id:0, desc:"Stump Removal", value:list[findKey(list, "stumpRemoval")][1]});
      worksheet.addRow({id:0, desc:"Gravel", value:list[findKey(list, "gravel")][1]});
      worksheet.addRow({id:0, desc:"Dirt Removal", value:list[findKey(list, "dirtRemoval")][1]});
      worksheet.addRow({id:0, desc:"Concrete Pump Charge", value:list[findKey(list, "concretePumpCharge")][1]});
      worksheet.addRow({id:0, desc:"Fill Dirt", value:list[findKey(list, "fillDirt")][1]});
      worksheet.addRow({id:0, desc:"Deletions", value:list[findKey(list, "deletions")][1]});
      worksheet.addRow({id:0, desc:"Misc", value:list[findKey(list, "misc")][1]});
      worksheet.addRow({id:0, desc:"Total Adjusted Amount", value:list[findKey(list, "totalAdjustedAmount")][1]});









    // Test styling

    // Style first row
    worksheet.getRow(1).font = {
      name: 'Comic Sans MS', family: 4, size: 36, underline: 'double', bold: true
    };

    for(let index = 2; index < list.length; index++){
    worksheet.getRow(index).font = {
      name: 'Comic Sans MS', family: 4, size: 24,  bold: false
    };
  }

    // Style second column


    // Write to file
    workbook.xlsx.writeBuffer().then((buffer: ExcelJS.Buffer) => {
      // Do this to use base64 encoding
      const nodeBuffer = NodeBuffer.from(buffer);
      const bufferStr = nodeBuffer.toString('base64');
      FileSystem.writeAsStringAsync(fileUri, bufferStr, {
        encoding: FileSystem.EncodingType.Base64
      }).then(() => {
        resolve(fileUri);
      });
    });
  });
}

function findKey(listArray, keyFind){

  for(let index = 0; index<listArray.length; ++index){
    if(listArray[index][0].toString() == keyFind){
      return index;
    }
  }

}


const shareExcel = async (props) => {
  const shareableExcelUri: string = await generateShareableExcel(props);
  Sharing.shareAsync(shareableExcelUri, {
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Android
    dialogTitle: 'Your dialog title here', // Android and Web
    UTI: 'com.microsoft.excel.xlsx' // iOS
  }).catch(error => {
    console.error('Error', error);
  }).then(() => {
    console.log('Return from sharing dialog');
  });
}

export default function GenerateFormExcel(props) {

  return(
    <View style={{width:"100%", height:200, marginTop:-Margin.xxlargeMargin * 2, backgroundColor:Colors.primaryLight}}>
      <TouchableHighlight
      style={{justifyContent:'center', alignItems:'center', marginTop:Margin.mediumMargin}}
      onPress={() => shareExcel(props)}
      underlayColor={"transparent"}
      >
        <Text style={{color:'white', fontSize:Fonts.largeFontSize, fontFamily:Fonts.systemBoldFont, textAlign:'center'}}>Generate Table</Text>
      </TouchableHighlight>
    </View>
  );
}
