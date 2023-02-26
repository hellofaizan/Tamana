const { SlashCommandBuilder } = require('@discordjs/builders');
// Axios Require
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Generate a random dev quote'),
    async execute(interaction, client) {
        // Fetch User Data from Discord API
        const user = await axios.get(`https://api.quotable.io/random`)

        const msgEmbed = {
            title: `Quote by ${user.data.author}`,
            description: `${user.data.content}`,
            color: 0xffff00,
        }
        // Send User Data to Discord
        await interaction.reply({ embeds: [msgEmbed] });

    },
}