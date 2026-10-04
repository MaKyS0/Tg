# Coin Clicker — Telegram Mini App

Простое мини‑приложение для Telegram: нажимаешь на монетку — счёт растёт на 1.

- `webapp/index.html` — само мини‑приложение (один HTML‑файл, без сборки).
  Счёт сохраняется в Telegram CloudStorage (привязан к пользователю, виден на всех устройствах);
  вне Telegram — в `localStorage`. Есть вибрация при клике и анимация «+1».
- `bot.py` — бот на aiogram 3: по `/start` присылает кнопку «Играть» и ставит кнопку меню, открывающую игру.

## Запуск

1. **Создай бота** у [@BotFather](https://t.me/BotFather) командой `/newbot` и скопируй токен.
2. **Опубликуй `webapp/` по HTTPS** (Telegram требует HTTPS). Проще всего — GitHub Pages:
   Settings → Pages → Source: `Deploy from a branch`, ветка `main`, папка `/ (root)`.
   Приложение будет доступно по адресу `https://<user>.github.io/<repo>/webapp/`.
3. **Настрой и запусти бота:**
   ```bash
   cp .env.example .env        # впиши BOT_TOKEN и WEBAPP_URL
   python -m venv .venv && source .venv/bin/activate
   pip install -r requirements.txt
   python bot.py
   ```
4. Открой бота в Telegram, отправь `/start` и нажми «🪙 Играть».

Локально страницу можно проверить просто открыв `webapp/index.html` в браузере.
