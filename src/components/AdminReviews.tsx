import { useEffect, useState } from "react";
import { Star, MessageSquare, Calendar, Hash, Loader as Loader2 } from "lucide-react";
import { fetchAllReviews } from "@/lib/room-api";
import type { ReviewRow } from "@/lib/supabase";

export default function AdminReviews() {
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllReviews()
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load reviews");
        setLoading(false);
      });
  }, []);

  const avg =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

  return (
    <div className="relative min-h-screen px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-black text-gradient">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Global review aggregation panel
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <StatCard
            icon={<Hash className="h-5 w-5" />}
            label="Total Reviews"
            value={String(reviews.length)}
          />
          <StatCard
            icon={<Star className="h-5 w-5" />}
            label="Avg Rating"
            value={avg}
          />
          <StatCard
            icon={<MessageSquare className="h-5 w-5" />}
            label="Rooms Reviewed"
            value={String(new Set(reviews.map((r) => r.room_code)).size)}
          />
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20 gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Loading reviews…</span>
          </div>
        )}

        {error && (
          <div className="glass-strong rounded-3xl p-6 text-center text-destructive">
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {!loading && !error && reviews.length === 0 && (
          <div className="glass-strong rounded-3xl p-8 text-center text-muted-foreground">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p className="font-semibold">No reviews yet</p>
            <p className="text-xs mt-1">
              Reviews will appear here once users submit feedback.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="glass-strong rounded-2xl p-5 flex flex-col sm:flex-row sm:items-start gap-4 transition hover:bg-white/[0.06]"
            >
              <div className="shrink-0 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < r.rating
                        ? "text-electric-orange fill-electric-orange"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
                <span className="ml-1 text-xs font-bold text-electric-orange">
                  {r.rating}/5
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-relaxed">{r.feedback}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Hash className="h-3 w-3" /> {r.room_code}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" /> {r.user_name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(r.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="glass-strong rounded-2xl p-4 text-center">
      <div className="mx-auto h-10 w-10 rounded-xl gradient-brand grid place-items-center text-white mb-2">
        {icon}
      </div>
      <p className="text-2xl font-black text-gradient">{value}</p>
      <p className="text-[11px] text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
}
