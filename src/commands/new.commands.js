const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const Commander = require('../utils/commander');
const shell = require('shelljs');
const { spawn } = childProcess;

class NewCmd extends Commander{
    constructor(){
        super();
        this.root = process.env.PWD;
        this.projectRoot = this.root;
        this.name = null;
        this.branch = 'master';
        this.source = 'https://github.com/thecodecafe';
        this.repo = null;
    }
    fire(){
        this.program = this.commander
            .command('init')
            .description('Creates a new lori project.')
            .arguments('<project-name>')
            .option('--node', 'Install a node destribution.')
            .option('--php', 'Install a php destribution.')
            .option('--verbose', 'Show more logs.')
            .action(this.action.bind(this))
    }
    action(name, options){
        // prep command data
        this.name = name;
        this.type = (options.php) ? 'php' : (options.node) ? 'node' : 'html'
        this.repo = 'lori'+'-'+this.type+'.git';
        this.source = this.source.trim()+'/'+this.repo.trim();
        this.projectRoot = path.join(this.root, this.name);

        // add new ling in terminal
        this._newLine();

        // stop if project already exists
        if(this.checkIfProjectAlreadyExists()){
            // display error in console
            this._error(`A project with the name ${this.name} already exists in this directory`);
            this._newLine();
            // exit process
            this._exit();
        }

        // stop process if not git is installed
        if(!shell.which('git')){
            this._error(`Sorry Lori requires git to start a lori project, you can download git from https://git-scm.com/download.`)
            this._newLine();
            this._exit();
        }

        // change directory to process directory
        process.chdir(this.root);

        // create project
        this.startCreatingProject();
    }
    startCreatingProject(){
        this._info(`Creating your lori project (${this.name}).`);

        // prepare install command arguments
        let args = [ 'clone', this.source, this.name, '--quiet' ];

        // if verbose option is set
        if(this.program.verbose){
            args = args.concat('--progress');
        }

        // add branch
        args = args.concat(['--branch', this.branch]);

        // install Lori
        this._waiting(`Installing, this might take a minute...`);
        this.spawnNewProcess('git', args, {stdio: 'inherit'}, this.installComplete.bind(this));
    }
    installComplete(err){
        // cancel process if there was an error
        if(err){
            this._error(err.message);
            this._newLine();
            this._exit();
        }

        // install dependencies
        this.installDependencies();
    }
    installDependencies(){
        // display process info
        this._newLine();
        this._waiting(`Installing dependencies...`);
        
        // move into project directory
        process.chdir(this.projectRoot);

        // deletes the .git directory after cloning the required repo
        this.deleteGitDirectory();

        // determine what package manager to use
        var command = this.checkIfYarnIsInstalled() ? 'yarn' : 'npm';

        // prepare arguments
        let args = [ 'install', '--loglevel' ];

        // allow to display errors if verbos mode is set
        if(this.program.verbose){
            args = args.concat('error');
        }else{
            args = args.concat('silent');
        }

        // install npm packages
        this.spawnNewProcess(command, args, {stdio: `inherit`}, this.showSuccessMessage.bind(this));
    }
    showSuccessMessage(err){
        // cancel process if there was an error
        if(err){
            this._error(err.message);
            this._exit();
        }
        // move into project directory
        process.chdir(this.root);
        this._success(`Your Lori project is fully set up`);
        this._info(`Use "npm run dev" to start the development server`);
        this._info(`Read the docs at http://mrbarde.github.io/lori`);
        this._success(`B u i l d    S o m e t h i n g    G r e a t`);
        this._newLine();
        this._exit();
    }
    checkIfProjectAlreadyExists(){
        return fs.existsSync(this.name);
    }
    deleteGitDirectory(){
        // default to unix system command for mac and linux users
        var cmd = 'rm';
        var args = ['-rf', `${this.projectRoot}/.git`];
        // use windows command if running on windows
        if(this.isRunningOnWindows()){
            cmd = 'rd';
            args = ['/s', '/q', `${this.projectRoot}/.git`];
        }
        // spawn child process in quit mode and delete directory
        spawn(cmd, args, {stdio: 'ignore'});
    }
}

module.exports = new NewCmd();