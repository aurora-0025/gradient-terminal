#!/usr/bin/env node

const { applyGradient } = require("./gradient.js");

var args;
var gradientColors;

process.stdin.setEncoding("utf8");
process.stdin.on("data", function (data) {
   main(data);
});

function main(data) {
  [, , ...args] = process.argv;
  gradientColors = args;

  if (gradientColors.length==0) {
    return process.stdout.write(`usage | gterm <color1 color2 ...>`);
  }
  
  if(gradientColors.length==1){
    gradientColors.push(gradientColors[0])
  }

  lines = data.split("\n");
  linechars = [];
  let max_length = Math.max(...lines.map((el) => el.length));
  for (line of lines) {
    if (line != "") {
      process.stdout.write(applyGradient(gradientColors, line, max_length)+'\n');
    } else process.stdout.write(line);
  }
}
