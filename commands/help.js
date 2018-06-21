module.exports = {
    name: 'help',
    description: 'Shows help',
    emoji: '❓',
    sintax: '`burgr help` o `burgr help <comando>`',
    execute(msg, args, prefix) {
      const commandsNames = [];
      const { commands } = msg.client;

      commandsNames.push(commands.map(command => '`' + command.name + '`').join(', '));
      if (!args.length) {
        msg.channel.send({
          'embed': {
            'title': 'Lista de comandos',
            'description': commandsNames[0],
            'color': 16098851,
            'footer': {
              'icon_url': 'https://burgersbacon.github.io/portfolio/buurgrbit.png',
              'text': `también puedes usar el comando '${prefix} help [nombre del comando]' para obtener información de un comando específico.`,
            },
            'thumbnail': {
              'url': 'https://burgersbacon.github.io/portfolio/assets/images/contact.png',
            },
          },
        });
      }
      else {
        const nameCommand = args[0].toLowerCase();
        const command = commands.find(c => c.name.includes(nameCommand));
        if (!command) {
          msg.channel.send('el comando `' + nameCommand + '` no existe, recuerda usar `burgr help` para ver la lista completa de comandos disponibles.');
        }
        else {
          msg.channel.send({
            'embed': {
              'title': `${command.name} ${command.emoji}`,
              'color': 16098851,
              'fields': [
                {
                  'name': 'Descripción',
                  'value': command.description,
                },
                {
                  'name': 'Sintáxis',
                  'value': command.sintax,
                },
              ],
              'footer': {
                'icon_url': 'https://burgersbacon.github.io/portfolio/buurgrbit.png',
                'text': `recuerda usar el prefijo '${prefix}' antes de ejecutar cualquier comando.`,
              },
            },
          });
        }
      }
    },
};
