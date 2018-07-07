const chalk = require('chalk');

class CommandDescriber{
    constructor(name){
        this.name = name || null;
        this.description = null;
        this.usage = null;
        this.options = [];
    }
    setName(name){
        this.name = name;
    }
    setDescription(description){
        this.description = description;
    }
    setUsage(usage){
        this.usage = usage;
    }
    addOption(name, description){
        this.options.push({name:name, description: description});
    }
    show(){
        // log command info to console
        console.log(chalk.bold(chalk.blue('Command:'))+' '+chalk.green(this.name));
        if(typeof this.description != 'null') console.log(chalk.italic(this.description));
        console.log();
        if(typeof this.usage != 'null') { console.log(chalk.bold(chalk.blue('Usage:'))+' '+this.usage); console.log(); }
        if(this.options.length > 0){
            console.log(chalk.underline(chalk.bold(chalk.blue('Options'))))
            this.options.map(this.showOption)
        }
        console.log();
        console.log();
    }
    showOption(item){
        console.log(item.name+': '+item.description)
    }
}

module.exports = CommandDescriber;