// Discord dependencies
const Discord = require('discord.js');
const newUsers = new Discord.Collection();
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Other dependencies
const fs = require('fs');

// Config files
const { prefix, token } = require('./config.json');

// Firebase files
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const firebaseDb = require('./firebase-db.json');

// Commands thing
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: firebaseDb.databaseURL,
});

// var database = firebase.database();
// var db = admin.firestore();
//
// var users = db.collection('users');
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
//
// var dinosauriosQueSeComenOtrosDinos = users.where('name', '==', 'jason').get().then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//             // doc.data() is never undefined for query doc snapshots
//             console.log(doc.id, ' => ', doc.data());
//         });
//     })
//     .catch(function(error) {
//         console.log('Error getting documents: ', error);
//     });

client.on('ready', () => {
	console.log('-----------------------------------------------------');
	client.user.setActivity(`${prefix} help`);

	console.log('lmaooo', client.user.bot);
});

client.on('guildMemberAdd', (member) => {
	const guild = member.guild;
	newUsers.set(member.id, member.user);
	if (newUsers.size > 10) {
		const defaultChannel = guild.channels.find(c=> c.permissionsFor(guild.me).has('SEND_MESSAGES'));
		const userlist = newUsers.map(u => u.toString()).join(' ');
		defaultChannel.send('Bienvenido' + userlist);
		newUsers.clear();
	}
});

client.on('guildMemberRemove', (member) => {
	if(newUsers.has(member.id)) newUsers.delete(member.id);
});

client.on('message', msg => {
  if (msg.author.bot) return;
  if (msg.content.includes('bot')) {
      msg.react('446395864072585229');
  }
  if (msg.content.startsWith(prefix)) {
    const args = msg.content.slice(prefix.length + 1).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'hi') {
      msg.reply('que dices, bro');
    }
    else if (command === 'photo') {
      msg.reply(msg.author.avatarURL);
    }
    else if (command === 'roll') {
      client.commands.get('roll').execute(msg, args);
    }
    else if (command === 'sup') {
      msg.channel.send(`Bro, ${msg.author} te envié un mensaje directo.`);
      msg.author.send('hello');
    }
    else if (command === 'lol') {
      msg.react('446395907823501314');
    }
    else if(command === 'listemojis') {
      const emojiList = msg.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' + e.name).join('\n');
      msg.channel.send(emojiList);
    }
		else if (command === 'server') {
			console.log(msg.guild);
			msg.channel.send(`Server name: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`);
		}
    else if (command === 'help') {
      msg.channel.send({
        'embed': {
          'title': 'Lista de comandos',
          'description': '`help`, `hi`, `roll`, `drogas`, `poll`',
          'color': 16098851,
          'footer': {
            'icon_url': 'https://burgersbacon.github.io/portfolio/buurgrbit.png',
            'text': `recuerda usar '${prefix}' antes de cada comando.`,
          },
          'thumbnail': {
						'url': 'https://burgersbacon.github.io/portfolio/assets/images/contact.png',
					},
				},
			});
		}
		else{
			msg.channel.send('emhh ese comando no existe xd, para ver la lista de comandos usa ".burgr help"');
		}
	}
	else{
		return;
	}

});

client.login(token);
