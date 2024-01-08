const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const token = "MTE5MzYxNzk1ODY5MDM2NTU3Mw.GmSnAB.eJ8sAo0-ENGHFTEZ14-qeg75uP5EryKtcoMz1c"

const commands = [
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

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands('1193617958690365573'),
      {body: commands}
    )
    console.log('Successfully registered application commands.')
  } catch (error) {
    console.error(error);
  }
})();