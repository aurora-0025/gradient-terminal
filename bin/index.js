#!/usr/bin/env node

import { applyGradient } from './gradient.js';

var args;
var gradientColors;
var lines;
var linechars;

process.stdin.setEncoding('utf8');
process.stdin.on("data", function (data) {
  main((data));
});

function main(data) {
  [, , ...args] = process.argv;
  gradientColors = args;

  if (gradientColors.length == 0) {
    return process.stdout.write(`usage <cmd> | gterm <color1 color2 ...>\n`);
  }

  if (gradientColors.length == 1) {
    gradientColors.push(gradientColors[0])
  }

  lines = data.split("\n");
  linechars = [];
  let max_length = Math.max(...lines.map((el) => el.length));
  for (var line of lines) {
    if (line != "") {
      applyGradient(gradientColors, line, max_length);
    } else process.stdout.write(line) + '\n';
  }
}
