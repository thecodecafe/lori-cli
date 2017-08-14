const describer = require('./commandDescriber');
const chalk = require('chalk');
const figlet = require('figlet');

class AvailableCommands{
    constructor(){
        this.commands = [];
        this.setCommands();
    }

    log(){
        figlet('Lori', this.figCb.bind(this));
    }

    figCb(err, data){
        if (err) {
            console.log();
            console.log(chalk.bold(chalk.bgRed('Something went wrong...')));
            console.log();
            console.dir(err);
            console.log();
            return;
        }
        console.log(chalk.blue(data))
        this.commands.map((item) => {
            item.log();
        });
    }

    setCommands(){
        // new command
        var newDescriber = new describer('new');
        newDescriber.setDescription('Starts a new lori project.');
        newDescriber.setUsage('lori new [options] <name>');
        newDescriber.addOption('-t --type', 'For specifying development environment type, supports html, php and node.');
        this.commands.push(newDescriber);
    }

}

module.exports = new AvailableCommands();