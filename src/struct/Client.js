const { Client } = require('discord.js');

const CommandHandler = require('./handlers/CommandHandler');
const EventHandler = require('./handlers/EventHandler');

class CodeY extends Client {
    /**
     * Options for a CodeYClient
     * @typedef {ClientOptions} CodeYClientOptions
     * @property {string} [prefix=y.] - Default command prefix
     * @property {string|string[]|Set<string>} [owner] - ID of the bot owner's Discord user, or multiple IDs
     * @property {string} [guild] - ID of the client's home guild
     * @property {string} [inviteURL] - Invite URL to the bot's support server
     * @property {string} [VERSION] - Version of the bot
     */

    /**
     * @param {CodeYClientOptions} [options] - Options for the client
     */
    constructor(options = {}) {
        if(typeof options.prefix === 'undefined') options.prefix = 'y.';
        if(options.prefix == null) options.prefix = '';
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
        /**
         * Command Prefix
         * @type {?string}
         */
        this.prefix = options.prefix;

        /**
         * Command Prefix
         * @type {?string|?string[]}
         */
        this.owner = options.owner;

        /**
         * Command Prefix
         * @type {?string}
         */
        this.guild = options.guild;

        /**
         * Command Prefix
         * @type {?string}
         */
        this.inviteURL = options.inviteURL;

        this.VERSION = options.version;
        this.COLOR = {
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

    /**
     * Owners of the bot, set by the {@link CommandoClientOptions#owner} option
     * <info>If you simply need to check if a user is an owner of the bot, please instead use
     * {@link CommandoClient#isOwner}.</info>
     * @type {?Array<User>}
     * @readonly
     */
    get owners() {
        if(!this.options.owner) return null;
        if(typeof this.options.owner === 'string') return [this.users.get(this.options.owner)];
        const owners = [];
        for(const owner of this.options.owner) owners.push(this.users.get(owner));
        return owners;
    }
}

module.exports = CodeY;