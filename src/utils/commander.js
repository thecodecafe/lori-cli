const packageJson = require('../../package.json');
const { execSync } = require('child_process');
const spawnSync = require('spawn-sync');

class Help{
    constructor(){
        // set commander 
        this.commander = require('commander')
        this.chalk = require('chalk');
        this.exitOnFinish = true;
    }
    run(){
        this.commander.version(packageJson.version);
        // set commands and their options
        this.fire();
        // parse console arguments
        this.commander.parse(process.argv);
        // exit process
        if(this.exitOnFinish) process.exit(1);
    }
    _info(message){ 
        console.log(this.chalk.bgBlue(' (i) ')+this.chalk.blue(' '+message)); 
    }
    _success(message){
        console.log(this.chalk.bgGreen(this.chalk.black('  v/ '))+this.chalk.green(' '+message)); 
    }
    _warn(message){ 
        console.log(this.chalk.bgHex('#ffa700')(this.chalk.white(' /!\\ '))+this.chalk.hex('#ffa700')(' '+message)); 
    }
    _waiting(message){
        this._warn(message);
    }
    _error(message){ 
        console.log(this.chalk.bgRed(' (!) ')+this.chalk.red(' '+message)); 
    }
    _newLine(){
        console.log(); 
    }
    _exit(code){
        code = (code) ? code : 1; process.exit(code);
    }
    checkIfYarnIsInstalled(){
        try{
            execSync('yarnpkg --version', { stdio: 'ignore' });
            return true;
        }catch(e){
            return false;
        }
    }
    isRunningOnWindows(){
        return process.platform == 'win32';
    }
    spawnNewProcess(cmd, args, options, callback){
        // run git command
        let child = spawnSync(cmd, args, options);
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
}

module.exports = Help;