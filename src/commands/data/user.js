const { SlashCommandBuilder, PermissionFlagsBits } = require('@discordjs/builders');
// Axios Require
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Returns all user data from Discord')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to get data from')
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
        // Send User Data to Discord
        await interaction.reply(`\`\`\`json\n${JSON.stringify(user.data, null, 2)}\`\`\``);

    },
}