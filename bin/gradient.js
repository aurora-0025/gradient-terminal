import tinygradient from "tinygradient";
import tinycolor from "tinycolor2";

export function applyGradient(colors, data, max_length) {
  let invalidColors = [];
  for (var color of colors) {
    if (!tinycolor(color).isValid()) {
      if (!invalidColors.includes(color)) {
        invalidColors.push(color);
      }
    }
  }
  if (invalidColors.length != 0) {
    if (invalidColors.length == 1) return process.stdout.write(`${invalidColors} is not an accepted color\n`)
    return process.stdout.write(`${invalidColors} are not accepted colors\n`);
  }

  if (max_length == 1) {
    let rgb = tinycolor(colors[0]);
    let r = Math.round(rgb._r);
    let g = Math.round(rgb._g);
    let b = Math.round(rgb._b);

    return process.stdout.write(`\x1b[38;2;${r};${g};${b}m${data}\x1b[0m`);
  }

  if (colors.length > max_length) {
    colors = colors.slice(0, max_length);
  }

  var gradient = tinygradient(colors);
  var hsv = gradient.hsv(max_length, "short");
  let rgb = hsv.map((color) => [color._r, color._g, color._b]);
  let out = [];

  var text = data.split("");
  var val = 0;
  for (var ele of text) {
    if (ele != " ") {
      let r = Math.round(rgb[val][0]);
      let g = Math.round(rgb[val][1]);
      let b = Math.round(rgb[val][2]);
      out.push(`\x1b[38;2;${r};${g};${b}m${ele}\x1b[0m`);
      val += 1;
    } else {
      out.push(" ");
      val += 1;
    }
  }
  out = out.join("");

  return process.stdout.write(out + '\n');
}

