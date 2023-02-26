const { SlashCommandBuilder } = require('@discordjs/builders');
// Axios Require
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverbanner')
        .setDescription('Download Server Banner'),
    async execute(interaction, client) {
        const guild = interaction.guild;
        const timestamp = new Date();
        // Get guild banner link
        const banner = guild.bannerURL({
            format: 'png',
            size: 1024,
        });
        const msgEmbed = {
            title: `Server Banner`,
            description: `Download Server Banner`,
            color: 0xFFFF00,
            image: {
                url: banner,
            },
            timestamp: timestamp.toISOString(),
        }
        if (banner) {
            // Send User Data to Discord
            await interaction.reply({ embeds: [msgEmbed] });
        } else {
            await interaction.reply({ content: `No Banner available on this server`, ephemeral: true });
        }

    },
}