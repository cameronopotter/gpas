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
  console.log(props.customers)
  const list = props.customers;
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
      { header: 'Id', key: 'id', width: 5 },
      { header: 'Customer Name', key: 'customerName', width: 28 },
      { header: 'Contract Number', key: 'contractNumber', width:28},
      { header: 'Dig Date', key: 'digDate', width: 18, },
      { header: 'Liner/Shell Install Date', key: 'linerInstallDate', width: 28, },
      { header: 'Middle Payment', key: 'middlePaymentCollected', width: 28, },
      { header: 'Backfill Date', key: 'backfillDate', width: 20, },
      { header: 'Deck Layout', key: 'deckLayoutCompleted', width: 20, },
      { header: 'Concrete Date', key: 'concretePourDate', width: 28, },
    ];
    // Add some test data
    for(let index = 0; index < list.length; ++index){
      worksheet.addRow({ id: index+1 , customerName: list[index].customerName, contractNumber: list[index].contractNumber,
          digDate:list[index].digDate,
            linerInstallDate:list[index].linerInstallDate, middlePaymentCollected:list[index].middlePaymentCollected,
              backfillDate:list[index].backfillDate, deckLayoutCompleted:list[index].deckLayoutCompleted,
                concretePourDate:list[index].concretePourDate, });

    }


    // Test styling

    // Style first row
    worksheet.getRow(1).font = {
      name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true
    };
    // Style second column
    worksheet.eachRow((row, rowNumber) => {

    });

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

export default function GenerateExcel(props) {

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
