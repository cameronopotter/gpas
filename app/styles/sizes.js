import {
    Dimensions,
    StatusBar
  } from "react-native"
  
  
  var {height, width} = Dimensions.get("window")
  export const WINDOW_HEIGHT = height
  export const WINDOW_WIDTH = width
  
  export const isTablet = (width > 450)
  
  //Status Bar
  import Constants from "expo-constants"
  export const statusBarHeight = Constants.statusBarHeight
  
  
  //Header
  export const headerHeight = (isTablet? 64 : 44) + statusBarHeight
  export const homeIndicatorHeight = 34
  
  export const footerHeight = (isTablet ? 120 : 80) + homeIndicatorHeight;
  
  
  // Icons
  export const xxsmallIconSize =  isTablet ? 8 : 4
  export const xsmallIconSize =   isTablet ? 12 : 8
  export const smallIconSize =    isTablet ? 16 : 12
  export const mediumIconSize =   isTablet ? 18 : 16
  export const largeIconSize =    isTablet ? 24 : 18
  export const xlargeIconSize =   isTablet ? 32 : 24
  export const xxlargeIconSize =  isTablet ? 40 : 32
  
  
  // Oval Button
  export const smallOvalButtonHeight = isTablet ? 66 : 44
  
  //theme circle
  export const themeCircleSmall = isTablet ? 12 : 8
  export const themeCircleLarge = isTablet ? 16 : 12
  
  // Circle Button
  export const xxsmallCircleButtonSize =  isTablet ? 24 : 16
  export const xsmallCircleButtonSize =   isTablet ? 32 : 24
  export const smallCircleButtonSize =    isTablet ? 48 : 32
  export const mediumCircleButtonSize =   isTablet ? 64 : 48
  export const largeCircleButtonSize =    isTablet ? 96 : 64
  export const xlargeCircleButtonSize =   isTablet ? 112 : 84
  
  // Border Radius
  export const xxsmallBorderRadius =      isTablet ? 4 : 2
  export const xsmallBorderRadius =       isTablet ? 8 : 4
  export const smallBorderRadius =        isTablet ? 16 : 8
  export const mediumBorderRadius =       isTablet ? 24 : 16
  export const largeBorderRadius =        isTablet ? 32 : 24
  export const xlargeBorderRadius =       isTablet ? 48 : 32
  export const xxlargeBorderRadius =      isTablet ? 64 : 48
  