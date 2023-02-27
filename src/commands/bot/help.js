const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('All the freken commands'),
        async execute(interaction, client) {
        await interaction.reply(`Hello`);

    },
}