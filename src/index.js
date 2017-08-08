#!/usr/bin/env node

const args  = process.argv.slice(2);
const colors = require('./utils/colors');
// get commands
const NewCmd = require('./commands/new.commands');
const HelpCmd = require('./commands/help.commands');

// determine what command to run
switch(args[0]){
    case 'new':
            // run new commands
            NewCmd.run();
        break;
    default:
            // run help command
            HelpCmd.run();
        break;
}

// run help command
console.log(colors.error('Unknown lori command user `lori --help or lori lori` for available commands.'))