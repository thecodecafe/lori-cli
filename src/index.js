#!/usr/bin/env node

const args  = process.argv.slice(2);
const colors = require('./utils/colors');
const Availables = require('./utils/availableCommands');
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
            // do nothing
        break;
}

// display available commands
Availables.log();