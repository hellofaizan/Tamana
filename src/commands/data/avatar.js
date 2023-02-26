const { SlashCommandBuilder } = require('@discordjs/builders');
// Axios Require
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Download your avatar')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to download the avatar from')
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const username = interaction.options.getUser('user');
        // Remove the @ and /> from the username
        const actusername = username.toString().replace(/[@<>]/g, '');
        // Fetch User Data from Discord API
        const user = await axios.get(`https://discord.com/api/v8/users/${actusername}`, {
            headers: {
                authorization: `Bot ${client.token}`,
            }
        });
        const timestamp = new Date();

        const msgEmbed = {
            title: `Avatar Avatar`,
            description: `Download avatar of ${user.data.username}#${user.data.discriminator}`,
            color: 0xFFFF00,
            image: {
                url: `https://cdn.discordapp.com/avatars/${actusername}/${user.data.avatar}.png?size=1024`,
            },
            timestamp: timestamp.toISOString(),
        }
        // Send User Data to Discord
        await interaction.reply({ embeds: [msgEmbed] });

    },
}