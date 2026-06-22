import { useEffect, useState } from "react";
import { Star, MessageSquare, Calendar, Hash, Loader as Loader2, Lock, ArrowLeft, Search, ListFilter as Filter } from "lucide-react";
import { fetchAllReviews } from "@/lib/room-api";
import type { ReviewRow } from "@/lib/supabase";

const ADMIN_CODE = "ADMIN123";

export default function AdminReviews() {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    if (!unlocked) return;
    fetchAllReviews()
      .then((data) => {
        setReviews(data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load reviews");
        setLoading(false);
      });
  }, [unlocked]);

  useEffect(() => {
    fetchAllReviews()
      .then((data) => {
        setReviews(data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load reviews");
        setLoading(false);
      });
  }, []);

  const filtered = (reviews ?? []).filter((r) => {
    const matchesSearch =
      search.trim().length === 0 ||
      r.user_name?.toLowerCase().includes(search.toLowerCase()) ||
      r.room_code?.toLowerCase().includes(search.toLowerCase()) ||
      r.feedback?.toLowerCase().includes(search.toLowerCase());
    const matchesRating = minRating === 0 || (r.rating ?? 0) >= minRating;
    return matchesSearch && matchesRating;
  });

  const avg =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length).toFixed(1)
      : "0.0";

  if (!unlocked) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm glass-strong rounded-3xl p-6 sm:p-8 text-center space-y-4 animate-pop-in">
          <div className="mx-auto h-14 w-14 rounded-2xl gradient-brand grid place-items-center glow-purple">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-black text-gradient">Admin Access</h1>
          <p className="text-sm text-muted-foreground">Enter the admin code to view the review dashboard.</p>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && input === ADMIN_CODE) setUnlocked(true); }}
            placeholder="Admin code"
            className="w-full px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60"
          />
          <button
            onClick={() => { if (input === ADMIN_CODE) setUnlocked(true); }}
            disabled={input !== ADMIN_CODE}
            className="w-full py-3 rounded-2xl gradient-brand font-semibold text-white glow-purple hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50"
          >
            Unlock
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gradient">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Global review aggregation panel
            </p>
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to home
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
          <StatCard
            icon={<Star className="h-5 w-5" />}
            label="5-Star Reviews"
            value={String(reviews.filter((r) => r.rating === 5).length)}
          />
        </div>

        {/* Filters */}
        <div className="glass-strong rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass border border-white/10 flex-1 w-full sm:w-auto">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, room, or feedback…"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="bg-transparent outline-none text-sm text-muted-foreground cursor-pointer"
            >
              <option value={0}>All ratings</option>
              <option value={5}>5 stars</option>
              <option value={4}>4+ stars</option>
              <option value={3}>3+ stars</option>
              <option value={2}>2+ stars</option>
              <option value={1}>1+ stars</option>
            </select>
          </div>
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

        {!loading && !error && filtered.length === 0 && (
          <div className="glass-strong rounded-3xl p-8 text-center text-muted-foreground">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p className="font-semibold">No reviews found</p>
            <p className="text-xs mt-1">
              {reviews.length === 0 ? "Reviews will appear here once users submit feedback." : "Try adjusting your search or filter."}
            </p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && filtered.length > 0 && (
          <div className="glass-strong rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3 font-semibold">Rating</th>
                    <th className="px-4 py-3 font-semibold">Feedback</th>
                    <th className="px-4 py-3 font-semibold">Room</th>
                    <th className="px-4 py-3 font-semibold">User</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-white/[0.03] transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${i < (r.rating ?? 0) ? "text-electric-orange fill-electric-orange" : "text-muted-foreground/30"}`}
                            />
                          ))}
                          <span className="ml-1 text-xs font-bold text-electric-orange">{r.rating}/5</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 max-w-xs">
                        <p className="truncate" title={r.feedback}>{r.feedback}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md glass text-xs font-medium">
                          <Hash className="h-3 w-3" /> {r.room_code}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{r.user_name}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {r.created_at ? new Date(r.created_at).toLocaleDateString() : "—"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-white/10 text-xs text-muted-foreground flex items-center justify-between">
              <span>Showing {filtered.length} of {reviews.length} reviews</span>
              <span>{new Set(reviews.map((r) => r.room_code)).size} unique rooms</span>
            </div>
          </div>
        )}
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
