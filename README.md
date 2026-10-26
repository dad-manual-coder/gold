# GoldDesk

XAU/USD command center anchored to Banjul time (GMT, no daylight saving).

Tagline: know the session, know the risk, trade the gold.

The clock you trade against is Africa/Banjul. London, New York, and Sydney shift themselves for daylight saving, so the session times stay right in summer and in winter. From late October to late March, London is on the same hour as Banjul. The rest of the year London is one hour ahead. You do not do that math.

This is a desk, not a broker. It does not place orders, and the spot number is an indication, not a quote to size a trade from.

## Open it

1. Open `index.html`.
2. The boot screen reads the device (clock, network, Banjul offset, London / New York / Sydney daylight saving, screen, hardware, storage) and then loads the desk files.
3. The gate stays shut under 50%. Once the desk is at least half loaded, it opens `desk.html` on its own.
4. If a file check fails, use **Open the desk**. The clock still runs.

GitHub Pages needs `index.html` as the front door. That file is the loader. The desk itself is `desk.html`.

Two copies of the site sit in this project, and they match:

| Folder | Use |
|---|---|
| `public/` | The copy the app serves. |
| `docs/` | The same files, if you publish GitHub Pages from `/docs`. |

Publish one of those folders. Do not split files across them.

## What you see

A dark charcoal desk (`#0B0E11`) with gold (`#D4AF37`). Type is IBM Plex Sans and IBM Plex Mono. It works on a phone and on a laptop. On a phone, a bottom bar holds Desk, Sessions, Risk, Book, and More. On a wide screen, the section links sit in the header and the bottom bar hides. The whole page scrolls, including the clock and the session bar.

The line under the clocks is the status: market open or closed, which session is live, liquidity, and the next thing on the clock.

### Desk

Home. Banjul time and date, a greeting that changes with the session, market open / closed / opening soon, the session ribbon (Sydney, Tokyo, London, New York), liquidity right now, the next event with a countdown, and a volatility warning when the clock is inside a red-flag window (rollover, Friday close, Sunday reopen, a holiday, or 30 minutes around FOMC, NFP, or CPI).

Also on this screen: a spot indication, Banjul weather, and a short state-check reminder.

### Sessions

Live offsets for Banjul, London, New York, Tokyo, and Sydney, plus whether each city is on standard time or daylight time.

Session windows, shown on the Banjul clock:

| Session | Your clock |
|---|---|
| Sydney | 21:00 – 06:00 |
| Tokyo | 00:00 – 09:00 |
| London | 08:00 – 17:00 in winter. 07:00 – 16:00 while London is on summer time. |
| New York | 13:00 – 22:00 in winter. 12:00 – 21:00 while New York is on summer time. |
| London / New York overlap | The four hours both are open. Winter: 13:00 – 17:00. |

Gold’s usual cash week: opens Sunday 22:00 your time, closes Friday 21:00 your time.

### Risk

A traffic light for every hour of the Banjul day.

- **High:** London open drive, New York open, and the overlap.
- **Medium:** mid-London and mid-New York. A-setups only.
- **Low / danger:** 21:00–23:00 rollover (spreads widen; do not enter), Friday after 20:00, the first two hours of the Sunday reopen, Christmas, New Year, US Thanksgiving, and 30 minutes before and after FOMC, NFP, and CPI.

Each danger block says why and what to do: wait, cut size, or skip.

### Calendar

Scheduled 2026 USD and gold-relevant prints (CPI, PPI, retail sales, claims, FOMC, GDP, PCE, JOLTS, NFP) with the red-flag window marked. Confirm the agency time the week of the release. Dates here are the schedule that was written in, not a live wire.

Links out, not embedded feeds: Forex Factory, Investing.com, Kitco, Bloomberg Commodities, Reuters Commodities, FXStreet XAU/USD, DailyFX.

Accounts to follow, as links only: @RealKitco, @GoldCouncil, @FXstreetNews, @investingcom, @DailyFX, @zerohedge, @FirstSquawk, @DeItaone.

### Playbook

Ten setups. Search them. Each card is setup, trigger, entry, stop, target, invalidation, and a note.

1. London Breakout
2. NY Reversal
3. NFP Friday
4. FOMC Day
5. Rollover Danger
6. Sunday Gap
7. Risk-Off Spike
8. DXY Divergence
9. Asian Range Fade
10. Friday Close Rule

If the trigger is not there, it is not the trade.

### Mindset

A gate, not a quote. Check slept, fed, angry, and revenge urge before you size anything. Three losses on the Banjul day and the rules say stop. After two losses you can start a 30-minute lockout.

The journal logs setup, emotion, spread at entry, grade (A-setup or bored trade), and result (win, loss, scratch). It keeps the last 200 entries on this device.

### Gambia

Banjul time, sunrise and sunset when the timetable answers, and countdowns for the weekly open, London open, New York open, and the Friday close. Prayer times for Banjul (Fajr, Dhuhr, Asr, Maghrib, Isha) are optional flavor. The desk does not block a trade on them.

### Alerts

Toasts always show in the page. A system notification needs permission, and the tab has to stay allowed to notify.

- 15 minutes before London open
- New York open
- 30 minutes before a high-impact USD print (CPI, NFP, FOMC)
- Rollover at 21:00
- Friday close at 20:00
- Sunday, inside the last hour before the reopen

London and New York warnings use the live open, so summer and winter are already handled.

## Files

| File | Role |
|---|---|
| `index.html` | Boot screen. Device checks, 50% gate, then the desk. |
| `loader.css` | Boot screen styles. |
| `desk.html` | The desk. All eight sections live in this one page. |
| `desk.css` | Desk styles. |
| `desk.js` | Clock, sessions, liquidity, calendar, playbook, journal, alerts. |
| `favicon.svg` | Icon. |
| `manifest.webmanifest` | Installable app. Home-screen start is `desk.html`. |

Sections are hashes on `desk.html`: `#desk`, `#sessions`, `#liquidity`, `#calendar`, `#playbook`, `#mindset`, `#gambia`, `#alerts`. A hash on the loader is carried through to the desk when it is one of those names.

## What it remembers

One key in local storage: `golddesk.v1`.

That holds the journal, the daily state check, alert toggles, which alerts already fired, and a lockout timer. Nothing is sent to an account. Clearing site data clears the journal.

## Outside data

These are optional. If a feed is quiet, the clock still runs.

| Feed | Used for |
|---|---|
| `api.gold-api.com` | Spot indication, labeled as not a broker quote. |
| Open-Meteo | Banjul temperature and wind. |
| Aladhan | Banjul prayer times and sunrise / sunset. Muslim World League method. |

Fonts load from Google Fonts (IBM Plex). If they do not, the desk falls back to the system sans and mono.

## Install

Use the browser’s install / Add to Home Screen. The manifest name is GoldDesk, the theme color is `#0B0E11`, and the installed icon opens `desk.html` directly (it skips the boot screen).

## Clock rules worth remembering

- Banjul does not observe daylight saving. The desk never “corrects” your city onto London.
- Session opens for London and New York are computed from those cities’ own clocks, then shown in Banjul time.
- Market hours used here: closed from Friday 21:00 until Sunday 22:00, Banjul.
- Rollover warning: 21:00–23:00 Banjul, every weekday the market is open.
- A holiday on the built-in list (Thanksgiving 2026, Christmas, New Year) is treated as a thin day even if the clock says a session is open.
