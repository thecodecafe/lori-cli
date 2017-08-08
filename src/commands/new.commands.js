var Commander = require('../utils/commander');

class NewCmd extends Commander{

    fire(){
        this.commander
            .command('new')
            .description('Creates a new lori project.')
            .arguments('<name>')
            .option('-t --type <value>', 'Choose environment type.', /^(html|php|node)$/, 'html')
            .action((name, options) => {
                var type = options.type || 'html'
                console.log(this.colors.info('lori new %s -t %s'), name, type);
            })
            .parse(process.argv);
    }
}

module.exports = new NewCmd();