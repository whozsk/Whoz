require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ]
});

const prefix = '!';
const keysFile = './keys.json';

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'generatekey') {
    const key = generateKey();
    saveKey(key);
    message.author.send(`Generated key: ${key}`).catch(err => console.error('DM error:', err));
    message.reply('Key sent to your DMs!');
  }
});

function generateKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const segments = [];
  for (let i = 0; i < 4; i++) {
    let segment = '';
    for (let j = 0; j < 4; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    segments.push(segment);
  }
  return segments.join('-');
}

function saveKey(key) {
  let keys = {};
  if (fs.existsSync(keysFile)) {
    keys = JSON.parse(fs.readFileSync(keysFile));
  }
  keys[key] = { used: false, created: new Date().toISOString() };
  fs.writeFileSync(keysFile, JSON.stringify(keys, null, 2));
}

client.login(process.env.DISCORD_TOKEN);