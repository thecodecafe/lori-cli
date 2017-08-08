#!/usr/bin/env node
'use strict';

var args = process.argv.slice(2);
var colors = require('./utils/colors');
var Availables = require('./utils/availableCommands');
// get commands
var NewCmd = require('./commands/new.commands');
var HelpCmd = require('./commands/help.commands');

// determine what command to run
switch (args[0]) {
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