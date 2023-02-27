const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const moment = require('moment');

client.commands = new Collection();

require('dotenv').config();
const DISCORD_CHANNEL_ID = '1044979392620797983';

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

function daysUntilNewYear() {
    const today = moment();
    const newYear = moment().add(1, 'year').startOf('year');
    const diff = newYear.diff(today, 'days');
    return diff;
}

// Function to send a message to Discord with the number of days left until the next year
async function sendDaysUntilNewYear() {
    const channel = await client.channels.fetch(DISCORD_CHANNEL_ID);
    const days = daysUntilNewYear();
    const message = `Only ${days} days left until the next year! 🎉🎊`;
    channel.send(message);
}
// Task to send a message every week
async function messageTask() {
    await client.channels.fetch(DISCORD_CHANNEL_ID);
    while (true) {
        await sendDaysUntilNewYear();
        await new Promise(resolve => setTimeout(resolve, 604800000)); // 1 week = 7 * 24 * 60 * 60 * 1000 milliseconds
    }
}
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    messageTask();
});

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");

    client.login(process.env.token)
})();

