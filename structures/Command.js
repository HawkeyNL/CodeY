class Command {
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.usage = options.usage;
        this.category = options.category;
        this.enabled = options.enabled || true;
        this.ownerOnly = options.ownerOnly || false;
        this.guildOnly = options.guildOnly || false;

        if (!this.name) throw new Error(`A command is missing a name:\n${__filename}`);
        if (!this.description) throw new Error(`A description must be provided for the command: ${this.name}`);
        if (!this.usage) throw new Error(`A usage description must be provided for the command: ${this.name}`);
        if (!this.category) throw new Error(`A category must be provided for the command: ${this.name}`);

        if (typeof this.enabled === "undefined") this.enabled = true;
        if (typeof this.ownerOnly === "undefined") this.ownerOnly = false;
        if (typeof this.guildOnly === "undefined") this.guildOnly = false;
    }
}

module.exports = Command;