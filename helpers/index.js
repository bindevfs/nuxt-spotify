export const getDataAfterHashLocation = (list) => {
  return list.reduce(function(obj, str, index) {
    const strParts = str.split("=");
    if (strParts[0] && strParts[1]) {
      obj[strParts[0].replace(/\s+/g, '')] = strParts[1].trim();
    }
    return obj;
  }, {});
}

export const getRandomRgb = () => {
  const num = Math.round(0xffffff * Math.random());
  const reb = num >> 16;
  const green = num >> 8 & 255;
  const blue = num & 255;
  return 'rgb(' + reb + ', ' + green + ', ' + blue + ')';
}
