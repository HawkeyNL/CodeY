const Command = require("../../structures/Command.js");
const Discord = require("discord.js");

class Reload extends Command {
    constructor(client) {
        super({
            name: 'reload',
            description: 'This command is used to reload a command.',
            usage: `${client.prefix}reload <name>`,
            category: 'dev',
            enabled: false,
            ownerOnly: true,
            guildOnly: true
        });

        this.client = client;
    }

    async run(message, args) {
        // let command = `${args[0]}`;
        //
        // if(!command) return message.channel.send({embed: {color: this.client.color.red, description: `Please insert a command name, usage: \`${this.usage}\``}});
        // let commandsCollection = this.client.commands.get(command);
        // let commandName = commandsCollection.name;
        //
        // if(commandName !== undefined || commandName !== null) {
        //     this.client.commandHandler.reload(commandName).then(() => {
        //         message.channel.send({
        //             embed: {
        //                 color: this.client.color.green,
        //                 description: `Succesfully reloaded command \`${commandName}\`!`
        //             }
        //         });
        //     });
        // } else {
        //     message.channel.send({
        //         embed: {
        //             color: this.client.color.red,
        //             description: `Command name \`${commandName}\` doesn't exist!`
        //         }
        //     });
        // }
    }
}

module.exports = Reload;