const mongoose = require('mongoose');

const connectWithRetry = async (attempt = 1) => {
  const MAX_ATTEMPTS = 10;
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('✅ MongoDB Atlas connected');
  } catch (error) {
    const paused = /Could not connect to any servers|ETIMEDOUT|querySrv/i.test(
      error.message || ''
    );
    console.error(
      `❌ MongoDB connection error (attempt ${attempt}/${MAX_ATTEMPTS}):`,
      error.message
    );
    if (paused) {
      console.error(
        '⚠️  Похоже, кластер MongoDB Atlas на паузе или недоступен. ' +
          'Зайдите в https://cloud.mongodb.com и нажмите "Resume", ' +
          'а также проверьте Network Access (IP whitelist).'
      );
    }

    if (attempt < MAX_ATTEMPTS) {
      const delay = Math.min(30000, 5000 * attempt);
      console.log(`⏳ Повторная попытка через ${delay / 1000} с...`);
      setTimeout(() => connectWithRetry(attempt + 1), delay);
    } else {
      console.error('🛑 Не удалось подключиться к MongoDB после нескольких попыток.');
    }
  }
};

const connectDB = async () => {
  // Автоматическое переподключение при обрыве связи
  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB отключён. Пытаюсь переподключиться...');
  });
  mongoose.connection.on('reconnected', () => {
    console.log('✅ MongoDB переподключён');
  });

  await connectWithRetry();
};

module.exports = connectDB;
