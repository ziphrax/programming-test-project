const { program } = require('commander');
const processFile = require('./commands/process-file');
const chalk = require('chalk');

console.log(chalk.cyanBright.bold('Process File'));

program.name('process-file')
    .description('processes the input file')
    .version('1.0.0')
    .requiredOption('-i, --input <input>', 'file to process')
    .requiredOption('-o, --output <output>', 'desitnation file')
    .option('-d, --debug', 'enable debug output')
    .action(processFile);

program.parse();