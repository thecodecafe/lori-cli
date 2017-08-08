'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Help = function () {
    function Help() {
        _classCallCheck(this, Help);

        // set commander 
        this.commander = require('commander');
        this.colors = require('./colors');
    }

    _createClass(Help, [{
        key: 'run',
        value: function run() {
            this.commander.version('0.0.1');
            // set commands and their options
            this.setCommandsAndOptions();
            // parse console arguments
            this.commander.parse(process.argv);
        }
    }, {
        key: 'setCommandsAndOptions',
        value: function setCommandsAndOptions() {
            // add commands
            this.newUsage();
        }
    }, {
        key: 'newUsage',
        value: function newUsage() {
            // add "new" command and usage options
            this.commander.command('new <project-name>').description('Creates a new lori project.').option('-ht, --html', 'Create a new lori package for html environments.').option('-ph, --php', 'Create a new lori package for php environments.').option('-nd, --node', 'Create a new lori package for node js environments.').on('--help', function () {
                console.log('   Examples:');
                console.log();
                console.log('       lori new blog --html');
                console.log('       lori new blog --php');
                console.log('       lori new blog --node');
                console.log();
            });
        }
    }]);

    return Help;
}();

module.exports = new Help();