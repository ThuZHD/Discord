module.exports.templateFunction = function(interaction, client) {
    const { options } = interaction;
    const string = options.getString('template-message');
    interaction.reply({ content: "succes: " + string, ephemeral: true });
};
  