import {
    Dimensions,
  } from "react-native"
  
  var {height, width} = Dimensions.get("window")
  
  var isTablet = (width > 450)
  
  export const xxsmallMargin =  isTablet ? 4 : 2
  export const xsmallMargin =   isTablet ? 8 : 4
  export const smallMargin =    isTablet ? 16 : 8
  export const mediumMargin =   isTablet ? 24 : 16
  export const largeMargin =    isTablet ? 32 : 24
  export const xlargeMargin =   isTablet ? 48 : 32
  export const xxlargeMargin =  isTablet ? 64 : 48
  