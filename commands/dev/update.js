const Command = require("../../structures/Command.js");
const Discord = require("discord.js");
const { promisify } = require('util');

const exec = promisify(require('child_process').exec);

class Update extends Command {
    constructor(client) {
        super({
            name: 'update',
            description: 'This command is used to update the client.',
            usage: `${client.prefix}update`,
            category: 'dev',
            enabled: true,
            ownerOnly: true,
            guildOnly: true
        });

        this.client = client;
    }

    async run(message, args) {
        message.channel.send({
            embed: {
                color: this.client.color.main,
                description: `Updating resources....`
            }
        }).then(async () => {
            try {
                const hrStart = process.hrtime();
                const res = await exec('npm upgrade');
                console.log(res);
                const hrStop = process.hrtime(hrStart);
                message.channel.send({
                    embed: {
                        color: this.client.color.green,
                        description: `Succesfully Updated in \`${(((hrStop[0] * 1e9) + hrStop[1])) / 1e6}ms\`!\n\nUpdated Resources:\n${res.stdout}`
                    }
                });
            } catch (err) {
                console.error(err);
                message.channel.send({
                    embed: {
                        color: this.client.color.red,
                        description: `Something went wrong, check console!`
                    }
                });
            }
        });
    }
}

module.exports = Update;