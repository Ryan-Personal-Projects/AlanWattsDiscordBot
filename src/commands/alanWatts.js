const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const { getAlanWattsResponse } = require('../requests/alanWatts');

const data = new SlashCommandBuilder()
    .setName('alan')
    .setDescription('Replies with a response from the great Alan Watts!')
    .addStringOption((option) => {
        return option
            .setName('question')
            .setDescription('This can be a question about anything, but it should be in question format.')
            .setRequired(true);
    });

async function execute(interaction) {
    await interaction.deferReply();

    const question = interaction.options.getString('question');

    try {
        const { response } = await getAlanWattsResponse(question);
        await interaction.editReply(response);
    } catch (error) {
        await interaction.editReply(error);
    }
};

module.exports = {
    data,
    execute,
};
