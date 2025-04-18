const { Client, GatewayIntentBits, Partials, AttachmentBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
require('dotenv').config();
const fs = require('fs');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

client.once('ready', async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  const channel = await client.channels.fetch("1359975813679677481");
  const image = new AttachmentBuilder('./assets/colors-banner.png');

  const colorNames = Object.keys(require('./events/interactionCreate').colorRoles);

  const options = colorNames.map(name => ({
    label: name,
    value: name
  }));

  const row = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId('select_color_1') // ← عدّل هنا
      .setPlaceholder('🎨 اختر لونك المفضل')
      .addOptions(options.slice(0, 25))
  );

  const row2 = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId('select_color_2') // ← وعدّل هنا
      .setPlaceholder('🎨 تابع الألوان المتبقية')
      .addOptions(options.slice(25, 50))
  );

  await channel.send({
    content: '**🎨 اختَر لونك من القائمة أدناه!**',
    files: [image],
    components: [row, row2]
  });
});

// تعامل مع التفاعل
client.on('interactionCreate', interaction => {
  require('./events/interactionCreate').execute(interaction);
});

client.login(process.env.TOKEN);
