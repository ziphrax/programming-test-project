const chalk = require('chalk');
const { PassThrough } = require('stream');

class LogLine extends PassThrough {
    lineCount = 0;

    constructor(args) {
        super();

        this.on('data', (line) => {
            if (args.debug) {
                this.lineCount++;
                console.log(chalk.gray(`Line ${this.lineCount}: ${line.toString()}`));
            }
        });

        this.on('end', () => {
            if (args.debug)
                console.log(chalk.gray('Reached end of input file...'));
        });
    }
}

exports.LogLine = LogLine;