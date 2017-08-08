'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Help = function () {
    function Help() {
        _classCallCheck(this, Help);

        // set commander 
        this.commander = require('commander');
        this.colors = require('./colors');
        this.exitOnFinish = true;
    }

    _createClass(Help, [{
        key: 'run',
        value: function run() {
            this.commander.version('0.0.1');
            // set commands and their options
            this.fire();
            // parse console arguments
            this.commander.parse(process.argv);
            // exit process
            if (this.exitOnFinish) process.exit(1);
        }
    }]);

    return Help;
}();

module.exports = Help;