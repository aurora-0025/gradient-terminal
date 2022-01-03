const tinygradient = require("tinygradient");
function applyGradient(colors, data) {
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
