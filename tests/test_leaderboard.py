import io
import json
import unittest
from unittest import mock

import leaderboard as lb


class FakeResponse(io.BytesIO):
    def __enter__(self):
        return self

    def __exit__(self, *exc):
        return False


class ShortNumberTests(unittest.TestCase):
    def test_matches_the_game(self):
        cases = {1_000_000: "1 млн", 16_000_000: "16 млн", 2_500_000_000: "2,5 млрд", 10**12: "1 трлн",
                 8 * 10**15: "8 квадр", 4 * 10**16: "40 квадр", 10**18: "1 квинт", 1_234_567: "1,23 млн"}
        for n, text in cases.items():
            self.assertEqual(lb.short_number(n), text, n)

    def test_season_two_sizes(self):
        self.assertEqual(lb.short_number(3 * 10**27), "3 окт")
        self.assertEqual(lb.short_number(5 * 10**33), "5 дец")
        self.assertEqual(lb.short_number(12 * 10**36), "1,2e37")

    def test_small_numbers_keep_separators(self):
        self.assertEqual(lb.short_number(123456), "123 456")
        self.assertEqual(lb.short_number(0), "0")


class FormatTests(unittest.TestCase):
    rows = [
        {"tg_id": 1, "name": "Лидер", "total": 8e15, "rebirths": 40, "league": 6},
        {"tg_id": 2, "name": "Анна", "total": 5_000_000, "rebirths": 3, "league": 3},
        {"tg_id": 3, "name": "<b>x</b>", "total": 1234, "rebirths": 0, "league": 99},
        {"tg_id": 4, "name": "Четвёртый", "total": 10, "rebirths": 0, "league": -2},
    ]

    def test_coins_board(self):
        text = lb.format_top(self.rows)
        lines = text.split("\n")
        self.assertEqual(lines[0], "Топ игроков по монетам")
        self.assertIn("🥇 Лидер · Легенда · 8 квадр", lines)
        self.assertIn("🥈 Анна · Золото · 5 млн", lines)
        self.assertTrue(lines[-1].startswith("4. Четвёртый · Новичок"))

    def test_rebirth_board(self):
        text = lb.format_top(self.rows, "rebirths")
        self.assertIn("Топ игроков по перерождениям", text)
        self.assertIn("🥇 Лидер · Легенда · 40 пер.", text)

    def test_league_is_clamped_and_names_are_plain_text(self):
        text = lb.format_top(self.rows)
        self.assertIn("<b>x</b> · Миф", text)  # printed as is; the bot sends no parse_mode
        self.assertNotIn("Traceback", text)

    def test_long_names_are_cut(self):
        text = lb.format_top([{"name": "я" * 80, "total": 1, "rebirths": 0, "league": 0}])
        self.assertIn("я" * 24 + " ·", text)
        self.assertNotIn("я" * 25, text)

    def test_empty(self):
        self.assertIn("пока никого", lb.format_top([]))


class FetchTests(unittest.TestCase):
    def test_request_shape(self):
        seen = {}

        def fake_open(req, timeout):
            seen["url"], seen["key"], seen["timeout"] = req.full_url, req.get_header("Apikey"), timeout
            return FakeResponse(json.dumps([{"name": "A", "total": 1, "rebirths": 0, "league": 0}]).encode())

        with mock.patch("urllib.request.urlopen", fake_open):
            rows = lb.fetch_top("https://x.supabase.co/", "KEY", "rebirths", limit=5)
        self.assertEqual(rows[0]["name"], "A")
        self.assertTrue(seen["url"].startswith("https://x.supabase.co/rest/v1/leaderboard?"))
        self.assertIn("order=rebirths.desc,total.desc", seen["url"])
        self.assertIn("limit=5", seen["url"])
        self.assertEqual(seen["key"], "KEY")
        self.assertEqual(seen["timeout"], 10)

    def test_unknown_sort_is_rejected(self):
        with self.assertRaises(KeyError):
            lb.fetch_top("https://x", "k", "hacks")


if __name__ == "__main__":
    unittest.main()
