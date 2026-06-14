import { createFileRoute } from "@tanstack/react-router";
import AuthScreen from "@/components/AuthScreen";
import Dashboard from "@/components/Dashboard";
import { useAuth } from "@/lib/mock-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hostel Harmony — Survive the 3-person room" },
      { name: "description", content: "A Gen-Z mobile-first app to vibe, split, and snack with your hostel roommates." },
      { property: "og:title", content: "Hostel Harmony" },
      { property: "og:description", content: "Vibe Check, 3-Way Split, and Midnight Pantry AI for student hostels." },
    ],
  }),
  component: Index,
});

function Index() {
  const user = useAuth();
  return user ? <Dashboard /> : <AuthScreen />;
}
