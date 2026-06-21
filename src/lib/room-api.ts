import { supabase, type RoomRow, type ReviewRow } from "./supabase";

export async function findRoomByCode(code: string): Promise<RoomRow | null> {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("code", code.trim().toUpperCase())
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function createRoom(
  code: string,
  name: string,
  roommates: string[]
): Promise<RoomRow> {
  const { data, error } = await supabase
    .from("rooms")
    .insert({ code: code.trim().toUpperCase(), name, roommates })
    .select()
    .single();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Room creation failed");
  return data;
}

export async function submitReview(
  roomCode: string,
  userName: string,
  rating: number,
  feedback: string
): Promise<ReviewRow> {
  const { data, error } = await supabase
    .from("reviews")
    .insert({ room_code: roomCode.trim().toUpperCase(), user_name: userName, rating, feedback })
    .select()
    .single();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Review submission failed");
  return data;
}

export async function fetchAllReviews(): Promise<ReviewRow[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}
