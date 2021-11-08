export const getDataAfterHashLocation = (list) => {
  return list.reduce(function(obj, str, index) {
    const strParts = str.split("=");
    if (strParts[0] && strParts[1]) {
      obj[strParts[0].replace(/\s+/g, '')] = strParts[1].trim();
    }
    return obj;
  }, {});
}
