/*
# Create rooms and reviews tables

1. New Tables
- `rooms`
  - `id` (uuid, primary key)
  - `code` (text, unique, not null) — the human-readable room invite code (e.g., SUITE-123)
  - `name` (text, not null) — display name for the room
  - `roommates` (text array, not null) — list of roommate nicknames
  - `created_at` (timestamptz, default now)
- `reviews`
  - `id` (uuid, primary key)
  - `room_code` (text, not null) — references rooms.code via FK
  - `user_name` (text, not null) — the person leaving feedback
  - `rating` (integer, not null, check 1-5)
  - `feedback` (text, not null)
  - `created_at` (timestamptz, default now)

2. Security
- Enable RLS on both tables.
- `rooms`: allow anon + authenticated to read all rooms (shared lookup), insert only for anon/authenticated (open creation for demo flow).
- `reviews`: allow anon + authenticated to read all reviews (admin aggregation), insert for anon/authenticated.

3. Notes
- No auth required — the app is currently single-tenant/demo mode.
- Room codes are unique to prevent collisions.
- Reviews have a CHECK constraint on rating (1-5).
*/

CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  roommates text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code text NOT NULL REFERENCES rooms(code) ON DELETE CASCADE,
  user_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Rooms policies (open read/write for demo/no-auth flow)
DROP POLICY IF EXISTS "anon_select_rooms" ON rooms;
CREATE POLICY "anon_select_rooms" ON rooms FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_rooms" ON rooms;
CREATE POLICY "anon_insert_rooms" ON rooms FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_rooms" ON rooms;
CREATE POLICY "anon_update_rooms" ON rooms FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_rooms" ON rooms;
CREATE POLICY "anon_delete_rooms" ON rooms FOR DELETE
  TO anon, authenticated USING (true);

-- Reviews policies (open read/write for demo/no-auth flow)
DROP POLICY IF EXISTS "anon_select_reviews" ON reviews;
CREATE POLICY "anon_select_reviews" ON reviews FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_reviews" ON reviews;
CREATE POLICY "anon_insert_reviews" ON reviews FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_reviews" ON reviews;
CREATE POLICY "anon_update_reviews" ON reviews FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_reviews" ON reviews;
CREATE POLICY "anon_delete_reviews" ON reviews FOR DELETE
  TO anon, authenticated USING (true);
