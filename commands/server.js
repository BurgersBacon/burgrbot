module.exports = {
    name: 'server',
    description: 'Shows server details',
    emoji: '💻',
    sintax: '`burgr server`',
    execute(msg) {
      msg.channel.send(`Server name: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`);
    },
};
