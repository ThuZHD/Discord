const {Client, IntentsBitField, SlashCommandBuilder} = require('discord.js');
const fs = require('fs');

const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('pong')
  .addStringOption(option => option.setName('ping').setDescription('pong'))

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,
    ]
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

client.on('interactionCreate',  interaction => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === "reply") {
        interaction.reply(interaction.options.get("reply-message").value + "!");
    }
})

client.on('messageCreate', message => {
    if(message.author.bot) return;
    console.log(message.author.globalName + " said: " + message.content);
})

client.login("MTE5MzYxNzk1ODY5MDM2NTU3Mw.GmSnAB.eJ8sAo0-ENGHFTEZ14-qeg75uP5EryKtcoMz1c")