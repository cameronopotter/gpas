// Using a class component, everything works without issue
import React from 'react';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { WebView } from 'react-native-webview';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';


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
// Using a class component, everything works without issue
export const ComponentToPrint = React.forwardRef((props, ref) => {
 return (
   <View ref={ref}><Text>My cool content here!</Text></View>
 );
});

export default function Wrapper() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <View style={{position:"absolute", left:50, top:100}}>
      <ComponentToPrint ref={componentRef} />
      <TouchableHighlight onPress={handlePrint}><Text>Print this out!</Text></TouchableHighlight>
    </View>
  );
};
