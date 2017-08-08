'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Commander = require('../utils/commander');

var NewCmd = function (_Commander) {
    _inherits(NewCmd, _Commander);

    function NewCmd() {
        _classCallCheck(this, NewCmd);

        return _possibleConstructorReturn(this, (NewCmd.__proto__ || Object.getPrototypeOf(NewCmd)).apply(this, arguments));
    }

    _createClass(NewCmd, [{
        key: 'fire',
        value: function fire() {
            var _this2 = this;

            this.commander.command('new').description('Creates a new lori project.').arguments('<name>').option('-t --type <value>', 'Choose environment type.', /^(html|php|node)$/, 'html').action(function (name, options) {
                var type = options.type || 'html';
                console.log(_this2.colors.info('lori new %s -t %s'), name, type);
            }).parse(process.argv);
        }
    }]);

    return NewCmd;
}(Commander);

module.exports = new NewCmd();