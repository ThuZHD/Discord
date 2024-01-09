require('dotenv').config();
const { Client, IntentsBitField, REST, Routes, ApplicationCommandOptionType, ActivityType } = require('discord.js');
const express = require("express")
const app = express()

//! Import all commands from the commands folder

const { templateFunction } = require('./commands/template.js');

//! Add all commands to the client with their name, description and options

const commands = [
  {
    name: "template",
    description: "template",
    options: [
      {
        name: "template-message",
        description: "your message to reply to",
        type: ApplicationCommandOptionType.String,
        required: true,
      }
    ]
  }
]

//! Initialize the client with its permissions

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

//* Function to load all commands

async function loadCommands() {
  try {
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );
    console.log('Successfully registered global application command.');
  } catch (error) {
    console.error(error);
  }
} 

//* Function to delete commands with parameter command_id

async function deleteCommand(command_id) {
  try {
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    await rest.delete(Routes.applicationCommand(process.env.CLIENT_ID, command_id))
	    .then(() => console.log('Successfully deleted command'))
	    .catch(console.error);
  } catch (error) {
    console.error(error);
  }
} 

//* Function to load all guild commands

async function loadGuildCommands() {
  try {
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );
    console.log('Successfully registered guild application command.');
  } catch (error) {
    console.error(error);
  }
} 

//* Function to delete guild commands with parameter command_id

async function deleteGuildCommand(command_id) {
  try {
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    await rest.delete(Routes.applicationGuildCommand(process.env.CLIENT_ID, process.env.GUILD_ID, command_id))
	    .then(() => console.log('Successfully deleted guild command'))
	    .catch(console.error);
  } catch (error) {
    console.error(error);
  }
} 

//! Start the client and load all commands

client.once('ready', async () => {
  client.user.setActivity({ 
    name: 'Goofy', 
    type: ActivityType.Listening, 
  })

  loadCommands()
  console.log(`Logged in as ${client.user.tag}!`);
});

//* Function to handle all interactions

client.on('interactionCreate', interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;
  if (commandName === 'warn') {
    warnFunction(interaction, client);

  } else if (commandName === 'reply') {
    replyFunction(interaction, client);

  } else if (commandName === 'image') {
    imageFunction(interaction, client);
    
  } else if (commandName === 'template') {
    templateFunction(interaction, client);
    
  }
});

client.on('messageCreate', message => {
  if (message.author.bot) return;
  console.log(`${message.author.tag} said: ${message.content}`);
});

client.login(process.env.TOKEN);

app.get('/', (req, res) => {
  res.send('Hello World!')
  client.users.send('592301753039323176', 'content');
})

app.listen(8080)