module.exports = {
    name: 'sup',
    description: 'Sends you a DM',
    emoji:'😬',
    sintax:'`burgr sup`',
    execute(msg) {
      msg.channel.send(`Bro, ${msg.author} te envié un mensaje directo.`);
      msg.author.send('hello');
    },
};
