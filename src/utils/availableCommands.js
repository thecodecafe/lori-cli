const describer = require('./commandDescriber');

class Availables{
    constructor(){
        this.commands = [];
        this.setCommands();
    }

    log(){
        this.commands.map((item) => {
            item.log();
        });
    }

    setCommands(){
        // new command
        var newDescriber = new describer('new');
        newDescriber.setDescription('Starts a new lori project.');
        newDescriber.setUsage('lori new <project-name>');
        newDescriber.addOption('-t --type', 'For specifying development environment type, supports html, php and node.');
        this.commands.push(newDescriber);
    }

}

module.exports = new Availables();