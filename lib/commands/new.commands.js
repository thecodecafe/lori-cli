'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fs = require('fs');
var path = require('path');
var spawn = require('spawn-sync');
var childProcess = require('child_process');
var Commander = require('../utils/commander');
var shell = require('shelljs');
var execSync = childProcess.execSync;

var NewCmd = function (_Commander) {
    _inherits(NewCmd, _Commander);

    function NewCmd() {
        _classCallCheck(this, NewCmd);

        var _this = _possibleConstructorReturn(this, (NewCmd.__proto__ || Object.getPrototypeOf(NewCmd)).call(this));

        _this.root = process.env.PWD;
        _this.projectRoot = _this.root;
        _this.name = null;
        _this.branch = 'master';
        _this.source = 'https://github.com/thecodecafe';
        _this.repo = null;
        return _this;
    }

    _createClass(NewCmd, [{
        key: 'fire',
        value: function fire() {
            this.program = this.commander.command('init').description('Creates a new lori project.').arguments('<project-name>').option('--node', 'Install a node destribution.').option('--php', 'Install a php destribution.').option('--verbose', 'Show more logs.').action(this.action.bind(this));
        }
    }, {
        key: 'action',
        value: function action(name, options) {
            // prep command data
            this.name = name;
            this.type = options.php ? 'php' : options.node ? 'node' : 'html';
            this.repo = 'lori' + '-' + this.type + '.git';
            this.source = this.source.trim() + '/' + this.repo.trim();
            this.projectRoot = path.join(this.root, this.name);

            // add new ling in terminal
            this._newLine();

            // stop if project already exists
            if (this.checkIfProjectAlreadyExists()) {
                // display error in console
                this._error('A project with the name ' + this.name + ' already exists in this directory');
                this._newLine();
                // exit process
                this._exit();
            }

            // stop process if not git is installed
            if (!shell.which('git')) {
                this._error('Sorry Lori requires git to start a lori project, you can download git from https://git-scm.com/download.');
                this._newLine();
                this._exit();
            }

            // change directory to process directory
            process.chdir(this.root);

            // create project
            this.startCreatingProject();
        }
    }, {
        key: 'startCreatingProject',
        value: function startCreatingProject() {
            this._info('Creating your lori project (' + this.name + ').');

            // prepare install command arguments
            var args = ['clone', this.source, this.name, '--quiet'];

            // if verbose option is set
            if (this.program.verbose) {
                args = args.concat('--progress');
            }

            // add branch
            args = args.concat(['--branch', this.branch]);

            // install Lori
            this._waiting('Installing, this might take a minute...');
            this.spawnNewProcess('git', args, { stdio: 'inherit' }, this.installComplete.bind(this));
        }
    }, {
        key: 'installComplete',
        value: function installComplete(err) {
            // cancel process if there was an error
            if (err) {
                this._error(err.message);
                this._newLine();
                this._exit();
            }

            // install dependencies
            this.installDependencies();
        }
    }, {
        key: 'installDependencies',
        value: function installDependencies() {
            // display process info
            this._newLine();
            this._waiting('Installing dependencies...');

            // move into project directory
            process.chdir(this.projectRoot);

            // deletes the .git directory after cloning the required repo
            this.deleteGitDirectory();

            // determine what package manager to use
            var command = this.checkIfYarnIsInstalled() ? 'yarn' : 'npm';

            // prepare arguments
            var args = ['install', '--loglevel'];

            // allow to display errors if verbos mode is set
            if (this.program.verbose) {
                args = args.concat('error');
            } else {
                args = args.concat('silent');
            }

            // install npm packages
            this.spawnNewProcess(command, args, { stdio: 'inherit' }, this.showSuccessMessage.bind(this));
        }
    }, {
        key: 'showSuccessMessage',
        value: function showSuccessMessage(err) {
            // cancel process if there was an error
            if (err) {
                this._error(err.message);
                this._exit();
            }
            // move into project directory
            process.chdir(this.root);
            this._success('Your Lori project is fully set up');
            this._info('Use "npm run dev" to start the development server');
            this._info('Read the docs at http://mrbarde.github.io/lori');
            this._success('B u i l d    S o m e t h i n g    G r e a t');
            this._newLine();
            this._exit();
        }
    }, {
        key: 'checkIfProjectAlreadyExists',
        value: function checkIfProjectAlreadyExists() {
            return fs.existsSync(this.name);
        }
    }, {
        key: 'spawnNewProcess',
        value: function spawnNewProcess(cmd, args, options, callback) {
            // run git command
            var child = spawn(cmd, args, options);
            // if there were errors
            if (child.status !== 0) {
                // return an error
                var err = new Error('Error running command ' + child.args.join(' '));
                callback(err);
                return;
            }
            // fire the callback
            callback();
        }
    }, {
        key: 'checkIfYarnIsInstalled',
        value: function checkIfYarnIsInstalled() {
            try {
                execSync('yarnpkg --version', { stdio: 'ignore' });
                return true;
            } catch (e) {
                return false;
            }
        }
    }, {
        key: 'deleteGitDirectory',
        value: function deleteGitDirectory() {
            // default to unix system command for mac and linux users
            var cmd = 'rm';
            var args = ['-rf', this.projectRoot + '/.git'];
            // use windows command if running on windows
            if (this.isRunningOnWindows()) {
                cmd = 'rd';
                args = ['/s', '/q', this.projectRoot + '/.git'];
            }
            // spawn child process in quit mode and delete directory
            childProcess.spawn(cmd, args, { stdio: 'ignore' });
        }
    }, {
        key: 'isRunningOnWindows',
        value: function isRunningOnWindows() {
            return process.platform == 'win32';
        }
    }]);

    return NewCmd;
}(Commander);

module.exports = new NewCmd();