const requests = new Map();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100;

function rateLimiter(req, res, next) {
    const ip = req.ip;
    const now = Date.now();
    const entry = requests.get(ip) || { count: 0, start: now };

    // Reset window if expired
    if (now - entry.start > WINDOW_MS) {
        entry.count = 0;
        entry.start = now;
    }

    entry.count++;
    requests.set(ip, entry);

    if (entry.count > MAX_REQUESTS) {
        return res.status(429).json({ error: 'Too many requests, please slow down.' });
    }

    next();
}

module.exports = rateLimiter;
