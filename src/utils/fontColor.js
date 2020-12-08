// eslint-disable-next-line import/no-anonymous-default-export
export default function (color) {
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // eslint-disable-next-line no-extend-native
  String.prototype.colorRgb = function () {
    var sColor = this.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (var i = 1; i < 4; i += 1) {
          sColorNew += sColor
            .slice(i, i + 1)
            .concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      var sColorChange = [];
      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return "RGB(" + sColorChange.join(",") + ")";
    } else {
      return sColor;
    }
  };
  var flag = "white";
  var rgbColor = color.colorRgb();
  rgbColor = rgbColor.replace("RGB(", "");
  rgbColor = rgbColor.replace(")", "");
  // console.log(rgbColor);
  var temp = rgbColor.split(",");

  if (parseInt(temp[0]) + parseInt(temp[1]) + parseInt(temp[2]) > 450) {
    // console.log(parseInt(temp[0]) + parseInt(temp[1]) + parseInt(temp[2]));
    flag = "black";
  }
  return flag;
}