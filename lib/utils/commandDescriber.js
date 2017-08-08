'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var colors = require('./colors');

var CommandDescriber = function () {
    function CommandDescriber(name) {
        _classCallCheck(this, CommandDescriber);

        this.name = name || null;
        this.description = null;
        this.usage = null;
        this.options = [];
    }

    _createClass(CommandDescriber, [{
        key: 'setName',
        value: function setName(name) {
            this.name = name;
        }
    }, {
        key: 'setDescription',
        value: function setDescription(description) {
            this.description = description;
        }
    }, {
        key: 'setUsage',
        value: function setUsage(usage) {
            this.usage = usage;
        }
    }, {
        key: 'addOption',
        value: function addOption(name, description) {
            this.options.push({ name: name, description: description });
        }
    }, {
        key: 'log',
        value: function log() {
            // log command info to console
            console.log();
            console.log(colors.debug('   COMMAND: ' + this.name));
            if (typeof this.description != 'null') console.log('   ' + this.description);;
            if (typeof this.usage != 'null') console.log('   Usage: ' + this.usage);
            if (this.options.length > 0) {
                console.log(colors.verbose('   OPTIONS'));
                console.log(colors.verbose('   -------'));
                this.options.map(this.logOption);
            }
            console.log();
        }
    }, {
        key: 'logOption',
        value: function logOption(item) {
            console.log('    ' + item.name + ': ' + item.description);
        }
    }]);

    return CommandDescriber;
}();

module.exports = CommandDescriber;