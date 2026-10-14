-- Leaderboard for the Coin Clicker mini app (Supabase / Postgres).
-- Season 2: scores from older seasons are rejected (p_season), the table was cleared when the season started and rows now
-- carry the avatar. Run once in the SQL editor of your project, then put the project URL and the publishable key into `TOP` in webapp/index.html.
--
-- Trust model: the Telegram id sent by the game is taken on trust (the bot token is not checked here), so the top is an
-- honour system. Guards below only stop casual abuse: scores never decrease, grow at most 10x per call, and a player
-- can be written at most once per 10 seconds. To make it tamper-proof, verify Telegram initData in an Edge Function.

create table if not exists public.leaderboard (
  tg_id bigint primary key check (tg_id > 0),
  name text not null check (char_length(name) between 1 and 24),
  total numeric not null check (total >= 0 and total < 1e100),
  rebirths integer not null default 0 check (rebirths between 0 and 1000000),
  league smallint not null default 0 check (league between 0 and 200),
  skin text check (skin is null or char_length(skin) <= 24),
  avatar smallint not null default 0 check (avatar between 0 and 200),
  updated_at timestamptz not null default now()
);

-- upgrading a season-1 table
alter table public.leaderboard add column if not exists avatar smallint not null default 0 check (avatar between 0 and 200);
alter table public.leaderboard drop constraint if exists leaderboard_league_check;
alter table public.leaderboard add constraint leaderboard_league_check check (league between 0 and 200);
alter table public.leaderboard drop constraint if exists leaderboard_total_check;
alter table public.leaderboard add constraint leaderboard_total_check check (total >= 0 and total < 1e100);

create index if not exists leaderboard_total_idx on public.leaderboard (total desc, tg_id);
create index if not exists leaderboard_rebirths_idx on public.leaderboard (rebirths desc, total desc);

alter table public.leaderboard enable row level security;

-- Everyone may read the top. There are no insert/update/delete policies: rows change only through the functions below.
drop policy if exists "top is public" on public.leaderboard;
create policy "top is public" on public.leaderboard for select to anon, authenticated using (true);
revoke all on public.leaderboard from anon, authenticated;
grant select on public.leaderboard to anon, authenticated;

drop function if exists public.submit_score(bigint, text, numeric, integer, integer, text);

create or replace function public.submit_score(p_id bigint, p_name text, p_total numeric, p_rebirths integer, p_league integer, p_skin text, p_avatar integer, p_season integer)
returns table(rank bigint, players bigint)
language plpgsql
security definer
set search_path = public
as $$
declare
  cur public.leaderboard%rowtype;
  nm text;
  av smallint;
  v_total numeric;
begin
  if p_season is distinct from 2 then raise exception 'old season'; end if; -- bump together with SEASON in webapp/index.html
  if p_id is null or p_id <= 0 then raise exception 'bad id'; end if;
  if p_total is null or p_total < 0 or p_total >= 1e100 then raise exception 'bad total'; end if;
  nm := left(btrim(regexp_replace(coalesce(p_name, ''), '[[:cntrl:]]', '', 'g')), 24);
  if nm = '' then nm := 'Игрок'; end if;
  av := greatest(0, least(coalesce(p_avatar, 0), 200));

  select * into cur from public.leaderboard where tg_id = p_id;
  if not found then
    insert into public.leaderboard (tg_id, name, total, rebirths, league, skin, avatar)
    values (p_id, nm, p_total, greatest(0, least(coalesce(p_rebirths, 0), 1000000)), greatest(0, least(coalesce(p_league, 0), 200)), left(p_skin, 24), av);
    v_total := p_total;
  elsif now() - cur.updated_at >= interval '10 seconds' then
    v_total := greatest(cur.total, least(p_total, greatest(cur.total * 10, 10000000)));
    update public.leaderboard set
      name = nm,
      total = v_total,
      rebirths = greatest(cur.rebirths, least(coalesce(p_rebirths, 0), 1000000)),
      league = greatest(cur.league, least(greatest(coalesce(p_league, 0), 0), 200)),
      skin = left(p_skin, 24),
      avatar = av,
      updated_at = now()
    where tg_id = p_id;
  else
    v_total := cur.total;
  end if;

  return query select
    (select count(*) + 1 from public.leaderboard where total > v_total),
    (select count(*) from public.leaderboard);
end;
$$;

-- Lets a player remove their own row (the "show me in the top" switch).
create or replace function public.leave_top(p_id bigint)
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.leaderboard where tg_id = p_id;
$$;

revoke all on function public.submit_score(bigint, text, numeric, integer, integer, text, integer, integer) from public;
revoke all on function public.leave_top(bigint) from public;
grant execute on function public.submit_score(bigint, text, numeric, integer, integer, text, integer, integer) to anon, authenticated;
grant execute on function public.leave_top(bigint) to anon, authenticated;

-- Starting a new season clears the board once:
--   truncate public.leaderboard;
