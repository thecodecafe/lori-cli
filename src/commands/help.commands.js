var Commander = require('../utils/commander');

class HelpCmd extends Commander{

    fire(){
        this.commander
            .command('lori')
            .option('new <project-name>', 'Starts a new lori project. --help for options')
            .parse(process.argv);
    }
}

module.exports = new HelpCmd();