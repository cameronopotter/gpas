import {
    Dimensions,
  } from "react-native"
  
  var {height, width} = Dimensions.get("window")
  
  var isTablet = (width > 450)
  
  export const xxsmallPadding =   isTablet ? 4 : 2
  export const xsmallPadding =    isTablet ? 8 : 4
  export const smallPadding =     isTablet ? 16 : 8
  export const mediumPadding =    isTablet ? 24 : 16
  export const largePadding =     isTablet ? 32 : 24
  export const xlargePadding =    isTablet ? 48 : 32
  export const xxlargePadding =   isTablet ? 64 : 48
  
  // Static Sizes
  export const staticSizes = {
    xxsmallPadding:2,
    xsmallPadding:4,
    smallPadding:8,
    mediumPadding:16,
    largePadding:24,
    xlargePadding:32,
    xxlargePadding:48,
  }
  