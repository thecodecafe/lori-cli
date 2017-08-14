'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var http = require('http');
var fs = require('fs');
var packageJson = require('../../package.json');

var Help = function () {
    function Help() {
        _classCallCheck(this, Help);

        // set commander 
        this.commander = require('commander');
        this.chalk = require('chalk');
        this.exitOnFinish = true;
    }

    _createClass(Help, [{
        key: 'run',
        value: function run() {
            this.commander.version(packageJson.version);
            // set commands and their options
            this.fire();
            // parse console arguments
            this.commander.parse(process.argv);
            // exit process
            if (this.exitOnFinish) process.exit(1);
        }
    }, {
        key: '_info',
        value: function _info(message) {
            console.log(this.chalk.bgBlue(' (i) ') + this.chalk.blue(' ' + message));
        }
    }, {
        key: '_success',
        value: function _success(message) {
            console.log(this.chalk.bgGreen(this.chalk.black('  v/ ')) + this.chalk.green(' ' + message));
        }
    }, {
        key: '_warn',
        value: function _warn(message) {
            console.log(this.chalk.bgHex('#ffa700')(this.chalk.white(' /!\\ ')) + this.chalk.hex('#ffa700')(' ' + message));
        }
    }, {
        key: '_waiting',
        value: function _waiting(message) {
            this._warn(message);
        }
    }, {
        key: '_error',
        value: function _error(message) {
            console.log(this.chalk.bgRed(' (!) ') + this.chalk.red(' ' + message));
        }
    }, {
        key: '_newLine',
        value: function _newLine() {
            console.log();
        }
    }, {
        key: '_exit',
        value: function _exit(code) {
            code = code ? code : 1;process.exit(code);
        }
    }]);

    return Help;
}();

module.exports = Help;