module.exports = {
    name: 'poll',
    description: 'comando para hacer encuestas',
    emoji: '🤔',
    sintax: '`burgr poll <pregunta>`',
    execute(msg, args) {
      const question = args.join(' ');
      const autor = msg.author.id;
      const nickname = msg.guild.members.get(autor).nickname ? msg.guild.members.get(autor).nickname : msg.author.username;
      msg.delete();
      msg.channel.send({
        'embed': {
          'description': `${question} 🤔`,
          'color': 12735572,
          'footer': {
            'text': 'Esta encuesta finalizará en 30 segundos',
            'icon_url': 'https://burgersbacon.github.io/portfolio/buurgrbit.png',
          },
          'author': {
            'name': `${nickname} acaba de crear una encuesta`,
            'icon_url': `${msg.author.avatarURL}`,
          },
        },
      }).then(newMsg => {
        newMsg.react('👍').then(() => newMsg.react('👎').then(() => newMsg.react('❓')));
      });
    },
};
