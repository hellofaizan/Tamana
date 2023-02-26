const { SlashCommandBuilder } = require('@discordjs/builders');
// Axios Require
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Download your avatar'),
    async execute(interaction, client) {
        // Fetch User Data from Discord API
        const user = await axios.get(`https://discord.com/api/v8/users/${interaction.user.id}`, {
            headers: {
                authorization: `Bot ${client.token}`,
            }
        });
        const timestamp = new Date();

        const msgEmbed = {
            title: `Avatar for ${interaction.user.username}`,
            description: `Download your avatar: [PNG](${user.data.avatar_url}.png) | [JPG](${user.data.avatar_url}.jpg) | [GIF](${user.data.avatar_url}.gif)`,
            color: 0x00ff00,
            image: {
                url: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=1024`,
            },
            timestamp: timestamp.toISOString(),
        }
        // Send User Data to Discord
        await interaction.reply({ embeds: [msgEmbed] });

    },
}