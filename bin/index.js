#!/usr/bin/env node
const { applyGradient } = require("./gradient.js");

var stdin = process.openStdin();
var data;
var args;
var gradientColors;

process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.on("data", function (chunk) {
  data = chunk.split("\r\n").join(" ");
});
process.stdin.on("end", main);

function main() {
  [, , ...args] = process.argv;
  gradientColors = args;
  applyGradient(gradientColors, data);
}
