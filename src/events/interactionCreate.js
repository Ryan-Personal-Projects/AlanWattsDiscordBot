async function interactionCreateHandler(interaction){
    //If the interaction is something other than a slash command
    if (!interaction.isChatInputCommand()) {
        return;
    }
    
    const command = interaction.client.commands.get(interaction.commandName);
    
    //If request command could not be found
    if (!command) {
        return;
    }

    try {
        await command.execute(interaction);
        console.log(`${interaction.user.username} used command ${interaction.commandName}`)
    } catch (error) {
        console.error(error);
        if(interaction.replied || interaction.deferred){
            await interaction.followUp({
                content: 'There was an error executing this command!',
                ephemeral: true,
            })
        } else {
            await interaction.reply({
                content: 'There was an error executing this command!',
                ephemeral: true,
            })
        }
    } 
};

module.exports = {
    interactionCreateHandler,
};