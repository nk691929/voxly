# Database (MVP 3)

## Table: `generations`
| Column | Meaning |
|---|---|
| `id` | Unique ID |
| `user_id` | Owner. Filled in by the database from the logged-in user |
| `output_type` | email, notes, tasks or translate |
| `source_text` | The transcript the result was made from (max 20,000 characters) |
| `output_text` | The generated result |
| `created_at` | When it was saved |

Audio is never stored.

## Row Level Security
Enabled. Signed-in users can only select, insert and delete their own rows. There is no update policy, so saved results cannot be edited.

## Migrations
Files in `supabase/migrations/`. For now, run them by pasting into the Supabase SQL Editor.
