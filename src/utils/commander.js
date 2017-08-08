class Help{

    constructor(){
        // set commander 
        this.commander = require('commander')
        this.colors = require('./colors');
        this.exitOnFinish = true;
    }

    run(){
        this.commander.version('0.0.1');
        // set commands and their options
        this.fire();
        // parse console arguments
        this.commander.parse(process.argv);
        // exit process
        if(this.exitOnFinish) process.exit(1);
    }
}

module.exports = Help;