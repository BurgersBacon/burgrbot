const { Client } = require('discord.js');
const bot = new Client();
const cfg = require('./config.json');
const fs = require('fs');


bot.on('ready', () => {
  console.log("-----------------------------------------------------");
  bot.user.setActivity(`${cfg.prefix} help`);
});

bot.on('message', msg => {
  if (msg.author.bot || !msg.content.startsWith(cfg.prefix)) return;
  const args = msg.content.slice(cfg.prefix.length + 1).split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'hi') {
    msg.reply('que dices, bro');
  }
  else if (command === 'photo') {
    msg.reply(msg.author.avatarURL);
  }
  else if (command === 'roll'){
    let max;
    args.length>0?max=args[0]:max=100;
    let randomNumber = Math.floor((Math.random() * max));
    let description = msg.member.nickname + " lanza los dados y obtiene un... `" + randomNumber + "`";

    msg.channel.send({
      "embed": {
        "title": "🎲 Número Aleatorio",
        "description": description,
        "color": 16098851,
        "footer": {
          "icon_url": "https://burgersbacon.github.io/portfolio/buurgrbit.png",
          "text": `en una escala de 1 - ${max}`
        },
        "thumbnail": {
          "url": "https://burgersbacon.github.io/portfolio/dice.png"
        }
      }
    });
  }
  else if (command === 'help') {
    msg.channel.send({
      "embed": {
        "title": "Lista de comandos",
        "description": "`help`, `hi`, `roll`, `drogas`, `poll`",
        "color": 16098851,
        "footer": {
          "icon_url": "https://burgersbacon.github.io/portfolio/buurgrbit.png",
          "text": `recuerda usar "${cfg.prefix}" antes de cada comando.`
        },
        "thumbnail": {
          "url": "https://burgersbacon.github.io/portfolio/assets/images/contact.png"
        }
      }
    });
  }
  else{
    msg.channel.send("emhh ese comando no existe xd, para ver la lista de comandos usa '.burgr help'");
  }
});

bot.login(cfg.token);
