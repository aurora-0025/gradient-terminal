const tinygradient = require("tinygradient");
var tinycolor = require("tinycolor2");


function applyGradient(colors, data, max_length) {
  let invalidColors = [];

  for (color of colors) {
    if (!tinycolor(color).isValid()) {
      invalidColors.push(color);
    }
  }
  if (invalidColors.length != 0) {
    return console.log(`${invalidColors} are not accepted`);
  }

  if (max_length == 1) {
    let rgb = tinycolor(colors[0]);
    r = Math.round(rgb._r);
    g = Math.round(rgb._g);
    b = Math.round(rgb._b);
    return console.log(`\x1b[38;2;${r};${g};${b}m${data}\x1b[0m`);
  }

  if (colors.length > max_length) {
    colors = colors.slice(0, max_length);
  }

  var gradient = tinygradient(colors);
  var hsv = gradient.hsv(max_length, "short");
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
      val += 1;
    } else {
      out.push(" ");
      val += 1;
    }
  }
  out = out.join('')

  return out
}

module.exports = {
  applyGradient,
};
