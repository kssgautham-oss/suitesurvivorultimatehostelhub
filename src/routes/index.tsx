import { createFileRoute } from "@tanstack/react-router";
import AuthScreen from "@/components/AuthScreen";
import Dashboard from "@/components/Dashboard";
import RoomSetup from "@/components/RoomSetup";
import { useAuth, useRoom } from "@/lib/mock-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SuiteSurvivor" },
      { name: "description", content: "A Gen-Z mobile-first app to vibe, split, and snack with your hostel roommates." },
      { property: "og:title", content: "SuiteSurvivor" },
      { property: "og:description", content: "Ecosystem for tracking, managing & resolving drama before it starts." },
    ],
  }),
  component: Index,
});

function Index() {
  const user = useAuth();
  const room = useRoom();
  if (!user) return <AuthScreen />;
  if (!room) return <RoomSetup />;
  return <Dashboard />;
}
