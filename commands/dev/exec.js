const Command = require("../../structures/Command.js");
const { postHaste } = require("../../util");
const Discord = require("discord.js");
const { promisify } = require('util');

class Exec extends Command {
    constructor(client) {
        super({
            name: 'exec',
            description: 'This command is used to execute commands within the server.',
            usage: `${client.prefix}exec <code> [--h, --haste]`,
            category: 'dev',
            enabled: true,
            ownerOnly: true,
            guildOnly: true
        });

        this.client = client;
    }

    async run(message, args) {
        const exec = promisify(require('child_process').exec);
        try {
            const code = args.join(' ');
            const haste = ['--h', '--haste'];
            const res = await exec(code, { windowsHide: true });
            // const haste = args.join(' --h') || args.join(' --haste');
            const { stdout, stderr } = res;
            if (haste.some(has => code.includes(has))) {
                const hastelink = await postHaste(`${stdout ? stdout : ''}${stdout && stderr ? '\n>>>>>>>>>>>\n' : ''}${stderr ? `${stderr}` : ''}`, 'xl');
                return message.channel.send({embed: {color: this.client.color.red, description: hastelink}});
            }
            if (stdout || stderr) {
                return message.channel.send(`${stdout ? stdout : ''}${stdout && stderr ? '\n>>>>>>>>>>>\n' : ''}${stderr ? `${stderr}` : ''}`, { code: 'xl', split: true });
            }
        } catch (err) {
            console.log(err);
            return message.channel.send({embed: {color: this.client.color.red, description: err}}, { code: 'xl', split: true });
        }
    }
}

module.exports = Exec;