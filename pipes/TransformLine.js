const { Duplex } = require('stream');
const chalk = require('chalk');

class TransformLine extends Duplex {
    constructor(args) {
        super();
        this.args = args;
    }

    _read() {}

    _write(line, encoding, callback) {
        this.push(line + '\r\n');
        callback();
    }

    _final() {
        if (this.args.debug) console.log(chalk.gray('Finished processing lines.'));
        this.push(null);
    }
}

exports.TransformLine = TransformLine;