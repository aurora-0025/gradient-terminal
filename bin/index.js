#!/usr/bin/env node
const { applyGradient } = require("./gradient.js");
const  Terminal = require("terminal.js")

var args;
var gradientColors;

process.stdin.resume();
var content = '';
process.stdin.on('data', function (data) {
  content += data
  main(content)
});



function main(data) {
  [, , ...args] = process.argv;
  gradientColors = args;
  if (gradientColors < 2) {
    return console.log(`usage | gterm <color1 color2 ...>`);
  }
  lines = data.split("\n");
  linechars = [];
  let max_length = Math.max(...lines.map((el) => el.length));
  for (line of lines) {
    if (line != "") {
      console.log(applyGradient(gradientColors, line, max_length));
    } else console.log(line);
  }
}

