const CodeYClient = require('./structures/Client.js');

let owners = ['258526488138088449', '208962685084106752'];

const CodeY = new CodeYClient({
    prefix: 'y.',
    owner: '258526488138088449',
    guild: '575953011453591552',
    commandsDir: 'commands',
    eventsDir: 'events',
    version: require('./package.json').version,
    inviteURL: process.env.INVITE_URL,
    shardID: process.argv[1],
    shardCount: process.argv[2],
    fetchAllMembers: true
});

CodeY.login('NjQ2MzY0MzkwODE1MzAxNjMz.XdUVQg.sHatY0t_EWpisKOl_EIwtbRVcKM').catch((err) => {
    console.error(err);
});