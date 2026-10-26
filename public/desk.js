(() => {
  "use strict";

  const Z = {
    banjul: "Africa/Banjul",
    london: "Europe/London",
    ny: "America/New_York",
    tokyo: "Asia/Tokyo",
    sydney: "Australia/Sydney",
  };

  const WEEK = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const NAV = [
    ["desk", "Desk"],
    ["sessions", "Sessions"],
    ["liquidity", "Risk"],
    ["calendar", "Calendar"],
    ["playbook", "Playbook"],
    ["mindset", "Mindset"],
    ["gambia", "Gambia"],
    ["alerts", "Alerts"],
  ];
  const KEY = "golddesk.v1";

  const SESSIONS = [
    { id: "sydney", name: "Sydney", tz: Z.sydney, open: 7, close: 16, blurb: "First prices of the week. Books are thin — trust ranges more than breakouts." },
    { id: "tokyo", name: "Tokyo", tz: Z.tokyo, open: 9, close: 18, blurb: "Asian range. Gold usually mean-reverts here unless a headline forces it." },
    { id: "london", name: "London", tz: Z.london, open: 8, close: 17, blurb: "The breakout session. Real size arrives with the City." },
    { id: "newyork", name: "New York", tz: Z.ny, open: 8, close: 17, blurb: "US data and the overlap. Where the day's high or the day's trap is made." },
  ];

  const EVENTS = [
    { id: "sentiment-2026-10", name: "U. Michigan sentiment", impact: "medium", family: "other", y: 2026, m: 10, d: 9, h: 10, min: 0, note: "October preliminary. 10:00 ET. Can nudge gold, rarely trends it alone." },
    { id: "cpi-2026-10", name: "US CPI", impact: "high", family: "cpi", y: 2026, m: 10, d: 14, h: 8, min: 30, note: "September CPI. 8:30 ET. Red-flag window is 30 minutes either side." },
    { id: "ppi-2026-10", name: "US PPI", impact: "medium", family: "other", y: 2026, m: 10, d: 15, h: 8, min: 30, note: "September PPI. 8:30 ET. Same morning as retail sales." },
    { id: "retail-2026-10", name: "US retail sales", impact: "medium", family: "other", y: 2026, m: 10, d: 15, h: 8, min: 30, note: "September retail sales. 8:30 ET." },
    { id: "claims-2026-10-15", name: "Jobless claims", impact: "medium", family: "other", y: 2026, m: 10, d: 15, h: 8, min: 30, note: "Weekly claims. 8:30 ET." },
    { id: "claims-2026-10-22", name: "Jobless claims", impact: "medium", family: "other", y: 2026, m: 10, d: 22, h: 8, min: 30, note: "Weekly claims. 8:30 ET. London is still on summer time until the 25th." },
    { id: "fomc-2026-10", name: "FOMC decision", impact: "high", family: "fomc", y: 2026, m: 10, d: 28, h: 14, min: 0, note: "October meeting. Statement 14:00 ET, press conference follows. Two-phase day." },
    { id: "gdp-2026-10", name: "US GDP advance", impact: "medium", family: "other", y: 2026, m: 10, d: 29, h: 8, min: 30, note: "Q3 advance estimate. 8:30 ET." },
    { id: "pce-2026-10", name: "US PCE", impact: "high", family: "other", y: 2026, m: 10, d: 29, h: 8, min: 30, note: "September PCE. 8:30 ET. The Fed's preferred inflation print." },
    { id: "jolts-2026-11", name: "JOLTS", impact: "medium", family: "other", y: 2026, m: 11, d: 3, h: 10, min: 0, note: "September openings. 10:00 ET." },
    { id: "nfp-2026-11", name: "Non-Farm Payrolls", impact: "high", family: "nfp", y: 2026, m: 11, d: 6, h: 8, min: 30, note: "October jobs report. 8:30 ET. Do not be in a position 30 minutes prior." },
    { id: "nfp-2026-12", name: "Non-Farm Payrolls", impact: "high", family: "nfp", y: 2026, m: 12, d: 4, h: 8, min: 30, note: "November jobs report, first Friday. Confirm the BLS release the week before." },
    { id: "fomc-2026-12", name: "FOMC decision", impact: "high", family: "fomc", y: 2026, m: 12, d: 9, h: 14, min: 0, note: "December meeting with projections. Statement 14:00 ET." },
  ];

  const HOLIDAYS = [
    { y: 2026, m: 11, d: 26, name: "US Thanksgiving", hard: false },
    { y: 2026, m: 11, d: 27, name: "Day after Thanksgiving", hard: false },
    { y: 2026, m: 12, d: 24, name: "Christmas Eve", hard: false },
    { y: 2026, m: 12, d: 25, name: "Christmas Day", hard: true },
    { y: 2027, m: 1, d: 1, name: "New Year's Day", hard: true },
  ];

  const PLAYS = [
    { name: "London Breakout", summary: "Asia ranged. London decides.", setup: "Asian session held a tight range — ideally under about $15–20 on spot, no news spike inside it.", trigger: "A full candle close outside that range after 08:00 London, not a wick.", entry: "Buy the break of the Asian high or sell the break of the Asian low. Skip it if the break already ran.", stop: "Other side of the range, or one times the Asian range beyond the break candle. If that distance is absurd, the range was not tight — pass.", target: "One times the Asian range, then the next obvious London high or low. Scale half.", invalidation: "Price back inside the Asian range and holding. The breakout failed.", note: "The trade is the range. No range, no trade. A trending Asia is not this setup." },
    { name: "NY Reversal", summary: "London ran. New York traps it.", setup: "London pushed gold one way into an obvious high, low, or round number.", trigger: "In the first hour of New York, price takes that London extreme and closes back inside the London impulse.", entry: "Fade the sweep. Enter on the close back through the level, not on the wick.", stop: "Beyond the sweep extreme. If the stop is wider than the move you are fading, you are late.", target: "Mean of the London range, then the London open. Do not demand a full reversal to Asia.", invalidation: "New York accepts beyond the sweep — two closes outside. That is continuation.", note: "You are trading the failure, not your opinion that gold went too far." },
    { name: "NFP Friday", summary: "Flat into the number. Trade the second move.", setup: "First Friday, 08:30 New York. The 30 minutes before the print are not a strategy.", trigger: "After the print, the first spike either holds a new range or gives the spike back within 5–15 minutes.", entry: "No entry before 08:30. After, trade the retracement of the first spike, or the first pullback in the direction that holds.", stop: "Other side of the post-news spike. Wider than a normal day. Size down until the dollar risk matches a normal trade.", target: "The pre-release consolidation, or a measured move of the spike. Be done before lunch if the range is already huge.", invalidation: "You are still in from before the number. Flatten.", note: "The first tick pays the market maker. The second move pays the patient." },
    { name: "FOMC Day", summary: "Chop, then a statement, then a trend.", setup: "Decision day. Phase one is the hours before 14:00 New York. Phase two starts at the statement.", trigger: "The statement candle plus the first pullback after the press conference opens, not the spike on the headline word.", entry: "Flat through 13:30–14:15 New York unless that reaction is already your specialty. Then trade the first flag that survives.", stop: "Beyond the statement spike. Assume it will be wider than you want.", target: "Partial at 1R. Trail only if you will not babysit it through rollover.", invalidation: "Price back through the pre-statement range and stuck there. The trend was a headline wick.", note: "Two phases. If you treat the morning like a normal London day you will donate it." },
    { name: "Rollover Danger", summary: "21:00–23:00 GMT. Not a session. A toll booth.", setup: "Any open trade whose stop is tighter than a widened gold spread.", trigger: "The clock. Not a candle.", entry: "There is no entry. This card exists so you do not invent one.", stop: "If you must hold a swing, the stop has to survive a spread that can double for a few minutes.", target: "Being flat.", invalidation: "A beautiful setup appearing at 21:40. It is the spread wearing a costume.", note: "Swaps, funding, and a thinner book. Gold does not pay you for being awake at the toll booth." },
    { name: "Sunday Gap", summary: "The reopen is a gap. Treat it like one.", setup: "You either held over the weekend on purpose, or you are flat and watching the reopen.", trigger: "The first print versus Friday's close. Measure the gap before you name it a trend.", entry: "If you held: do nothing for the first hour unless Friday's stop is hit. If you are flat: no trade until a range exists.", stop: "The stop from Friday, already placed. Moving it because the gap looks wrong is how weekends get expensive.", target: "Gap fill back toward Friday's close is a later trade, not the first minute.", invalidation: "The gap keeps going and accepts. Fill is off. You are early, not right.", note: "Holding the weekend is allowed. Discovering on Sunday that you held it is not." },
    { name: "Risk-Off Spike", summary: "War, shock, flight to safety.", setup: "A genuine shock. Gold spikes while yields and equities do something ugly.", trigger: "The spike pauses. The first pullback holds above the pre-headline base.", entry: "Do not chase the vertical bar. Buy the first higher-low after the shock, smaller than a normal day, or stay out.", stop: "Under the pullback low. If that is far away, the trade is too late, which is also a position.", target: "Extension of the spike, then done. These moves overshoot and mean-revert the next session.", invalidation: "Gold and the dollar both ripping and the spike cannot hold its low.", note: "Safe-haven gold and everything-is-selling gold are different animals. Name which one you have." },
    { name: "DXY Divergence", summary: "Dollar up and gold up. Rare. Dangerous.", setup: "The dollar and XAU rising together for more than a few minutes. The usual inverse is broken.", trigger: "Do not fade it because a textbook says they inverse. Wait until one of them breaks its own intraday structure.", entry: "Only with the one that breaks first, in the direction of the break. Half size.", stop: "Tight to the structure that just broke. If you need a story to justify the stop, you do not have a stop.", target: "A return to correlation. Take the reconciliation, not a new thesis.", invalidation: "They resume the usual inverse before you are in. The divergence trade is over.", note: "When both rise, someone is wrong on a short horizon. You do not have to be the one who finds out first." },
    { name: "Asian Range Fade", summary: "Advanced only. Low-liquidity scalp.", setup: "Tokyo hours, no red-flag news, gold tagged the edge of a developing Asian range twice.", trigger: "Rejection wick back inside the range during Tokyo, with London still hours away.", entry: "Fade the edge back to the midpoint. One unit. This is a scalp, not a campaign.", stop: "A few ticks beyond the wick. If it accepts outside, you are wrong immediately.", target: "Mid-range. Exit there. The other side is greed.", invalidation: "Any scheduled USD print, or London open inside the next hour.", note: "If you need this trade to make your day, you are not advanced. You are bored." },
    { name: "Friday Close Rule", summary: "Flat by 20:00 GMT unless the hold is written down.", setup: "It is Friday. You have a position. The weekend exists.", trigger: "20:00 on your Banjul clock.", entry: "No new entries after the warning. The week already offered its trades.", stop: "If you keep a position, the stop stays where the original plan put it.", target: "Cash. Or a written sentence: why this specific position is allowed to gap.", invalidation: "A new idea after 20:00. It can wait until Sunday's range exists.", note: "Most weekend disasters were Friday leftovers, not plans." },
  ];

  const LINKS = [
    ["Forex Factory", "https://www.forexfactory.com/calendar", "Calendar"],
    ["Investing.com", "https://www.investing.com/economic-calendar/", "Calendar"],
    ["Kitco News", "https://www.kitco.com/news", "Gold"],
    ["Bloomberg Commodities", "https://www.bloomberg.com/markets/commodities", "Cross-asset"],
    ["Reuters Commodities", "https://www.reuters.com/markets/commodities/", "Metals"],
    ["FXStreet XAU/USD", "https://www.fxstreet.com/commodities/gold", "Spot"],
    ["DailyFX Gold", "https://www.dailyfx.com/gold-price", "Gold"],
  ];

  const ACCOUNTS = [
    ["@RealKitco", "https://x.com/RealKitco"],
    ["@GoldCouncil", "https://x.com/GoldCouncil"],
    ["@FXstreetNews", "https://x.com/FXstreetNews"],
    ["@investingcom", "https://x.com/investingcom"],
    ["@DailyFX", "https://x.com/DailyFX"],
    ["@zerohedge", "https://x.com/zerohedge"],
    ["@FirstSquawk", "https://x.com/FirstSquawk"],
    ["@DeItaone", "https://x.com/DeItaone"],
  ];

  const fmtCache = new Map();
  function formatter(timeZone) {
    let hit = fmtCache.get(timeZone);
    if (!hit) {
      hit = new Intl.DateTimeFormat("en-US", {
        timeZone, hourCycle: "h23", weekday: "short", year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
      });
      fmtCache.set(timeZone, hit);
    }
    return hit;
  }

  function parts(date, timeZone) {
    const bag = {};
    formatter(timeZone).formatToParts(date).forEach((p) => { if (p.type !== "literal") bag[p.type] = p.value; });
    let hour = Number(bag.hour);
    if (hour === 24) hour = 0;
    return {
      year: Number(bag.year), month: Number(bag.month), day: Number(bag.day),
      hour, minute: Number(bag.minute), second: Number(bag.second),
      weekday: WEEK[bag.weekday] ?? 0, weekdayShort: bag.weekday || "",
    };
  }

  function zoned(date, timeZone) {
    const p = parts(date, timeZone);
    const asUTC = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
    return { ...p, timeZone, offsetMinutes: Math.round((asUTC - date.getTime()) / 60000) };
  }

  function offsetMinutes(date, timeZone) { return zoned(date, timeZone).offsetMinutes; }

  function zonedDateTime(year, month, day, hour, minute, timeZone) {
    const guess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
    const off1 = offsetMinutes(guess, timeZone);
    let utc = new Date(guess.getTime() - off1 * 60000);
    const off2 = offsetMinutes(utc, timeZone);
    if (off2 !== off1) utc = new Date(guess.getTime() - off2 * 60000);
    return utc;
  }

  function addDays(year, month, day, days) {
    const dt = new Date(Date.UTC(year, month - 1, day + days));
    return { year: dt.getUTCFullYear(), month: dt.getUTCMonth() + 1, day: dt.getUTCDate() };
  }

  function pad(n) { return String(n).padStart(2, "0"); }
  function clock(p, withSeconds = true) {
    const hm = pad(p.hour) + ":" + pad(p.minute);
    return withSeconds ? hm + ":" + pad(p.second) : hm;
  }
  function formatOffset(mins) {
    const sign = mins < 0 ? "-" : "+";
    const abs = Math.abs(mins);
    const h = Math.floor(abs / 60);
    const m = abs % 60;
    return m ? "UTC" + sign + h + ":" + pad(m) : "UTC" + sign + h;
  }
  function formatRemain(ms) {
    const total = Math.floor(Math.max(0, ms) / 1000);
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const mins = Math.floor((total % 3600) / 60);
    const secs = total % 60;
    const hms = pad(hours) + ":" + pad(mins) + ":" + pad(secs);
    return days > 0 ? days + "d " + hms : hms;
  }
  function longDate(p) {
    const name = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][p.weekday];
    return name + " " + p.day + " " + MONTHS[p.month - 1] + " " + p.year;
  }
  function dayKey(p) { return p.year + "-" + pad(p.month) + "-" + pad(p.day); }
  function isDST(date, timeZone) {
    const year = zoned(date, timeZone).year;
    const jan = offsetMinutes(new Date(Date.UTC(year, 0, 15, 12)), timeZone);
    const jul = offsetMinutes(new Date(Date.UTC(year, 6, 15, 12)), timeZone);
    return offsetMinutes(date, timeZone) > Math.min(jan, jul);
  }

  function session(id) { return SESSIONS.find((s) => s.id === id); }

  function calendar() {
    return EVENTS.map((event) => ({ ...event, at: zonedDateTime(event.y, event.m, event.d, event.h, event.min, Z.ny) }))
      .sort((a, b) => a.at - b.at);
  }

  function holidayOn(now) {
    const ny = zoned(now, Z.ny);
    return HOLIDAYS.find((h) => h.y === ny.year && h.m === ny.month && h.d === ny.day) || null;
  }

  function isMarketOpen(now) {
    if (holidayOn(now)?.hard) return false;
    const ny = zoned(now, Z.ny);
    const mins = ny.hour * 60 + ny.minute;
    if (ny.weekday === 6) return false;
    if (ny.weekday === 0 && mins < 17 * 60) return false;
    if (ny.weekday === 5 && mins >= 17 * 60) return false;
    return true;
  }

  function nextMarketChange(now) {
    const ny = zoned(now, Z.ny);
    const mins = ny.hour * 60 + ny.minute;
    if (isMarketOpen(now)) {
      const add = (5 - ny.weekday + 7) % 7;
      const d = addDays(ny.year, ny.month, ny.day, add);
      return { kind: "close", at: zonedDateTime(d.year, d.month, d.day, 17, 0, Z.ny) };
    }
    if (ny.weekday === 0 && mins < 17 * 60) return { kind: "open", at: zonedDateTime(ny.year, ny.month, ny.day, 17, 0, Z.ny) };
    if (ny.weekday === 6) {
      const d = addDays(ny.year, ny.month, ny.day, 1);
      return { kind: "open", at: zonedDateTime(d.year, d.month, d.day, 17, 0, Z.ny) };
    }
    if (ny.weekday === 5 && mins >= 17 * 60) {
      const d = addDays(ny.year, ny.month, ny.day, 2);
      return { kind: "open", at: zonedDateTime(d.year, d.month, d.day, 17, 0, Z.ny) };
    }
    if (holidayOn(now)?.hard) {
      const d = addDays(ny.year, ny.month, ny.day, 1);
      const probe = zonedDateTime(d.year, d.month, d.day, 12, 0, Z.ny);
      if (!isMarketOpen(probe) && zoned(probe, Z.ny).weekday === 6) {
        const sun = addDays(d.year, d.month, d.day, 1);
        return { kind: "open", at: zonedDateTime(sun.year, sun.month, sun.day, 17, 0, Z.ny) };
      }
      if (zoned(probe, Z.ny).weekday === 0) return { kind: "open", at: zonedDateTime(d.year, d.month, d.day, 17, 0, Z.ny) };
      return { kind: "open", at: zonedDateTime(d.year, d.month, d.day, 0, 0, Z.ny) };
    }
    return { kind: "open", at: new Date(now.getTime() + 60000) };
  }

  function marketStatus(now) {
    const next = nextMarketChange(now);
    const delta = next.at.getTime() - now.getTime();
    if (!isMarketOpen(now)) {
      const soon = next.kind === "open" && delta <= 3600000;
      const hard = holidayOn(now);
      return {
        state: soon ? "opening" : "closed",
        label: soon ? "OPENING SOON" : "CLOSED",
        detail: hard?.hard ? hard.name + ". Spot books are shut." : "Forex gold runs Sunday 17:00 to Friday 17:00 New York.",
        next,
      };
    }
    return { state: "open", label: "OPEN", detail: "Spot XAU is live. Session quality still depends on who is in the chair.", next };
  }

  function isSessionOpen(now, s) {
    const p = zoned(now, s.tz);
    const mins = p.hour * 60 + p.minute;
    return mins >= s.open * 60 && mins < s.close * 60;
  }
  function isSessionLive(now, s) { return isMarketOpen(now) && isSessionOpen(now, s); }

  function nextSessionBoundary(now, s) {
    const p = zoned(now, s.tz);
    const mins = p.hour * 60 + p.minute;
    if (mins >= s.open * 60 && mins < s.close * 60) return { kind: "close", at: zonedDateTime(p.year, p.month, p.day, s.close, 0, s.tz) };
    if (mins < s.open * 60) return { kind: "open", at: zonedDateTime(p.year, p.month, p.day, s.open, 0, s.tz) };
    const d = addDays(p.year, p.month, p.day, 1);
    return { kind: "open", at: zonedDateTime(d.year, d.month, d.day, s.open, 0, s.tz) };
  }

  function windowOnClock(now, s) {
    const p = zoned(now, s.tz);
    const open = zoned(zonedDateTime(p.year, p.month, p.day, s.open, 0, s.tz), Z.banjul);
    const close = zoned(zonedDateTime(p.year, p.month, p.day, s.close, 0, s.tz), Z.banjul);
    const wrap = close.hour * 60 + close.minute <= open.hour * 60 + open.minute;
    return clock(open, false) + "–" + clock(close, false) + (wrap ? " +1" : "");
  }

  function weekOpen(now) {
    if (!isMarketOpen(now)) return null;
    const ny = zoned(now, Z.ny);
    const d = addDays(ny.year, ny.month, ny.day, -ny.weekday);
    return zonedDateTime(d.year, d.month, d.day, 17, 0, Z.ny);
  }

  function redFlag(now) {
    for (const event of calendar()) {
      if (event.family !== "cpi" && event.family !== "nfp" && event.family !== "fomc") continue;
      if (Math.abs(now.getTime() - event.at.getTime()) <= 30 * 60 * 1000) return event;
    }
    return null;
  }

  function liquidity(now) {
    if (!isMarketOpen(now)) {
      const hard = holidayOn(now);
      return {
        level: "low", title: "CLOSED",
        why: hard?.hard ? hard.name + ". There is no honest spread to trade." : "The gold week is shut. Sunday's open is where gaps live.",
        action: "Do nothing. Set the Sunday alert if you insist on watching the open.",
      };
    }
    const holiday = holidayOn(now);
    if (holiday) return { level: "danger", title: "HOLIDAY", why: holiday.name + ". Banks are out, spreads lie, and a quiet tape fakes a breakout.", action: "Stand aside or cut size to something you can ignore." };
    const news = redFlag(now);
    if (news) {
      const before = now < news.at;
      return {
        level: "danger", title: news.name.toUpperCase(),
        why: before ? news.name + " prints inside 30 minutes. The first tick is a trap more often than a signal." : news.name + " just printed. The first move whipsaws. The second move tends to stick.",
        action: before ? "Be flat." : "Wait for the first impulse to fail or hold. Then trade smaller.",
      };
    }
    const g = zoned(now, Z.banjul);
    const ny = zoned(now, Z.ny);
    if ((g.weekday === 5 && g.hour >= 20) || (ny.weekday === 5 && ny.hour >= 16)) {
      return { level: "danger", title: "FRIDAY CLOSE", why: "After 20:00 your time, weekend gap risk is no longer theoretical.", action: "Close anything you would hate to see on Sunday." };
    }
    const opened = weekOpen(now);
    if (opened && now - opened >= 0 && now - opened < 2 * 3600000) {
      return { level: "danger", title: "SUNDAY OPEN", why: "The first two hours after the reopen are gappy. Quotes jump more than they trade.", action: "Let the first range print. Fade nothing." };
    }
    if (g.hour === 21 || g.hour === 22 || (ny.hour * 60 + ny.minute >= 16 * 60 + 45 && ny.hour * 60 + ny.minute < 18 * 60 + 30)) {
      return { level: "danger", title: "ROLLOVER", why: "21:00–23:00 your time is when swaps hit and spreads explode.", action: "Do not enter. Be flat, or accept a wider stop." };
    }
    const london = isSessionLive(now, session("london"));
    const nyLive = isSessionLive(now, session("newyork"));
    const ldn = zoned(now, Z.london);
    const nyk = zoned(now, Z.ny);
    if (london && nyLive) return { level: "high", title: "HIGH", why: "London and New York are both in the chair. This is the deepest stretch gold gets.", action: "Your best trades live here. One clean idea." };
    if (london && ldn.hour >= 8 && ldn.hour < 10) return { level: "high", title: "HIGH", why: "London open drive. The Asian range either breaks or rejects.", action: "Trade the break only if Asia actually ranged." };
    if (nyLive && nyk.hour >= 8 && nyk.hour < 10) return { level: "high", title: "HIGH", why: "New York open. London's move gets challenged, continued, or faded.", action: "Wait out the first 15 minutes if the calendar is hot." };
    if (london || nyLive) return { level: "medium", title: "MEDIUM", why: london ? "Mid-London. Liquid enough, but the open impulse is spent." : "Mid-New York. Still tradable, no longer the overlap.", action: "A-setups only. Boredom is not a signal." };
    if (isSessionLive(now, session("tokyo"))) return { level: "low", title: "LOW", why: "Tokyo is printing the Asian range. Moves look real and often are not.", action: "Scalp only if that is already the plan. Otherwise wait for London." };
    if (isSessionLive(now, session("sydney"))) return { level: "low", title: "LOW", why: "Sydney only. Spreads are honest until they aren't.", action: "Wait for London unless the plan was written for this." };
    return { level: "low", title: "LOW", why: "Between the main sessions. Liquidity is a rumor.", action: "Wait for London." };
  }

  function phaseName(now) {
    if (!isMarketOpen(now)) return zoned(now, Z.ny).weekday === 6 || zoned(now, Z.ny).weekday === 0 ? "Weekend" : "Off hours";
    if (isSessionLive(now, session("london")) && isSessionLive(now, session("newyork"))) return "London/NY Overlap";
    if (isSessionLive(now, session("london"))) return "London";
    if (isSessionLive(now, session("newyork"))) return "New York";
    if (isSessionLive(now, session("tokyo"))) return "Tokyo";
    if (isSessionLive(now, session("sydney"))) return "Sydney";
    return "Between sessions";
  }

  function nextCue(now) {
    const cues = [];
    const market = nextMarketChange(now);
    cues.push({ name: market.kind === "open" ? "Market open" : "Market close", at: market.at });
    SESSIONS.forEach((s) => {
      const boundary = nextSessionBoundary(now, s);
      if (boundary.at <= now) return;
      if (boundary.kind === "open" && !isMarketOpen(new Date(boundary.at.getTime() + 1000))) return;
      if (boundary.kind === "close" && !isSessionLive(now, s)) return;
      cues.push({ name: s.name + " " + boundary.kind, at: boundary.at });
    });
    calendar().forEach((event) => { if (event.at > now) cues.push({ name: event.name, at: event.at }); });
    cues.sort((a, b) => a.at - b.at);
    return cues.find((cue) => cue.at > now) || { name: "Market open", at: market.at };
  }

  function statusLine(now) {
    const market = marketStatus(now);
    const liq = liquidity(now);
    const cue = nextCue(now);
    const remain = formatRemain(cue.at - now);
    const londonOff = zoned(now, Z.london).offsetMinutes;
    const clockNote = londonOff === 0 ? "You're on GMT — no math needed." : "London is on summer time. Your desk is still GMT.";
    const liqBit = liq.level === "danger" ? "DANGER · " + liq.title : liq.level === "high" ? "HIGH liquidity" : liq.level === "medium" ? "MEDIUM liquidity" : liq.title === "CLOSED" ? "market shut" : "LOW liquidity";
    const state = market.state === "open" ? "MARKET OPEN" : market.state === "opening" ? "OPENING SOON" : "MARKET CLOSED";
    const tone = market.state === "closed" ? "down" : liq.level === "danger" ? "warn" : "up";
    return { tone, text: state + " · " + phaseName(now) + " · " + liqBit + " · Next: " + cue.name + " in " + remain + " · " + clockNote };
  }

  function greeting(now) {
    const hour = zoned(now, Z.banjul).hour;
    const title = hour >= 5 && hour < 12 ? "Good morning, trader." : hour >= 12 && hour < 17 ? "Good afternoon." : hour >= 17 && hour < 22 ? "Good evening." : "Late night.";
    if (!isMarketOpen(now)) {
      const next = nextMarketChange(now);
      return { title, line: next.kind === "open" ? "Gold is closed. The market opens in " + formatRemain(next.at - now) + "." : "Gold is closed." };
    }
    if (hour >= 5 && hour < 12) {
      const boundary = nextSessionBoundary(now, session("london"));
      const asia = isSessionLive(now, session("tokyo")) ? "Tokyo is still live." : "The Asian session is wrapping up.";
      const lon = isSessionLive(now, session("london")) ? "London is already open." : "London opens in " + formatRemain(boundary.at - now) + ".";
      return { title, line: asia + " " + lon };
    }
    if (hour >= 12 && hour < 17) {
      if (isSessionLive(now, session("london")) && isSessionLive(now, session("newyork"))) return { title, line: "London/NY overlap — prime liquidity window." };
      if (isSessionLive(now, session("london"))) return { title, line: "London is active. New York has not taken the book yet." };
      return { title, line: "Afternoon in Banjul. Read the ribbon before you assume the overlap." };
    }
    if (hour >= 17 && hour < 22) return { title, line: isSessionLive(now, session("newyork")) ? "New York session active. Watch for US data." : "New York has faded. What is left is a thinner market." };
    return { title, line: "Low liquidity. Consider stepping away." };
  }

  function rhythm(now) {
    const g = zoned(now, Z.banjul);
    const hm = clock(g, false);
    if (!isMarketOpen(now)) {
      const next = nextMarketChange(now);
      return next.kind === "open" ? "It's " + hm + " in Banjul. Markets open in " + formatRemain(next.at - now) + "." : "It's " + hm + " in Banjul. The gold week is shut.";
    }
    if (isSessionLive(now, session("london")) && isSessionLive(now, session("newyork"))) return "It's " + hm + " — you're in the London/NY overlap, the best stretch of your trading day. Focus here.";
    if (isSessionLive(now, session("london"))) {
      const ny = nextSessionBoundary(now, session("newyork"));
      return "It's " + hm + ". London is open. New York " + (ny.kind === "open" ? "joins in " + formatRemain(ny.at - now) : "is already in") + ".";
    }
    if (isSessionLive(now, session("newyork"))) return "It's " + hm + ". New York has the book. US data is the thing that moves gold from here.";
    return "It's " + hm + ". Liquidity is thin. The next real window is London.";
  }

  function loadState() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch { return {}; }
  }
  function saveState(partial) {
    const next = { ...loadState(), ...partial };
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* blocked */ }
    return next;
  }

  function bind(map) {
    Object.entries(map).forEach(([key, value]) => {
      document.querySelectorAll('[data-bind="' + key + '"]').forEach((node) => {
        if (node.textContent !== value) node.textContent = value;
      });
    });
  }

  function node(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function external(href, title, meta) {
    const a = node("a", "", title);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    if (meta) a.append(node("span", "", meta));
    return a;
  }

  function paintRibbon(now) {
    const b = zoned(now, Z.banjul);
    const start = zonedDateTime(b.year, b.month, b.day, 0, 0, Z.banjul);
    const ribbon = document.getElementById("ribbon");
    ribbon.replaceChildren();
    ribbon.classList.toggle("is-shut", !isMarketOpen(now));
    function bars(id, test) {
      let run = null;
      for (let i = 0; i <= 288; i++) {
        const on = i < 288 && test(new Date(start.getTime() + i * 5 * 60000));
        if (on && run === null) run = i;
        if (!on && run !== null) {
          const bar = node("i", "b-" + id);
          bar.style.left = (run / 288) * 100 + "%";
          bar.style.width = ((i - run) / 288) * 100 + "%";
          ribbon.append(bar);
          run = null;
        }
      }
    }
    SESSIONS.forEach((s) => bars(s.id, (t) => isSessionOpen(t, s)));
    bars("overlap", (t) => isSessionOpen(t, session("london")) && isSessionOpen(t, session("newyork")));
    const needle = node("i", "now");
    const pct = Math.min(100, Math.max(0, ((now - start) / 86400000) * 100));
    needle.style.left = pct + "%";
    ribbon.append(needle);

    const legend = document.getElementById("legend");
    legend.replaceChildren();
    SESSIONS.forEach((s) => {
      const li = node("li");
      li.append(node("i", "swatch b-" + s.id), document.createTextNode(s.name + " " + windowOnClock(now, s)));
      legend.append(li);
    });
    const li = node("li");
    li.append(node("i", "swatch b-overlap"), document.createTextNode("Overlap " + overlapLabel(now)));
    legend.append(li);
  }

  function overlapLabel(now) {
    const b = zoned(now, Z.banjul);
    const start = zonedDateTime(b.year, b.month, b.day, 0, 0, Z.banjul);
    let open = null;
    let close = null;
    for (let i = 0; i < 288; i++) {
      const t = new Date(start.getTime() + i * 5 * 60000);
      const on = isSessionOpen(t, session("london")) && isSessionOpen(t, session("newyork"));
      if (on && !open) open = t;
      if (on) close = new Date(t.getTime() + 5 * 60000);
      if (!on && open) break;
    }
    if (!open || !close) return "—";
    return clock(zoned(open, Z.banjul), false) + "–" + clock(zoned(close, Z.banjul), false);
  }

  function paintHours(now) {
    const b = zoned(now, Z.banjul);
    const box = document.getElementById("hours");
    box.replaceChildren();
    for (let h = 0; h < 24; h++) {
      const t = zonedDateTime(b.year, b.month, b.day, h, 30, Z.banjul);
      const liq = liquidity(t);
      const cell = node("div", "hour " + liq.level + (h === b.hour ? " now" : ""), pad(h));
      cell.title = liq.title + ". " + liq.why;
      box.append(cell);
    }
  }

  function paintZones(now) {
    const body = document.getElementById("zone-table");
    body.replaceChildren();
    const rows = [
      { name: "Banjul", tz: Z.banjul, session: null },
      ...SESSIONS.map((s) => ({ name: s.name, tz: s.tz, session: s })),
    ];
    rows.forEach((row) => {
      const p = zoned(now, row.tz);
      const tr = document.createElement("tr");
      const cells = [
        row.name,
        clock(p),
        row.tz === Z.banjul ? "UTC+0" : formatOffset(p.offsetMinutes),
        row.tz === Z.banjul ? "No DST" : isDST(now, row.tz) ? "Daylight" : "Standard",
        row.session ? windowOnClock(now, row.session) : "—",
        !row.session ? "Anchor" : !isMarketOpen(now) ? "Market shut" : isSessionLive(now, row.session) ? "Live" : "Quiet",
      ];
      cells.forEach((text, i) => tr.append(node(i === 0 ? "th" : "td", "", text)));
      body.append(tr);
    });
    const notes = document.getElementById("session-notes");
    notes.replaceChildren(node("h2", "", "What the ribbon is saying"));
    const off = zoned(now, Z.london).offsetMinutes;
    notes.append(node("p", "", off === 0
      ? "London matches your clock today. From the last Sunday in October to the last Sunday in March, that is the normal state."
      : "London is on " + formatOffset(off) + " today. Add " + off / 60 + " hour to your clock to read theirs. Your session maths below are already converted."));
    SESSIONS.forEach((s) => {
      const p = node("p");
      const live = isSessionLive(now, s);
      p.append(node("strong", "", s.name + (live ? " · live" : "")), document.createTextNode(" — " + s.blurb + " On your clock: " + windowOnClock(now, s) + "."));
      notes.append(p);
    });
  }

  function paintEvents(now) {
    const box = document.getElementById("events");
    if (box.dataset.ready) return;
    box.dataset.ready = "1";
    calendar().forEach((event) => {
      const when = zoned(event.at, Z.banjul);
      const row = node("div", "entry");
      row.append(
        node("strong", "", event.name + (event.impact === "high" ? " · high" : "")),
        node("p", "mono", longDate(when) + " · " + clock(when, false) + " Banjul · " + clock(zoned(event.at, Z.ny), false) + " New York"),
        node("p", "muted", event.note),
      );
      if (event.at < now) row.style.opacity = "0.55";
      box.append(row);
    });
    const links = document.getElementById("links");
    LINKS.forEach(([title, href, meta]) => links.append(external(href, title, meta)));
    const accounts = document.getElementById("accounts");
    ACCOUNTS.forEach(([title, href]) => accounts.append(external(href, title, "X")));
  }

  function paintPlays() {
    const q = (document.getElementById("q").value || "").trim().toLowerCase();
    const box = document.getElementById("plays");
    box.replaceChildren();
    const hits = PLAYS.filter((play) => !q || (play.name + play.summary + play.setup + play.trigger + play.note).toLowerCase().includes(q));
    if (!hits.length) {
      box.append(node("p", "muted", "Nothing in the book matches that."));
      return;
    }
    hits.forEach((play) => {
      const det = document.createElement("details");
      det.className = "play";
      const sum = document.createElement("summary");
      sum.append(node("strong", "", play.name), node("em", "", play.summary));
      const body = node("div", "body");
      const dl = document.createElement("dl");
      [["Setup", play.setup], ["Trigger", play.trigger], ["Entry", play.entry], ["Stop", play.stop], ["Target", play.target], ["Invalidation", play.invalidation], ["Mental note", play.note]].forEach(([k, v]) => {
        dl.append(node("dt", "", k), node("dd", "", v));
      });
      body.append(dl);
      det.append(sum, body);
      box.append(det);
    });
  }

  function lossesToday(now) {
    const day = dayKey(zoned(now, Z.banjul));
    return (loadState().journal || []).filter((row) => row.day === day && row.result === "loss").length;
  }

  function renderJournal() {
    const box = document.getElementById("journal-list");
    box.replaceChildren();
    const rows = (loadState().journal || []).slice().reverse();
    if (!rows.length) {
      box.append(node("p", "muted", "No entries yet. Log the spread and whether it was an A-setup or a bored trade."));
      return;
    }
    rows.slice(0, 12).forEach((row) => {
      const item = node("div", "entry");
      item.append(
        node("p", "", row.setup + " · " + row.result + " · " + row.grade),
        node("p", "muted", row.emotion + (row.spread ? " · spread " + row.spread : "") + " · " + row.day),
      );
      const btn = node("button", "textbtn", "Remove");
      btn.type = "button";
      btn.addEventListener("click", () => {
        saveState({ journal: (loadState().journal || []).filter((r) => r.id !== row.id) });
        renderJournal();
        paintMind(new Date());
      });
      item.append(btn);
      box.append(item);
    });
  }

  function paintMind(now) {
    const losses = lossesToday(now);
    const lockedUntil = Number(loadState().lockoutUntil || 0);
    const locked = lockedUntil > now.getTime();
    const slept = document.getElementById("slept").checked;
    const fed = document.getElementById("fed").checked;
    const angry = document.getElementById("angry").checked;
    const revenge = document.getElementById("revenge").checked;
    const clear = slept && fed && !angry && !revenge;
    const verdict = clear ? "Clear. The gate is open. The setup still has to be one." : "Don't trade. Sleep, food, anger, or revenge is in the way. A setup will not fix that.";
    let rules = "No losses logged today. That is not a reason to go find one.";
    if (losses >= 3) rules = "You've taken " + losses + " losses today. System says: stop.";
    else if (losses === 2) rules = "Two losses. The lockout is the wall. Use it.";
    else if (losses === 1) rules = "One loss. The next trade still has to be an A-setup.";
    const lockLine = locked ? "Lockout running. " + formatRemain(lockedUntil - now) + " left. The book is still readable. New risk is not the assignment." : losses >= 2 ? "Lockout is available." : "";
    bind({ verdict, rules, "lock-line": lockLine, "state-line": clear ? "State check: clear." : "State check incomplete. Confirm sleep, food, and temper before you size anything." });
    const btn = document.getElementById("lock-btn");
    btn.hidden = losses < 2 && !locked;
    btn.disabled = locked;
    btn.textContent = locked ? "Lockout running" : "Start a 30-minute lockout";
  }

  function ensureChecks(now) {
    const day = dayKey(zoned(now, Z.banjul));
    const c = loadState().checklist || {};
    if (c.day === day) return c;
    const fresh = { slept: false, fed: false, angry: false, revenge: false, day };
    saveState({ checklist: fresh });
    return fresh;
  }

  function toast(title, body) {
    const box = document.getElementById("toasts");
    const el = node("div", "toast");
    el.append(node("strong", "", title), node("p", "", body));
    box.append(el);
    while (box.children.length > 3) box.firstChild.remove();
    setTimeout(() => el.remove(), 8000);
    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      try { new Notification(title, { body }); } catch { /* in-app toast already showed */ }
    }
  }

  function alertPrefs() {
    return { london: true, ny: true, news: true, rollover: true, friday: true, sunday: true, ...(loadState().alerts || {}) };
  }

  function collect(now) {
    const prefs = alertPrefs();
    const fired = new Set(loadState().fired || []);
    const hits = [];
    const once = (key, title, body) => { if (!fired.has(key)) hits.push({ key, title, body }); };
    const g = zoned(now, Z.banjul);
    const day = dayKey(g);
    if (prefs.london) {
      const b = nextSessionBoundary(now, session("london"));
      const ms = b.at - now;
      if (b.kind === "open" && ms > 0 && ms <= 15 * 60 * 1000) once("lon-" + b.at.getTime(), "London open", "Fifteen minutes or less. Mark the Asian range before you touch it.");
    }
    if (prefs.ny) {
      const b = nextSessionBoundary(now, session("newyork"));
      const ms = b.at - now;
      if (b.kind === "open" && ms > 0 && ms <= 15 * 60 * 1000) once("ny-" + b.at.getTime(), "New York open", "London's move is about to get a vote.");
    }
    if (prefs.news) {
      calendar().forEach((event) => {
        if (event.family !== "cpi" && event.family !== "nfp" && event.family !== "fomc") return;
        const ms = event.at - now;
        if (ms > 0 && ms <= 30 * 60 * 1000) once("news-" + event.id, event.name, "High-impact print inside 30 minutes. Be flat unless the plan was written before this.");
      });
    }
    if (prefs.rollover && (g.hour === 21 || g.hour === 22)) once("roll-" + day, "Rollover", "21:00–23:00 Banjul. Spreads widen. This is not an entry window.");
    if (prefs.friday && g.weekday === 5 && g.hour >= 20) once("fri-" + day, "Friday close", "20:00. Close what you would hate to see on Sunday.");
    if (prefs.sunday && !isMarketOpen(now)) {
      const next = nextMarketChange(now);
      const ms = next.at - now;
      if (next.kind === "open" && ms > 0 && ms <= 3600000) once("sun-" + next.at.getTime(), "Sunday open", "The gold week reopens inside the hour.");
    }
    return hits;
  }

  function cueText(now) {
    const cue = nextCue(now);
    const boundary = (id) => {
      const b = nextSessionBoundary(now, session(id));
      return (b.kind === "open" ? "opens " : "closes ") + clock(zoned(b.at, Z.banjul), false) + " · " + formatRemain(b.at - now);
    };
    const market = nextMarketChange(now);
    return {
      "cue-name": cue.name,
      "cue-time": formatRemain(cue.at - now),
      "cd-open": isMarketOpen(now) ? "Open" : "in " + formatRemain(market.at - now) + " · " + clock(zoned(market.at, Z.banjul), false),
      "cd-ldn": boundary("london"),
      "cd-ny": boundary("newyork"),
      "cd-close": market.kind === "close" ? "in " + formatRemain(market.at - now) + " · " + clock(zoned(market.at, Z.banjul), false) : "Shut",
    };
  }

  let minute = -1;
  let checkDay = "";

  function paintFast(now) {
    const b = zoned(now, Z.banjul);
    const market = marketStatus(now);
    const liq = liquidity(now);
    const status = statusLine(now);
    const hello = greeting(now);
    const flag = redFlag(now);
    const volTitle = flag ? flag.name : liq.level === "danger" ? liq.title : "Clear";
    const volBody = flag ? flag.note : liq.level === "danger" ? liq.why : "No red-flag window on the clock.";
    bind({
      "banjul-clock": clock(b),
      "banjul-date": longDate(b),
      "z-utc": clock(zoned(now, "UTC"), false),
      "z-ldn": clock(zoned(now, Z.london), false) + " " + formatOffset(zoned(now, Z.london).offsetMinutes),
      "z-ny": clock(zoned(now, Z.ny), false) + " " + formatOffset(zoned(now, Z.ny).offsetMinutes),
      "z-syd": clock(zoned(now, Z.sydney), false) + " " + formatOffset(zoned(now, Z.sydney).offsetMinutes),
      status: status.text,
      greet: hello.title,
      "greet-line": hello.line,
      rhythm: rhythm(now),
      "market-label": market.label,
      "market-detail": market.detail,
      "market-next": (market.next.kind === "open" ? "Opens" : "Closes") + " in " + formatRemain(market.next.at - now),
      "liq-title": liq.title,
      "liq-why": liq.why,
      "liq-action": liq.action,
      "vol-title": volTitle,
      "vol-body": volBody,
      daylight: document.getElementById("prayers").dataset.sun || "Daylight follows Banjul. Prayer times fill in if the timetable answers.",
      ...cueText(now),
    });
    const tone = document.getElementById("tone");
    tone.className = "pip " + status.tone;
    document.getElementById("vol-card").classList.toggle("flash", Boolean(flag) || liq.level === "danger");
    document.getElementById("market-card").classList.toggle("flash", market.state !== "open");
    paintMind(now);
    const hits = collect(now);
    if (hits.length) {
      const fired = new Set(loadState().fired || []);
      hits.forEach((hit) => fired.add(hit.key));
      saveState({ fired: [...fired].slice(-80) });
      hits.forEach((hit) => toast(hit.title, hit.body));
    }
  }

  function paintSlow(now) {
    paintRibbon(now);
    paintHours(now);
    paintZones(now);
    paintEvents(now);
  }

  function currentView() {
    const h = location.hash.replace("#", "");
    return NAV.some(([id]) => id === h) ? h : "desk";
  }

  function syncNav() {
    const v = currentView();
    document.querySelectorAll(".view").forEach((el) => { el.hidden = el.dataset.view !== v; });
    document.querySelectorAll("#topnav a, .dock a, #more a").forEach((el) => {
      const id = (el.getAttribute("href") || "").replace("#", "");
      el.classList.toggle("is-on", id === v);
      if (id === v) el.setAttribute("aria-current", "page");
      else el.removeAttribute("aria-current");
    });
    const moreOn = ["calendar", "mindset", "gambia", "alerts"].includes(v);
    document.getElementById("more-btn").classList.toggle("is-on", moreOn);
    if (!moreOn) document.getElementById("more").hidden = true;
  }

  function boot() {
    const nav = document.getElementById("topnav");
    NAV.forEach(([id, label]) => {
      const a = node("a", "pill", label);
      a.href = "#" + id;
      nav.append(a);
    });
    syncNav();
    window.addEventListener("hashchange", syncNav);
    const more = document.getElementById("more");
    document.getElementById("more-btn").addEventListener("click", () => { more.hidden = !more.hidden; });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") more.hidden = true; });
    more.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => { more.hidden = true; }));

    const now = new Date();
    const checks = ensureChecks(now);
    ["slept", "fed", "angry", "revenge"].forEach((id) => {
      const input = document.getElementById(id);
      input.checked = Boolean(checks[id]);
      input.addEventListener("change", () => {
        const day = dayKey(zoned(new Date(), Z.banjul));
        saveState({
          checklist: {
            day,
            slept: document.getElementById("slept").checked,
            fed: document.getElementById("fed").checked,
            angry: document.getElementById("angry").checked,
            revenge: document.getElementById("revenge").checked,
          },
        });
        paintMind(new Date());
      });
    });
    checkDay = checks.day;

    const prefs = alertPrefs();
    document.querySelectorAll("[data-alert]").forEach((input) => {
      input.checked = prefs[input.dataset.alert] !== false;
      input.addEventListener("change", () => {
        const next = alertPrefs();
        next[input.dataset.alert] = input.checked;
        saveState({ alerts: next });
      });
    });
    const permit = document.getElementById("permit");
    const permitLine = () => {
      const text = typeof Notification === "undefined" ? "This browser has no notification API." : "Permission: " + Notification.permission;
      bind({ "permit-state": text });
    };
    permitLine();
    permit.addEventListener("click", () => {
      if (typeof Notification === "undefined") return;
      Notification.requestPermission().then(permitLine).catch(permitLine);
    });

    document.getElementById("lock-btn").addEventListener("click", () => {
      saveState({ lockoutUntil: Date.now() + 30 * 60 * 1000 });
      paintMind(new Date());
    });
    document.getElementById("journal").addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const stamp = new Date();
      const row = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        ts: stamp.toISOString(),
        day: dayKey(zoned(stamp, Z.banjul)),
        setup: String(data.get("setup") || "").slice(0, 120),
        emotion: String(data.get("emotion") || "").slice(0, 80),
        spread: String(data.get("spread") || "").slice(0, 40),
        grade: String(data.get("grade") || "A-setup"),
        result: String(data.get("result") || "scratch"),
      };
      saveState({ journal: [...(loadState().journal || []), row].slice(-200) });
      e.target.reset();
      renderJournal();
      paintMind(stamp);
    });
    document.getElementById("q").addEventListener("input", paintPlays);
    renderJournal();
    paintPlays();

    const tick = () => {
      const t = new Date();
      paintFast(t);
      const m = t.getMinutes();
      if (m !== minute) { minute = m; paintSlow(t); }
    };
    tick();
    setInterval(tick, 1000);

    fetch("https://api.gold-api.com/price/XAU")
      .then((r) => r.json())
      .then((data) => {
        if (!data || typeof data.price !== "number") return;
        const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(data.price);
        bind({ price: money + " / oz", "price-note": "Spot indication " + (data.updatedAtReadable || "just now") + ". Not a broker quote." });
      })
      .catch(() => bind({ price: "Feed quiet", "price-note": "The spot feed did not answer. The session clock does not need it." }));

    fetch("https://api.open-meteo.com/v1/forecast?latitude=13.4549&longitude=-16.579&current=temperature_2m,weather_code,wind_speed_10m&timezone=Africa%2FBanjul")
      .then((r) => r.json())
      .then((data) => {
        const c = data && data.current;
        if (!c || data.error) throw new Error("weather");
        const code = c.weather_code;
        const word = code === 0 ? "Clear" : code <= 3 ? "Cloudy" : code <= 48 ? "Fog" : code <= 67 ? "Rain" : code <= 77 ? "Snow" : code <= 82 ? "Showers" : "Storm";
        bind({ weather: Math.round(c.temperature_2m) + "° · " + word, "weather-note": "Wind " + Math.round(c.wind_speed_10m) + " km/h in Banjul." });
      })
      .catch(() => bind({ weather: "Quiet", "weather-note": "Banjul weather did not answer. Ignore it." }));

    fetch("https://api.aladhan.com/v1/timingsByCity?city=Banjul&country=Gambia&method=3")
      .then((r) => r.json())
      .then((data) => {
        const t = data && data.data && data.data.timings;
        if (!t) return;
        const box = document.getElementById("prayers");
        ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].forEach((name) => {
          box.append(node("p", "", name + " · " + t[name]));
        });
        box.dataset.sun = "Sunrise " + t.Sunrise + " · Sunset " + t.Sunset;
        bind({ daylight: box.dataset.sun });
      })
      .catch(() => { document.getElementById("prayers").append(node("p", "muted", "Timetable did not answer.")); });
  }

  try { boot(); }
  catch { document.getElementById("fault").hidden = false; }
})();
