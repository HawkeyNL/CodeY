const dotenv = require('dotenv');
dotenv.config();

const { ShardingManager } = require("discord.js");
// const moment = require("moment");
// require("moment-duration-format");

const manager = new ShardingManager("./client.js", {
    token: process.env.TOKEN,
    autoSpawn: true
});

// manager.createShard(1);
manager.spawn(1);