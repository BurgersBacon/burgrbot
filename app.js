// Discord dependencies
const Discord = require('discord.js');
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

// When the bot starts
client.on('ready', () => {
	console.log('-----------------------------------------------------');
	client.user.setActivity(`${prefix} help`);
	console.log(prefix);
});

// Every time a user sends a message
client.on('message', msg => {
	// asks if who wrote the message is a bot
  if (msg.author.bot) return;

	// if the message is a command
  if (msg.content.startsWith(prefix)) {
    const args = msg.content.slice(prefix.length + 1).split(' ');
    const commandName = args.shift().toLowerCase();

		if (client.commands.has(commandName)) {
			const command = client.commands.get(commandName);
			try {
				command.execute(msg, args, prefix);
			}
			catch (error) {
				console.error(error);
			}
		}
		else {
			msg.channel.send('emhhh ese comando no existe xd, para ver la lista de comandos usa "burgr help"');
		}
	}
	else if (msg.content.includes('bot') || msg.content.includes('burgrbot')) {
		msg.react('446395864072585229');
	}
	else {
		return;
	}

});

client.login(token);


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
