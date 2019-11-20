const { ShardingManager } = require("discord.js");
// const moment = require("moment");
// require("moment-duration-format");

const manager = new ShardingManager("./client.js", {
    token: 'NjQ2MzY0MzkwODE1MzAxNjMz.XdUVQg.sHatY0t_EWpisKOl_EIwtbRVcKM',
    autoSpawn: false
});

// manager.createShard(1);
manager.spawn(1);