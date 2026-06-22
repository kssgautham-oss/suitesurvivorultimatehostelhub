import { createFileRoute } from "@tanstack/react-router";
import ReviewForm from "@/components/ReviewForm";

export const Route = createFileRoute("/reviews")({
  component: ReviewForm,
});
