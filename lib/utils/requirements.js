'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chalk = require('chalk');

var Requirements = function () {
    function Requirements() {
        _classCallCheck(this, Requirements);

        // get node version
        this.nodeCurrentVersion = process.versions.node;
        this.nodeSemver = this.nodeCurrentVersion.split('.');
        this.nodeMajorVersion = this.nodeSemver[0];
        this.nodeLeastVersion = 6;
    }

    _createClass(Requirements, [{
        key: 'check',
        value: function check() {
            // check for node version
            this.checkNodeVersion();
        }
    }, {
        key: 'checkNodeVersion',
        value: function checkNodeVersion() {
            // if node is not up to minimum requirement
            if (this.nodeMajorVersion < this.nodeLeastVersion) {
                // log error to console
                console.log();
                console.log(chalk.bgRed(chalk.bold(chalk.white('You\'re currently running Node ' + this.nodeMajorVersion + ' Lori requirese Node ' + this.nodeLeastVersion + ' or higher' + 'Please update Node to continue.'))));
                console.log();
                // exit proces
                process.exit(1);
            }
        }
    }]);

    return Requirements;
}();

module.exports = new Requirements();