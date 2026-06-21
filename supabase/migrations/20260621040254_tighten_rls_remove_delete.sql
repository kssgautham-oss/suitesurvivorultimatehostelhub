/*
# Tighten RLS policies on rooms and reviews

1. Security Changes
- Remove DELETE policies for anon role on `rooms` and `reviews` tables.
- Keep SELECT and INSERT for anon/authenticated (open read and create).
- Remove UPDATE policies for anon on both tables (only allow SELECT/INSERT publicly).

2. Rationale
- Prevent anonymous users from wiping data via client-side console commands.
- Preserve read/write access for demo flow while removing destructive verbs.
*/

-- Rooms: keep select + insert for anon/authenticated, drop update + delete
DROP POLICY IF EXISTS "anon_update_rooms" ON rooms;
DROP POLICY IF EXISTS "anon_delete_rooms" ON rooms;

-- Reviews: keep select + insert for anon/authenticated, drop update + delete
DROP POLICY IF EXISTS "anon_update_reviews" ON reviews;
DROP POLICY IF EXISTS "anon_delete_reviews" ON reviews;
