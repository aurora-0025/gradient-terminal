import { exec } from 'child_process';
import colors from './output.js';

// describe('gterm', () => {

// })
const test = exec('echo "red" | node ./../../bin/index.js red');
test.stdout.on('data', data => console.log(data.toString() === colors.red));