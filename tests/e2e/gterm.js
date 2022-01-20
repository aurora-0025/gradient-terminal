const { exec } = require('child_process');
const { expectations: exp } = require('./output.cjs');

describe('gterm', () => {
    it.each(exp)('should return $out when \'$cmd\' given', ({cmd, out}, done) => {
        const test = exec(cmd);
        const output = [];
        test.stdout.on('data', (chunk) => output.push(chunk));
        test.stdout.on('end', () => {
            const result = output.join('');
            expect(result).toBe(out);
            done()
        })
    });
})