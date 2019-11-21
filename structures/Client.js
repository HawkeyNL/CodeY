const Discord = require('discord.js');

const CommandHandler = require('./CommandHandler.js');
const EventHandler = require('./EventHandler.js');

class CodeY extends Discord.Client {
    /**
     * Options for a CodeYClient
     * @typedef {ClientOptions} CodeYClientOptions
     * @property {string} [prefix=y.] - Default command prefix
     * @property {string|string[]|Set<string>} [owner] - ID of the bot owner's Discord user, or multiple IDs
     * @property {string} [guild] - ID of the client's home guild
     * @property {string} [inviteURL] - Invite URL to the bot's support server
     * @property {string} [VERSION] - Version of the bot
     */
    constructor(options) {
        super(options);

        // Handlers
        this.commands = new Discord.Collection();
        this.events = new Discord.Collection();
        this.commandsDir = options.commandsDir || null;
        this.eventsDir = options.eventsDir || null;
        this.eventHandler = new EventHandler(this);
        this.eventHandler.load(this.eventsDir);
        this.commandHandler = new CommandHandler(this);
        this.commandHandler.load(this.commandsDir);

        this.on("error", console.log);

        this.prefix = options.prefix;
        this.owner = options.owner;
        this.guild = options.guild;
        this.inviteURL = options.inviteURL;

        this.version = options.version;
        this.color = {
            MAIN: 0x36393f,
            RED: 0xa93226,
            GREEN: 0x229954,
            YELLOW: 0xf1c40f,
            ORANGE: 0xd35400
        };

        // Fetch the owner(s)
        if (options.owner) {
            this.once("ready", () => {
                if (options.owner instanceof Array || options.owner instanceof Set) {
                    for (const owner of options.owner) {
                        this.users.fetch(owner).catch(err => {
                            this.emit("warn", `Unable to fetch owner ${owner}.`);
                            this.emit("error", err);
                        });
                    }
                } else {
                    this.users.fetch(options.owner).catch(err => {
                        this.emit("warn", `Unable to fetch owner ${options.owner}.`);
                        this.emit("error", err);
                    });
                }
            });
        }
    }
}

module.exports = CodeY;