const colors = require('./colors');

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

    log(){
        // log command info to console
        console.log();
        console.log(colors.debug('   COMMAND: '+this.name));
        if(typeof this.description != 'null') console.log('   '+this.description);;
        if(typeof this.usage != 'null') console.log('   Usage: '+this.usage);
        if(this.options.length > 0){
            console.log(colors.verbose('   OPTIONS'))
            console.log(colors.verbose('   -------'))
            this.options.map(this.logOption)
        }
        console.log();
    }

    logOption(item){
        console.log('    '+item.name+': '+item.description)
    }
}

module.exports = CommandDescriber;