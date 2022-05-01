
// Brand Colors
export const brandColor = "#18BC9C"

export const primary = "#1A4AA7"
export const primaryLight = "#9EBFFF"
export const success = "#18BC9C"
export const successLight = "#c7EFE6"
export const info = "#3498DB"
export const infoLight = "#CAE7F8"
export const infoLighter = "#E4F3FB"
export const warning = "#FFCB0B"
export const warningLight = "#FCF7D7"
export const warningAlphaDark = "#806505"
export const danger = "#E74C3C"
export const dangerLight = "#F9D2CE"
export const dangerAlphaLight = "#390C14"
export const brandDefault = "#95A5A6"
export const defaultLight = "#ccd6fc"

export const borderColor = "#ECECEC"
export const backgroundColor = "#F5FAFD"


// Text Colors
export const textNormal = "#2C3E50"
export const text80 = "#566573"
export const textMid = "#8590A3"
export const textLight = "#98A1AA"
export const textFaded = "#CBD0D4"
export const textWhite = "#FFFFFF"


export const white = "#FFFFFF"
export const black = "#000000"




export function shadeColor(color, percent) {
  // Negative means darker
  // Positive means lighter
  var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
  return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

export const convertHexToRGBA = (hexCode, opacity = 1) => {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
      hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity})`;
};
