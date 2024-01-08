const { Client, IntentsBitField, REST, Routes, ApplicationCommandOptionType } = require('discord.js');
const fs = require('fs');

const token = "MTE5MzYxNzk1ODY5MDM2NTU3Mw.GmSnAB.eJ8sAo0-ENGHFTEZ14-qeg75uP5EryKtcoMz1c";
const clientId = "1193617958690365573";

const commands = [
  {
    name: "warn",
    description: "warns",
    options: [
      {
        name: "user",
        description: "ping to the User",
        type: ApplicationCommandOptionType.User,
        required: true,
      }
    ]
  },
  {
    name: "reply",
    description: "repliees to your message",
    options: [
      {
        name: "reply-message",
        description: "your message to reply to",
        type: ApplicationCommandOptionType.String,
        required: true,
      }
    ]
  }
]

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

async function loadCommands() {
  try {
    const rest = new REST({ version: '10' }).setToken(token);

    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    );
    console.log('Successfully registered global application commands.');
  } catch (error) {
    console.error(error);
  }
} 

async function deleteCommands(command_id) {
  try {
    const rest = new REST({ version: '10' }).setToken(token);

    await rest.delete(Routes.applicationCommand(clientId, command_id))
	    .then(() => console.log('Successfully deleted guild command'))
	    .catch(console.error);

    console.log('Successfully deleted global application command.');
  } catch (error) {
    console.error(error);
  }
} 

client.once('ready', async () => {
  loadCommands()
  // deleteCommands('1193984470387261481')
  // deleteCommands('1193984470387261480')

  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;
  if (commandName === 'warn') {
    const username = options.getUser('user');
    interaction.replied
    // interaction.channel.send("<@" + username + '>! you have been warned!');
    interaction.reply({ content: "User warned", ephemeral: true });

    const channel = client.channels.cache.get('1193989406063853689');
    channel.send("<@" + username + '>! you have been warned!');

  } else if (commandName === 'reply') {
    const replyMessage = options.getString('reply-message');
    interaction.reply({ content: replyMessage, ephemeral: true });
  }
});

client.on('messageCreate', message => {
  if (message.author.bot) return;
  console.log(`${message.author.tag} said: ${message.content}`);
});

client.login(token);
