const Command = require("../../structures/Command.js");
const Discord = require("discord.js");
const { resolve } = require("path");
const walk = require("walk");

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
        let command = `${args[0]}`;

        if(!args[0]) return message.channel.send({embed: {color: this.client.color.red, description: `Please insert a command name, usage: \`${this.usage}\``}});

        let commandsCollection = this.client.commands.get(command);

        if(commandsCollection === undefined || commandsCollection === null) return message.channel.send({embed: {color: this.client.color.red, description: `Command name \`${command}\` doesn't exist!`}});

        let commandName = commandsCollection.name;

        if(commandName !== undefined || commandName !== null) {
            let commandInfo = this.client.commands.get(commandName);

            delete require.cache[require.resolve(`../${commandInfo.category}/${commandInfo.name}.js`)];
            this.client.commands.delete(commandInfo.name);
            console.log(`[Command Reload in action] ${commandInfo.category}:${commandInfo.name}`);
            const Command = require(`../${commandInfo.category}/${commandInfo.name}.js`);
            const command = new Command(this.client);
            this.client.commands.set(command.name, command);
            console.log(`[Command Reloaded] ${command.category}:${command.name}`);

            return message.channel.send({
                embed: {
                    color: this.client.color.green,
                    description: `Succesfully reloaded command \`${commandName}\`!`
                }
            });
        } else {
            return message.channel.send({
                embed: {
                    color: this.client.color.red,
                    description: `Command name \`${commandName}\` doesn't exist!`
                }
            });
        }
    }
}

module.exports = Reload;