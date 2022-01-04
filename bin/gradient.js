const tinygradient = require("tinygradient");
var tinycolor = require("tinycolor2");
function applyGradient(colors, data) {
  if (data.split(" ").join("").length == 1) {
    let rgb = tinycolor(colors[0]);
    r = Math.round(rgb._r);
    g = Math.round(rgb._g);
    b = Math.round(rgb._b);
    return console.log(`\x1b[38;2;${r};${g};${b}m${data}\x1b[0m`);
  }
  if (colors.length > data.split(" ").join("").length) {
    colors = colors.slice(0, data.split(" ").join("").length);
  }
  var gradient = tinygradient(colors);
  var hsv = gradient.hsv(data.split(" ").join("").length, "short");
  let rgb = hsv.map((color) => [color._r, color._g, color._b]);
  out = [];

  text = data.split("");
  var val = 0;
  for (ele of text) {
    if (ele != " ") {
      r = Math.round(rgb[val][0]);
      g = Math.round(rgb[val][1]);
      b = Math.round(rgb[val][2]);
      out.push(`\x1b[38;2;${r};${g};${b}m${ele}\x1b[0m`);
      val = val + 1;
    } else out.push(" ");
  }

  console.log(out.join(""));
}

module.exports = {
  applyGradient,
};
