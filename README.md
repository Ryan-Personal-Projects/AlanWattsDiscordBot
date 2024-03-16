# Alan Watts Discord Bot

## Overview

This project utilizes Node.js to create a Discord bot and deploy it to a Discord server, so that it can be interacted with. Currently, the code has the following 4 commands setup:
- /alan - ask a question and the bot will respond to it as the great philosopher, Alan Watts
- /astro - give a location and the bot will give you the astronomical forecast for that location
- /forecast - give a location and the bot will give you the weather forecast for that location
- /ping - test command to make sure the bot is responding properly; bot will respond with 'Pong!'

**In order for this project to work, you will need to create an account with Discord**

## Setup

You will need to have Node.js installed.

Once Node.js is installed, you will need to install the node packages by running the following command:
`npm install`

You can now start your Discord bot by running the following command:
`npm start`

**You will need to setup your bot first through Discord's Developer Portal and then add it to your Discord server. Here is a good article to help get you setup: https://www.writebots.com/discord-bot-token/**

### Environment Variables

Upon cloning the repository, you need to create a .env file and use the same name of the variables found in the .env.example file.
Here is a list of the variables and short description of what they represent:
- DISCORD_TOKEN - represents the Discord token that is used for authentication
- CLIENT_ID - represents the Discord Application ID for your Discord bot
- GUILD_ID - represents the Discord Server ID for the server that your bot will be operating on 
- WEATHER_API_KEY - API key for weatherapi.com; you will need to create an account to get this 
- OPENAI_API_KEY - API key for Open AI; you will need to create an account to get this