const mineflayer = require('mineflayer');
const express = require('express');

// إعداد خادم ويب بسيط جداً لكي لا يغلق موقع Render الخدمة
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(port, () => console.log(`Web server running on port ${port}`));

// إعدادات البوت الأساسية
const botOptions = {
  host: '431551616.aternos.me', // ضع رابط سيرفر آترنوس الخاص بك هنا
  port: 16875,                  // غير البورت إذا كان مخصصاً
  username: 'AntiAFK_Bot'
};

let bot;

function createBot() {
  bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('البوت دخل السيرفر بنجاح!');
    startAntiAFK();
  });

  function startAntiAFK() {
    // الحركة كل دقيقتين
    setInterval(() => {
      if (!bot) return;
      bot.setControlState('forward', true);
      setTimeout(() => {
        bot.setControlState('forward', false);
        bot.setControlState('back', true);
        setTimeout(() => bot.setControlState('back', false), 500);
      }, 1000);
    }, 120000);

    // كتابة رسالة كل 5 دقائق
    const messages = ["Hello!", "Chilling here...", "Keeping server alive!"];
    setInterval(() => {
      if (!bot) return;
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      bot.chat(randomMessage);
    }, 300000);
  }

  bot.on('end', () => {
    console.log('تم الفصل، إعادة المحاولة بعد دقيقة...');
    setTimeout(createBot, 60000); 
  });

  bot.on('error', (err) => console.log('خطأ: ', err));
}

createBot();
