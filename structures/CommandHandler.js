"use strict";

const { resolve } = require("path");
const walk = require("walk");

class CommandHandler {
  constructor(options) {
    this.client = options.client;
    this.commandsDir = options.commandsDir;
  }

  async load() {
    const walker = walk.walk(`./${this.commandsDir}`);
    walker.on("file", (root, stats, next) => {
      if (!stats.name.endsWith(".js")) return;
      const Command = require(`${resolve(root)}/${stats.name}`);
      const command = new Command(this.client);
      this.client.commands.set(command.name, command);
      console.log(`[Command Loaded] ${command.category}:${command.name}`);
      next();
    });
  }
}

module.exports = CommandHandler;
