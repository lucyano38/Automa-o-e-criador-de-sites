'use strict';

const fs = require('fs');
const path = require('path');

const DEFAULT_TTL_MS = (Number(process.env.FILE_TTL_HOURS) || 24) * 60 * 60 * 1000;
const CLEANUP_INTERVAL_MS = (Number(process.env.CLEANUP_INTERVAL_MINUTES) || 30) * 60 * 1000;

function cleanDir(dirPath, maxAgeMs, forceAll) {
  if (!fs.existsSync(dirPath)) return 0;
  let removed = 0;
  const now = Date.now();
  for (const entry of fs.readdirSync(dirPath)) {
    const full = path.join(dirPath, entry);
    try {
      const stat = fs.statSync(full);
      if (!stat.isFile()) continue;
      if (forceAll || (now - stat.mtimeMs) > maxAgeMs) {
        fs.unlinkSync(full);
        removed++;
      }
    } catch (_) {}
  }
  return removed;
}

function runCleanup(dirs, opts = {}) {
  const maxAgeMs = opts.maxAgeMs ?? DEFAULT_TTL_MS;
  const forceAll = Boolean(opts.forceAll);
  let totalRemoved = 0;
  for (const d of (Array.isArray(dirs) ? dirs : [])) {
    totalRemoved += cleanDir(d, maxAgeMs, forceAll);
  }
  return Promise.resolve(totalRemoved);
}

function startCleanupScheduler(dirs, opts = {}) {
  const intervalMs = opts.intervalMs ?? CLEANUP_INTERVAL_MS;
  const timer = setInterval(() => {
    runCleanup(dirs, opts).catch(() => {});
  }, intervalMs);
  if (typeof timer.unref === 'function') timer.unref();
  return timer;
}

module.exports = { runCleanup, startCleanupScheduler };
