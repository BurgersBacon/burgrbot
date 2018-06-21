module.exports = {
    name: 'emojislist',
    description: 'shows a list of emojis',
    emoji: '🙂',
    sintax: '`burgr emojislist`',
    execute(msg) {
      const emojiList = msg.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' + e.name).join('\n');
      msg.channel.send(emojiList);
    },
};
