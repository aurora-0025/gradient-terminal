const tinygradient = require('tinygradient');

function createGradient(colors, data) {
    var gradient = tinygradient(colors);
    console.log(gradient);
}

createGradient(['red','blue'], 'text')
console.log(createGradient);