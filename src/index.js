require('dotenv').config();

const { Client, GatewayIntentBits, Events, Collection } = require('discord.js');
const { clientReadyHandler } = require('./events/clientReady');
const { interactionCreateHandler } = require('./events/interactionCreate');
const pingCommand = require('./commands/ping');
const forecastCommand = require('./commands/forecast');
const astroCommand = require('./commands/astro');
const alanCommand = require('./commands/alanWatts');

const client = new Client({
    intents :[
        GatewayIntentBits.Guilds,
    ]
});

client.commands = new Collection();
client.commands.set(pingCommand.data.name, pingCommand);
client.commands.set(forecastCommand.data.name, forecastCommand);
client.commands.set(astroCommand.data.name, astroCommand);
client.commands.set(alanCommand.data.name, alanCommand);

client.once(Events.ClientReady, clientReadyHandler);
client.on(Events.InteractionCreate, interactionCreateHandler);

client.login();
