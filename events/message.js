const Discord = require("discord.js");

exports.run = async (client, message) => {
    if (
        message.channel.topic &&
        message.channel.topic.includes("<codey:off>")
    ) return;

    if (message.content.startsWith(`<@${process.env.ID}>`)) {
        return message.channel.send({
            embed: {
                color: client.color.main,
                description: `The prefix for <@${client.user.id}> is \`${client.prefix}\` !`,
                author: {
                    name: message.author.tag,
                    icon_url: message.author.avatarURL()
                }
            }
        });
    }

    if (!message.content.startsWith(client.prefix)) return;
    if (message.author.bot) return;

    const args = message.content
        .slice(client.prefix.length)
        .trim()
        .split(/ +/g);
    const cmd = args.shift().toLowerCase();

    let getCommand = client.commands.get(cmd);

    if (!client.commands.has(cmd)) return;

    if (getCommand.enabled === false && client.owner.indexOf(message.author.id))
        return message.channel.send({
            embed: {
                color: client.color.main,
                description: `This has currently been disabled, because of some issues.`
            }
        });

    if (getCommand.ownerOnly === true && client.owner.indexOf(message.author.id))
        return message.channel.send({
            embed: {
                color: client.color.main,
                description: `This command has owner only enabled. You can not execute this the command.`
            }
        });

    if(getCommand.guildOnly === true && message.guild.id !== client.guild)
        return message.channel.send({
            embed: {
                color: client.color.main,
                description: `This command has guild only enabled. You can not execute this the command.`
            }
        });

    const command = client.commands.get(cmd);
    command.run(message, args);
};
