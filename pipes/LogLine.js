const chalk = require('chalk');
const { PassThrough } = require('stream');

const LogLine = new PassThrough();
exports.LogLine = LogLine;

let lineCount = 0;

LogLine.on('data', (line) => {
    lineCount++;
    console.log(chalk.gray(`Line ${lineCount}: ${line.toString()}`));
});

LogLine.on('end', () => {
    console.log(chalk.gray('Reached end of input file...'));
});