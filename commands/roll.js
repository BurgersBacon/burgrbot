module.exports = {
    name: 'roll',
    description: 'Rolls a dice',
    emoji: '🎲',
    sintax: '`burgr roll` o `burgr roll <numero máximo>`',
    execute(msg, args) {
      let max;
      args.length > 0 ? max = args[0] : max = 100;
      const randomNumber = Math.floor((Math.random() * max));
      const description = msg.author.nickname + ' lanza los dados y obtiene un... `' + randomNumber + '`';

      msg.channel.send({
        'embed': {
          'title': '🎲 Número Aleatorio',
          'description': description,
          'color': 16098851,
          'footer': {
            'icon_url': 'https://burgersbacon.github.io/portfolio/buurgrbit.png',
            'text': `en una escala de 1 - ${max}`,
          },
          'thumbnail': {
            'url': 'https://burgersbacon.github.io/portfolio/dice.png',
          },
        },
      });
    },
};
