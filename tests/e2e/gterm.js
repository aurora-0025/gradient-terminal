const { exec, spawn } = require('child_process');
const colors = require('./output.cjs');

describe('gterm', () => {
    it('should return \'rainbow colors\' in rainbow colors', done => {
        const test = exec('echo \'rainbow colors\' | node . violet indigo blue green yellow orange red');
        const expected = colors.rainbow;
        test.stdout.on('data', data => {
            expect(data).toBe(expected);
            done()
        });
    });
    it('should return \'red\' in red color', done => {
        const test = exec('echo "red" | node . red');
        const expected = colors.red;
        test.stdout.on('data', data => {
            expect(data).toBe(expected);
            done()
        });
    });
    it('should return \' cols > str\' in given color', done => {
        const test = exec('echo \'cols > str\' | node . red orange blue cyan green lightblue pink black white gray yellow orange');
        const expected = colors.extraCols;
        test.stdout.on('data', data => {
            expect(data).toBe(expected);
            done()
        });
    });
    it('should return \'testing \\n multiline\' in pink and lightblue color', done => {
        const test = spawn('echo \'testing \\n multiline\' | node . pink lightblue', {
            shell: true
        });
        const expected = colors.multiline;
        const output = [];
        test.stdout.on('data', data => {
            output.push(data)
        });
        test.stdout.on('end', () => {
            expect(Buffer.concat(output).toString()).toBe(expected);
            done()
        })
    });
})