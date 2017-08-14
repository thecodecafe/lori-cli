#!/usr/bin/env node

const args  = process.argv.slice(2);
const AvailableCommands = require('./utils/help/availableCommands');
const Requirements = require('./utils/requirements');

// get commands
const NewCmd = require('./commands/new.commands');

// check for minimum requirements
Requirements.check();

// determine what command to run
switch(args[0]){
    case 'help':
            // display available commands
            AvailableCommands.log();
        break;
    default:
            // run new commands
            NewCmd.run();
        break;
}