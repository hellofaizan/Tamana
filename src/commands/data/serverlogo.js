const { SlashCommandBuilder } = require('@discordjs/builders');
// Axios Require
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverlogo')
        .setDescription('Download Server Logo'),
    async execute(interaction, client) {
        const guild = interaction.guild;
        const timestamp = new Date();
        // Get guild icon link
        const serverlogo = guild.iconURL({
            format: 'png',
            size: 1024,
        });
        const msgEmbed = {
            title: `Server Banner`,
            description: `Download Server Banner`,
            color: 0xFFFF00,
            image: {
                url: serverlogo,
            },
            timestamp: timestamp.toISOString(),
        }
        if (serverlogo) {
            // Send User Data to Discord
            await interaction.reply({ embeds: [msgEmbed] });
        } else {
            await interaction.reply({ content: `No server logo available`, ephemeral: true });
        }

    },
}