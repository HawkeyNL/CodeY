const dotenv = require('dotenv');
dotenv.config();

exports.run = client => {
    console.log(`[Ready] ${client.user.username} - v${client.version} - ${client.commands.size} commands.`);
    console.log(`[Shards ID] ${client.options.shardID}`);
    console.log(`[Shard Manager] Launched ${parseInt(client.shard.ids + 1)}/${client.shard.count}`);

    if (client.options.shardID === 0) {
        setTimeout(() => {
            console.log("Shards are dying. Attempting to destroy.");
            client.destroy();
        }, 5000);
    }

    // client.user.setActivity(
    //     `${client.prefix}help • v${client.VERSION}`,
    //     { type: "STREAMING", url: "https://twitch.tv/twitch" }
    // );
    client.user.setPresence({ activity: { name: `${client.prefix}help • v${client.version}` }, status: 'dnd' });
};
