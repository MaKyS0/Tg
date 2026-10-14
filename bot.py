import asyncio
import logging
import os
import time

from aiogram import Bot, Dispatcher
from aiogram.filters import Command, CommandObject, CommandStart
from aiogram.types import (
    BotCommand,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    MenuButtonWebApp,
    Message,
    WebAppInfo,
)
from dotenv import load_dotenv

import leaderboard

load_dotenv()

BOT_TOKEN = os.environ["BOT_TOKEN"]
WEBAPP_URL = os.environ["WEBAPP_URL"]


def fresh_url() -> str:
    """Telegram's WebView caches the page; a new query string on every press makes it fetch the current version."""
    return f"{WEBAPP_URL}{'&' if '?' in WEBAPP_URL else '?'}v={int(time.time())}"
# Optional: the public Supabase URL and publishable key of the leaderboard, for /top
SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "")

dp = Dispatcher()


@dp.message(CommandStart())
async def start(message: Message) -> None:
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="🪙 Играть", web_app=WebAppInfo(url=fresh_url()))]
        ]
    )
    await message.answer(
        "Жми на монетку и копи очки! Нажми кнопку ниже, чтобы открыть игру.",
        reply_markup=keyboard,
    )


@dp.message(Command("top"))
async def top(message: Message, command: CommandObject) -> None:
    """/top shows the best players by coins, /top rebirths by rebirths."""
    if not (SUPABASE_URL and SUPABASE_KEY):
        await message.answer("Топ не подключён: задай SUPABASE_URL и SUPABASE_KEY в .env.")
        return
    sort = "rebirths" if (command.args or "").strip().lower() in ("rebirths", "пер", "перерождения") else "coins"
    try:
        rows = await asyncio.to_thread(leaderboard.fetch_top, SUPABASE_URL, SUPABASE_KEY, sort)
    except Exception:
        logging.exception("could not load the leaderboard")
        await message.answer("Не удалось получить топ. Попробуй позже.")
        return
    await message.answer(leaderboard.format_top(rows, sort))  # plain text: names are player input


async def main() -> None:
    logging.basicConfig(level=logging.INFO)
    bot = Bot(BOT_TOKEN)
    # Button next to the message input that opens the Mini App
    await bot.set_chat_menu_button(
        menu_button=MenuButtonWebApp(text="Играть", web_app=WebAppInfo(url=fresh_url()))
    )
    await bot.set_my_commands([
        BotCommand(command="start", description="Открыть игру"),
        BotCommand(command="top", description="Топ игроков"),
    ])
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
