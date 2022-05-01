import * as React from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
  Animated,
  RefreshControl,
  ScrollView,
  Easing,
  Button,
  StatusBar
} from "react-native";
import {useSelector} from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Homescreen from "views/homescreen.js";
import CustomerDates from "views/customer_dates.js";
import ChangeOrderForm from "views/change_order_form.js";
import Login from "views/auth/login.js"
import CustomerDetail from 'views/customer_detail.js'
import AddCustomer from 'views/add_customer.js'
import Notes from 'views/notes.js'




const Stack = createStackNavigator();


export default function Router() {

  return (
    <NavigationContainer>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      {mainAppFlow()}
    </NavigationContainer>
  )
}

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
})





function mainAppFlow(){


  return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, cardStyleInterpolator: forFade}} />
        <Stack.Screen name="Homescreen" component={Homescreen} options={{ headerShown: false, cardStyleInterpolator: forFade}} />
        <Stack.Screen name="CustomerDates" component={CustomerDates} options={{ headerShown: false, cardStyleInterpolator: forFade}} />
        <Stack.Screen name="ChangeOrderForm" component={ChangeOrderForm} options={{ headerShown: false, cardStyleInterpolator: forFade}} />
        <Stack.Screen name="CustomerDetail" component={CustomerDetail} options={{ headerShown: false, cardStyleInterpolator: forFade}} />
        <Stack.Screen name="AddCustomer" component={AddCustomer} options={{ headerShown: false, cardStyleInterpolator: forFade}} />
        <Stack.Screen name="Notes" component={Notes} options={{ headerShown: false, cardStyleInterpolator: forFade}} />
      </Stack.Navigator>
  )
}
