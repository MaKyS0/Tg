"""Reads the Coin Clicker leaderboard from Supabase (public read-only API) for the bot's /top command."""
import json
import urllib.parse
import urllib.request

UNITS = ["", "тыс", "млн", "млрд", "трлн", "квадр", "квинт", "секст", "септ"]
LEAGUES = ["Новичок", "Бронза", "Серебро", "Золото", "Платина", "Алмаз", "Легенда", "Миф"]
ORDERS = {"coins": "total.desc,tg_id.asc", "rebirths": "rebirths.desc,total.desc"}


def short_number(n: float) -> str:
    """Same short names as the game: 1 млрд, 2,5 трлн, 8 квадр. Numbers below a million keep thousands separators."""
    n = int(n)
    if n < 1_000_000:
        return f"{n:,}".replace(",", " ")
    i = min(len(UNITS) - 1, (len(str(n)) - 1) // 3)
    value = round(n / 1000 ** i, 2)
    text = f"{value:.2f}".rstrip("0").rstrip(".").replace(".", ",")
    return f"{text} {UNITS[i]}"


def fetch_top(url: str, key: str, sort: str = "coins", limit: int = 10, timeout: float = 10) -> list:
    query = urllib.parse.urlencode(
        {"select": "tg_id,name,total,rebirths,league", "order": ORDERS[sort], "limit": limit}, safe=",.")
    req = urllib.request.Request(f"{url.rstrip('/')}/rest/v1/leaderboard?{query}", headers={"apikey": key})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.load(resp)


def format_top(rows: list, sort: str = "coins") -> str:
    """Plain text on purpose: names come from players, so no HTML or Markdown is ever interpreted."""
    if not rows:
        return "В топе пока никого. Зайди в игру и стань первым!"
    medals = ["🥇", "🥈", "🥉"]
    title = "Топ игроков по монетам" if sort == "coins" else "Топ игроков по перерождениям"
    lines = [title, ""]
    for i, row in enumerate(rows):
        league = LEAGUES[max(0, min(len(LEAGUES) - 1, int(row.get("league") or 0)))]
        value = short_number(row["total"]) if sort == "coins" else f"{int(row['rebirths'])} пер."
        place = medals[i] if i < 3 else f"{i + 1}."
        lines.append(f"{place} {str(row['name'])[:24]} · {league} · {value}")
    return "\n".join(lines)
