const { SlashCommandBuilder } = require('@discordjs/builders');
// Axios Require
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Returns all user data from Discord'),
    async execute(interaction, client) {
        // Fetch User Data from Discord API
        const user = await axios.get(`https://discord.com/api/v8/users/${interaction.user.id}`, {
            headers: {
                authorization: `Bot ${client.token}`,
            }
        });
        // Send User Data to Discord
        await interaction.reply(`\`\`\`json\n${JSON.stringify(user.data, null, 2)}\`\`\``);

    },
}