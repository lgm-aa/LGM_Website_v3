// src/utils/timeNY.js

// Shared timezone for all "New York" logic
export const NY_TZ = "America/New_York";

// Cutoff for deciding "this Sunday vs last Sunday"
// (used by latest-sermon logic)
const SUNDAY_CUTOFF_HOUR = 13; // 1 PM
const SUNDAY_CUTOFF_MIN = 30;

/**
 * Convert a Date to "New York parts" (Y/M/D/h/m/s, weekday, offset).
 * Any Date passed in is interpreted in America/New_York.
 */
export function getNYParts(date = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: NY_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    weekday: "short",
    timeZoneName: "shortOffset",
  });

  const parts = Object.fromEntries(
    fmt.formatToParts(date).map((p) => [p.type, p.value])
  );

  const wdMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  const match = (parts.timeZoneName || "").match(
    /GMT([+-]\d{1,2})(?::(\d{2}))?/
  );
  const offsetMinutes = match
    ? parseInt(match[1], 10) * 60 + (match[2] ? parseInt(match[2], 10) : 0)
    : 0;

  return {
    y: +parts.year,
    m: +parts.month,
    d: +parts.day,
    hh: +parts.hour,
    mm: +parts.minute,
    ss: +parts.second,
    dow: wdMap[parts.weekday] ?? 0,
    offsetMinutes,
  };
}

/**
 * Convert a "New York wall clock" time to a UTC Date.
 * Example: nyWallToUtc(2025, 11, 23, 0, 0) → Date for Sunday midnight NY.
 */
export function nyWallToUtc(
  y,
  m,
  d,
  hh = 0,
  mm = 0,
  ss = 0,
  ms = 0
) {
  const approxUtc = Date.UTC(y, m - 1, d, hh, mm, ss, ms);
  const probe = new Date(approxUtc);
  const { offsetMinutes } = getNYParts(probe);
  return new Date(approxUtc - offsetMinutes * 60_000);
}

/**
 * Decide which Sunday is the “effective Sunday”:
 * - If it's Sunday before 1:30pm NY → use previous Sunday
 * - Otherwise → use this Sunday
 */
export function getEffectiveSundayNY(now = new Date()) {
  const { y, m, d, hh, mm, dow } = getNYParts(now);

  const beforeCutoffOnSunday =
    dow === 0 &&
    (hh < SUNDAY_CUTOFF_HOUR ||
      (hh === SUNDAY_CUTOFF_HOUR && mm < SUNDAY_CUTOFF_MIN));

  const backDays = beforeCutoffOnSunday ? 7 : dow;

  const todayMidnightNY = nyWallToUtc(y, m, d, 0, 0, 0, 0);
  const sundayUtc = new Date(
    todayMidnightNY.getTime() - backDays * 86400_000
  );

  const sp = getNYParts(sundayUtc);
  const startUtc = nyWallToUtc(sp.y, sp.m, sp.d, 0, 0, 0, 0);
  const endUtc = nyWallToUtc(sp.y, sp.m, sp.d, 23, 59, 59, 999);

  return {
    startIso: startUtc.toISOString(),
    endIso: endUtc.toISOString(),
    sundayStartIso: startUtc.toISOString(),
  };
}

/** Sunday start/end range used for "latest Sunday" YouTube search. */
export function getLastSundayTimeRange() {
  const { startIso, endIso } = getEffectiveSundayNY();
  return { publishedAfter: startIso, publishedBefore: endIso };
}

/** ISO for the effective Sunday start (used as sermon date). */
export function getMostRecentSundayISOString() {
  const { sundayStartIso } = getEffectiveSundayNY();
  return sundayStartIso;
}