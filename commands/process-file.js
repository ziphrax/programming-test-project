const fs = require('fs');
const path = require('path');
const split = require('split');
const chalk = require('chalk');
const { LogLine } = require("../pipes/LogLine");
const { TransformLine } = require("../pipes/TransformLine");
const { PassThrough } = require('stream');

function processFile(args) {
    if (args.debug)
        console.log(chalk.gray('Arguments: ' + JSON.stringify(args)));

    const transformLine = new TransformLine(args);
    const logLine = new LogLine(args);

    const readStream = fs.createReadStream(path.join(process.cwd(), args.input));
    const writeStream = fs.createWriteStream(path.join(process.cwd(), args.output));

    if (args.debug)
        console.log(chalk.yellow(`Reading file: ${args.input}...`));

    readStream
        .pipe(split())
        .pipe(args.debug ? logLine : new PassThrough())
        .pipe(transformLine)
        .pipe(writeStream)
        .on('error', (err) => {
            console.log(`Stream Error: ${JSON.stringify(err)}`)
        });

    writeStream.on('error', (err) => {
        console.log(chalk.red(`Error Writing File: ${JSON.stringify(err)}`));
    })

    writeStream.on('finish', () => {
        console.log(chalk.green.bold(`Finished writing file: ${args.output}`));
    })
}

module.exports = processFile;