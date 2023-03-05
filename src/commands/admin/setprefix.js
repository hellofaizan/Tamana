const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setprefix')
        .setDescription('Sets a new prefix for this server'),
        async execute(interaction, client) {
        await interaction.reply(`Hello`);

    },
}