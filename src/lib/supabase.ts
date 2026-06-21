import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(url, key);

export type RoomRow = {
  id: string;
  code: string;
  name: string;
  roommates: string[];
  created_at: string;
};

export type ReviewRow = {
  id: string;
  room_code: string;
  user_name: string;
  rating: number;
  feedback: string;
  created_at: string;
};
