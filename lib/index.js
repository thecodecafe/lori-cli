#!/usr/bin/env node
'use strict';

var args = process.argv.slice(2);
var AvailableCommands = require('./utils/help/availableCommands');
var Requirements = require('./utils/requirements');

// get commands
var NewCmd = require('./commands/new.commands');

// check for minimum requirements
Requirements.check();

// determine what command to run
switch (args[0]) {
    case 'init':
        // run new commands
        NewCmd.run();
        break;
    default:
        // display available commands
        AvailableCommands.log();
        break;
}