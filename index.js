const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(port, () => console.log(`Web server running on port ${port}`));

const botOptions = {
  host: 'yourserver.aternos.me', // تأكد من وضع رابط سيرفرك هنا
  port: 25565,                  
  username: 'AntiAFK_Bot'
};

let bot;

function createBot() {
  bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('البوت دخل السيرفر بنجاح!');
    startAntiAFK();
  });

  // 1. حركة عشوائية ذكية لمنع الخمول
  function startAntiAFK() {
    const actions = ['forward', 'back', 'left', 'right', 'jump'];
    
    setInterval(() => {
      if (!bot) return;
      
      // اختيار حركة عشوائية
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      
      // تشغيل الحركة
      bot.setControlState(randomAction, true);
      
      // إيقاف الحركة بعد ثانية واحدة لكي لا يستمر بالركض في اتجاه واحد
      setTimeout(() => {
        bot.setControlState(randomAction, false);
      }, 1000);
      
    }, 60000); // يتحرك حركة عشوائية جديدة كل دقيقة

    // رسائل شات عشوائية كل 5 دقائق
    const messages = ["Hello!", "Chilling here...", "Keeping server alive!"];
    setInterval(() => {
      if (!bot) return;
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      bot.chat(randomMessage);
    }, 300000);
  }

  // 2. إذا مات البوت: يغني/يكتب في الشات ثم يعود للحياة تلقائياً
  bot.on('death', () => {
    console.log('البوت مات! جاري إرسال أغنية الموت والـ Respawn...');
    
    // قائمة بأبيات أو أغاني يكتبها عند الموت
    const deathSongs = [
      "🎤 ليت الزمان يعود يوماً.. قتلتني الأيامُ والزومبيُّ قسراً! 💔",
      "🎤 سأرجع أقوى فلا تفرحوا.. وموت الفتى غدرةً لا يدوم! 🎵",
      "🎤 آه يا ليل.. طحت وراحت الروح.. سأعود للانتقام! 🎶"
    ];
    
    const randomSong = deathSongs[Math.floor(Math.random() * deathSongs.length)];
    
    // يرسل الأغنية في الشات فوراً قبل أن يرسو به المكان في نقطة الرسبون
    bot.chat(randomSong);
  });

  bot.on('end', () => {
    console.log('تم الفصل، إعادة محاولة بعد دقيقة...');
    setTimeout(createBot, 60000); 
  });

  bot.on('error', (err) => console.log('خطأ: ', err));
}

createBot();
