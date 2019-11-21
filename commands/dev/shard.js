const Command = require("../../structures/Command.js");
const Discord = require("discord.js");

class Shard extends Command {
    constructor(client) {
        super({
            name: 'shard',
            description: 'This command is used for shard moderation.',
            usage: `${client.prefix}shard [...args1] [...args2]`,
            category: 'dev',
            enabled: true,
            ownerOnly: true,
            guildOnly: true
        });

        this.client = client;
    }

    async run(message, args) {

    }
}

module.exports = Shard;