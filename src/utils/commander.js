var http = require('http');
var fs = require('fs');
var packageJson = require('../../package.json');

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
    _waiting(message){ this._warn(message); }
    _error(message){ 
        console.log(this.chalk.bgRed(' (!) ')+this.chalk.red(' '+message)); 
    }
    _newLine(){ console.log(); }
    _exit(code){ code = (code) ? code : 1; process.exit(code); }

}

module.exports = Help;