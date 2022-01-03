#!/usr/bin/env node

var stdin = process.openStdin();

data = ''
let gradient = require('gradient-string')

stdin.on('data', function(chunk) {
    data += chunk;
  });
  
stdin.on('data', main);

function main(){
[,, ...args] = process.argv

gradientColors = args

function applyGrad(colors,inp){
    console.log(gradient(colors).multiline(inp));
}
if (args==''){
    return console.log(gradient.rainbow.multiline(data));
}
else {
    applyGrad(gradientColors,data)
}
}

