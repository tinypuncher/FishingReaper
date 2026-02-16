require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

app.post(`/webhook/${TOKEN}`, async (req, res) => {
  const message = req.body.message;

  if (!message || !message.text) return res.sendStatus(200);

  const chatId = message.chat.id;
  const text = message.text;

  try {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: `You said: ${text}`
    });
  } catch (err) {
    console.error('Telegram API error:', err.response?.data || err.message);
  }

  res.sendStatus(200);
});

app.get('/', (req, res) => res.send('Bot is running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
