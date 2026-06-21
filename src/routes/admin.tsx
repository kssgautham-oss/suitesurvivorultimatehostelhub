import { createFileRoute } from "@tanstack/react-router";
import AdminReviews from "@/components/AdminReviews";

export const Route = createFileRoute("/admin")({
  component: AdminReviews,
});
