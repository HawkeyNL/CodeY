const Command = require("../../structures/Command.js");
const Discord = require("discord.js");
const { inspect } = require('util');

class Eval extends Command {
    constructor(client) {
        super({
            name: 'eval',
            description: 'This command is used to evaluate javascript code within discord.',
            usage: `${client.prefix}eval <code>`,
            category: 'dev',
            enabled: true,
            ownerOnly: true,
            guildOnly: false
        });

        this.client = client;
    }

    async run(message, args) {
        function clean(text, token) {
            if (typeof text === 'string') {
                text = text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);

                return text.replace(new RegExp(token, 'gi'), '****');
            }

            return text;
        }
        let evaled;
        try {
            const hrStart = process.hrtime();
            evaled = eval(args.join(' ')); // eslint-disable-line no-eval

            if (evaled instanceof Promise) evaled = await evaled;
            const hrStop = process.hrtime(hrStart);

            let response = new Discord.MessageEmbed();

            response.addField(`• Discord.js`, Discord.version);
            response.addField(`• Type`, typeof evaled);
            response.addField(`• Time taken`, `\`${(((hrStop[0] * 1e9) + hrStop[1])) / 1e6}ms\``);
            response.setDescription(`\`\`\`js\n${clean(inspect(evaled, { depth: 0 }), message.client.token)}\n\`\`\``);

            if (response.length > 0) {
                await message.channel.send(response);
            }
        } catch (err) {
            console.error('Eval error:', err);
            return message.channel.send(`Error:\`\`\`xl\n${clean(err, msg.client.token)}\n\`\`\``);
        }
    }
}

module.exports = Eval;