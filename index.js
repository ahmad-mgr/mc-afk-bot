
const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot is online and running!'));
app.listen(port, () => console.log(Web server listening on port ${port}));

// البيانات مالتك مأخوذة من الصورة بالضبط وبدون أي تغيير
const botOptions = {
  host: '431551616.aternos.me', 
  port: 16875,                  
  username: 'AntiAFK_Bot',
  version: '1.21.1' 
};

let bot;

function createBot() {
  bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('البوت دخل السيرفر بنجاح!');
    startAntiAFK();
  });

  function startAntiAFK() {
    const actions = ['forward', 'back', 'left', 'right', 'jump'];
    
    setInterval(() => {
      if (!bot) return;
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      bot.setControlState(randomAction, true);
      setTimeout(() => {
        bot.setControlState(randomAction, false);
      }, 1200);
    }, 60000); 

    const messages = ["Hello bro!", "Nice server you have here", "Keeping the server alive...", "Purpur system is smooth!"];
    setInterval(() => {
      if (!bot) return;
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      bot.chat(randomMessage);
    }, 240000);
  }

  bot.on('death', () => {
    console.log('البوت مات وجاري إرسال الأغنية...');
    const deathSongs = [
      "🎤 ليت الزمان يعود يوماً.. قتلتني الأيامُ والزومبيُّ قسراً! 💔",
      "🎤 سأرجع أقوى فلا تفرحوا.. وموت الفتى غدرةً لا يدوم! 🎵",
      "🎤 آه يا ليل.. طحت وراحت الروح.. سأعود للانتقام! 🎶"
    ];
    const randomSong = deathSongs[Math.floor(Math.random() * deathSongs.length)];
    bot.chat(randomSong);
  });

  bot.on('end', () => {
    console.log('انفصل، جاري إعادة المحاولة بعد 45 ثانية...');
    setTimeout(createBot, 45000); 
  });

  bot.on('error', (err) => console.log('خطأ في الاتصال: ', err));
}

createBot();
