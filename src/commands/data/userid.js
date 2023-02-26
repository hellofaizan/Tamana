const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userid')
        .setDescription('Returns your user ID'),
    async execute(interaction, client) {
        // To make the reply private to the user, use interaction.reply('Pong!', {ephemeral: true});
        await interaction.reply(`<@${interaction.user.id}> Your user ID is: ${interaction.user.id}`);
    },
}