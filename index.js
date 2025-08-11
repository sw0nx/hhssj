const { Client, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Events } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once(Events.ClientReady, () => {
    console.log(`✅ 로그인됨: ${client.user.tag}`);
});

// 명령어 "!banner" 입력 시 버튼 포함 임베드 전송
client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    if (message.content === '!banner') {
        const embed = new EmbedBuilder()
            .setTitle('자동 배너 설정')
            .setDescription('서버 배너 설정을 관리합니다.')
            .setColor(0x000000);

        const button1 = new ButtonBuilder()
            .setCustomId('license')
            .setLabel('서버 라이센스 등록')
            .setStyle(ButtonStyle.Primary);

        const button2 = new ButtonBuilder()
            .setCustomId('banner')
            .setLabel('배너 설정')
            .setStyle(ButtonStyle.Secondary);

        const button3 = new ButtonBuilder()
            .setCustomId('check')
            .setLabel('설정 확인')
            .setStyle(ButtonStyle.Secondary);

        const row1 = new ActionRowBuilder().addComponents(button1, button2);
        const row2 = new ActionRowBuilder().addComponents(button3);

        await message.channel.send({ embeds: [embed], components: [row1, row2] });
    }
});

// 버튼 클릭 이벤트
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'license') {
        await interaction.reply({ content: '서버 라이센스를 등록합니다.', ephemeral: true });
    }
    if (interaction.customId === 'banner') {
        await interaction.reply({ content: '배너 설정 메뉴입니다.', ephemeral: true });
    }
    if (interaction.customId === 'check') {
        await interaction.reply({ content: '현재 설정을 확인합니다.', ephemeral: true });
    }
});

client.login(process.env.BOT_TOKEN);
