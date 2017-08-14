const fs = require('fs');
const path = require('path');
const spawn = require('spawn-sync');
const Commander = require('../utils/commander');
const shell = require('shelljs');
const execSync = require('child_process').execSync;

class NewCmd extends Commander{

    constructor()
    {
        super();
        this.root = process.env.PWD;
        this.projectRoot = this.root;
        this.name = null;
        this.branch = 'master';
        this.source = 'https://github.com/mrbarde';
        this.repo = null;
    }

    fire()
    {
        this.program = this.commander
            .command('new')
            .description('Creates a new lori project.')
            .arguments('<project-name>')
            .option('--node', 'Install a node destribution.')
            .option('--php', 'Install a php destribution.')
            .option('--verbose', 'Show more logs.')
            .action(this.action.bind(this))
    }
    
    action(name, options)
    {
        // prep command data
        this.name = name;
        this.type = (options.php) ? 'php' : (options.node) ? 'node' : 'html'
        this.repo = 'lori'+'-'+this.type+'.git';
        this.source = this.source.trim()+'/'+this.repo.trim();
        this.projectRoot = path.join(this.root, this.name);

        // add new ling in terminal
        this._newLine();

        // stop if project already exists
        if(this.alreadyExists()){
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
        this.createProject();
    }

    createProject()
    {
        this._info(`Creating your lori project (${this.name}).`);
        // prepare install command arguments
        let args = [
            'clone',
            this.source,
            this.name,
            '--quiet'
        ];

        // if verbose option is set
        if(this.program.verbose){
            args = args.concat('--progress');
        }

        // add branch
        args = args.concat(['--branch', this.branch]);

        // install Lori
        this._waiting(`Installing, this might take a minute...`);
        this.spawn('git', args, {stdio: 'inherit'}, this.installComplete.bind(this));
    }

    installComplete(err)
    {
        // cancel process if there was an error
        if(err){
            this._error(err.message);
            this._newLine();
            this._exit();
        }
        // install dependencies
        this.installDependencies();
    }

    installDependencies()
    {
        // display process info
        this._newLine();
        this._waiting(`Installing dependencies...`);
        
        // move into project directory
        process.chdir(this.projectRoot);

        // determine what package manager to use
        var command = this.shouldUseYarn() ? 'yarn' : 'npm';

        // prepare arguments
        let args = [
            'install',
            '--loglevel'
        ];

        // if verbose mode is set
        if(this.program.verbose){
            args = args.concat('error');
        }else{
            args = args.concat('silent');
        }

        // install npm packages
        this.spawn(command, args, {stdio: 'inherit'}, this.installDependenciesComplete.bind(this));
    }

    installDependenciesComplete(err)
    {
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

    alreadyExists()
    {
        return fs.existsSync(this.name);
    }

    spawn(cmd, args, options, callback)
    {
        // run git command
        let child = spawn(cmd, args, options);
        // if there were errors
        if(child.status !== 0){
            // return an error
            var err = new Error(`Error running command ${child.args.join(' ')}`);
            callback(err);
            return;
        }
        // fire the callback
        callback();
    }

    shouldUseYarn()
    {
        try{
            execSync('yarnpkg --version', { stdio: 'ignore' });
            return true;
        }catch(e){
            return false;
        }
    }
}

module.exports = new NewCmd();