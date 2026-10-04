import asyncio
import logging
import os

from aiogram import Bot, Dispatcher
from aiogram.filters import CommandStart
from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    MenuButtonWebApp,
    Message,
    WebAppInfo,
)
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.environ["BOT_TOKEN"]
WEBAPP_URL = os.environ["WEBAPP_URL"]

dp = Dispatcher()


@dp.message(CommandStart())
async def start(message: Message) -> None:
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="🪙 Играть", web_app=WebAppInfo(url=WEBAPP_URL))]
        ]
    )
    await message.answer(
        "Жми на монетку и копи очки! Нажми кнопку ниже, чтобы открыть игру.",
        reply_markup=keyboard,
    )


async def main() -> None:
    logging.basicConfig(level=logging.INFO)
    bot = Bot(BOT_TOKEN)
    # Button next to the message input that opens the Mini App
    await bot.set_chat_menu_button(
        menu_button=MenuButtonWebApp(text="Играть", web_app=WebAppInfo(url=WEBAPP_URL))
    )
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
