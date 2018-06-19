const { Client } = require('discord.js');
const bot = new Client();
const cfg = require('./config.json');
const fs = require('fs');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const firebaseDb = require('./firebase-db.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseDb.databaseURL
});

// var database = firebase.database();
var db = admin.firestore();

var users = db.collection('users');
//
// dinosaruios.doc('terodac').set(
//   {
//     name: 'San Francisco',
//     state: 'CA',
//     country: 'USA',
//     capital: false,
//     population: 860000
//   }
// );

//
// db.collection('dinosaurios').doc('trex').get()
//     .then(doc => {
//       if (!doc.exists) {
//         console.log('No such document!');
//       }else{
//         console.log('Document data:', doc.data());
//       }
//     })
//     .catch(err => {
//       console.log('Error getting document', err);
//     });

var dinosauriosQueSeComenOtrosDinos = users.where('name', '==', 'jason').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

bot.on('ready', () => {
  console.log("-----------------------------------------------------");
  bot.user.setActivity(`${cfg.prefix} help`);

  console.log("lmaooo", bot.user.bot);
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
