const chalk = require('chalk');

class Requirements {

    constructor(){
        // get node version
        this.nodeCurrentVersion = process.versions.node;
        this.nodeSemver = this.nodeCurrentVersion.split('.');
        this.nodeMajorVersion = this.nodeSemver[0];
        this.nodeLeastVersion = 6;
    }

    check(){
        // check for node version
        this.checkNodeVersion();
    }

    checkNodeVersion(){
        // if node is not up to minimum requirement
        if(this.nodeMajorVersion < this.nodeLeastVersion){
            // log error to console
            console.log();
            console.log(chalk.bgRed(chalk.bold(chalk.white(
                'You\'re currently running Node '+this.nodeMajorVersion
                +' Lori requirese Node '+this.nodeLeastVersion+' or higher'
                +'Please update Node to continue.'
            ))));
            console.log();
            // exit proces
            process.exit(1);
        }
    }    

}

module.exports = new Requirements();