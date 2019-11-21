const Command = require("../../structures/Command.js");
const Discord = require("discord.js");

class Reboot extends Command {
    constructor(client) {
        super({
            name: 'reboot',
            description: 'This command is used to reboot the client.',
            usage: `${client.prefix}reboot`,
            category: 'dev',
            enabled: true,
            ownerOnly: true,
            guildOnly: true
        });

        this.client = client;
    }

    async run(message, args) {
        // maak een command die de bot restart.
    }
}

module.exports = Reboot;