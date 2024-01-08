const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const { fetchForecast } = require('../requests/forecast');

const data = new SlashCommandBuilder()
    .setName('forecast')
    .setDescription('Replies with weather forecast!')
    .addStringOption((option) => {
        return option
            .setName('location')
            .setDescription('The location can be a city, zip/postal code, or latitude/longitude')
            .setRequired(true);
    })
    .addStringOption((option) => {
        return option
            .setName('units')
            .setDescription('The unit system of the results: either "metric" or "imperial"')
            .setRequired(false)
            .addChoices(
                {name: 'Metric', value: 'metric'},
                {name: 'Imperial', value: 'imperial'}
            );
    });

async function execute(interaction) {
    await interaction.deferReply();

    const location = interaction.options.getString('location');
    const units = interaction.options.getString('units') || 'imperial';
    const isImperial = units === 'imperial';

    try {
        const { weatherData, locationName } = await fetchForecast(location);

        const embed = new EmbedBuilder()
            .setColor(0x3f704d)
            .setTitle(`Weather Forecast for ${locationName}...`)
            .setDescription(`Using the ${units} system.`)
            .setTimestamp()
            .setFooter({
                text: 'Powered by the weatherapi.com API',
            });

        for (const day of weatherData) {
            const temperatureMin = isImperial ? day.temperatureMinF: day.temperatureMinC;
            const temperatureMax = isImperial ? day.temperatureMaxF: day.temperatureMaxC;

            embed.addFields({
                name: day.date,
                value: `⬇️ Low: ${temperatureMin} degrees, ⬆️ High: ${temperatureMax} degrees`
            })
        }
    
        await interaction.editReply({
            embeds: [embed],
        });
    } catch (error) {
        await interaction.editReply(error);
    }
};

module.exports = {
    data,
    execute,
};
