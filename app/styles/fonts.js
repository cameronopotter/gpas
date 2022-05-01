import {
  Dimensions,
} from "react-native"



var {height, width} = Dimensions.get("window")

var isTablet = (width > 450)

// Types
export const systemFont = "Lato_400Regular"
export const systemBoldFont = "AppleSDGothicNeo-Bold";
export const systemLightFont = "Lato_300Light"
export const systemItalicFont = "Lato_400Regular_Italic"

// Sizes
export const xsmallFontSize =   isTablet ? 14 : 12
export const smallFontSize =    isTablet ? 16 : 14
export const mediumFontSize =   isTablet ? 20 : 16
export const largeFontSize =    isTablet ? 24 : 20
export const xlargeFontSize =   isTablet ? 36 : 30
export const xxlargeFontSize =  isTablet ? 44 : 36

// Static Sizes
export const staticSizes = {
  xsmallFontSize:  12,
  smallFontSize:   14,
  mediumFontSize:  16,
  largeFontSize:   20,
  xlargeFontSize:  30,
  xxlargeFontSize: 36,
}

// Line Height
export const lineHeightScalingFactor = 1.6


export const smallLineHeightScaling = 1.2
export const mediumLineHeightScaling = 1.4
export const largeLineHeightScaling = 1.4
