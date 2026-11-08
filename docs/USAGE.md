# Usage limits (MVP 4)

## What is limited
Per signed-in user, per calendar month (UTC), by plan (`src/config/plans.ts`):
- number of transcriptions
- number of AI generations
Per request: file size and recording length.

## How it is enforced
1. The API route asks the database how many uses this user has this month (`usage_events`, readable only by its owner).
2. If the limit is reached, the route answers 429 and never calls the AI provider.
3. After a successful call, the route calls the database function `consume_usage`, which counts and inserts together under a lock.
4. Users cannot insert, edit or delete usage rows (no policies for that); only the function adds rows.
5. If usage cannot be checked, the route fails closed (503) instead of allowing the request.

Demo-mode (no API key) calls are free and not counted.

## Known limitations
- Limits count requests, not audio minutes (the server cannot verify audio length yet).
- A failed AI call is not counted, so failures cost nothing.
- A user could slip a few extra requests through by sending several at the same moment; the per-minute rate limit keeps that small.
- Everyone is on the Free plan until billing exists.
- The per-minute rate limiter is still per server instance.
