import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/room-api-DGV2ef_4.js
var supabase = createClient("https://gszkbczipgeuzbganjif.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzemtiY3ppcGdldXpiZ2FuamlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwMDE2MTYsImV4cCI6MjA5NzU3NzYxNn0.ATbFYnWuAilv2lyo6ffWb57PMbOdQw-w6qNsHtudXgU");
async function findRoomByCode(code) {
	const { data, error } = await supabase.from("rooms").select("*").eq("code", code.trim().toUpperCase()).maybeSingle();
	if (error) throw new Error(error.message);
	return data;
}
async function createRoom(code, name, roommates) {
	const { data, error } = await supabase.from("rooms").insert({
		code: code.trim().toUpperCase(),
		name,
		roommates
	}).select().single();
	if (error) throw new Error(error.message);
	if (!data) throw new Error("Room creation failed");
	return data;
}
async function fetchAllReviews() {
	const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data ?? [];
}
//#endregion
export { fetchAllReviews as n, findRoomByCode as r, createRoom as t };
