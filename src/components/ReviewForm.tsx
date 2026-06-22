import { useState } from "react";
import { toast } from "sonner";
import { Star, Send, Hash, User, MessageSquare, Loader as Loader2, CircleCheck as CheckCircle2 } from "lucide-react";
import { submitReview } from "@/lib/room-api";

export default function ReviewForm() {
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = name.trim().length > 0 && roomCode.trim().length >= 3 && rating > 0 && feedback.trim().length > 0;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    try {
      await submitReview(roomCode.trim(), name.trim(), rating, feedback.trim());
      toast.success("Review submitted successfully!");
      setSubmitted(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setName("");
    setRoomCode("");
    setRating(0);
    setHoverRating(0);
    setFeedback("");
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="glass-strong rounded-3xl p-8 text-center space-y-4 animate-pop-in">
        <div className="mx-auto h-14 w-14 rounded-2xl gradient-brand grid place-items-center glow-purple">
          <CheckCircle2 className="h-7 w-7 text-white" strokeWidth={3} />
        </div>
        <h3 className="text-2xl font-black text-gradient">Thanks for your review!</h3>
        <p className="text-sm text-muted-foreground">
          Your feedback helps future roommates find the right vibe.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-2xl gradient-brand text-white font-semibold glow-purple hover:scale-[1.02] active:scale-[0.98] transition"
        >
          Submit Another Review
        </button>
      </div>
    );
  }

  return (
    <div className="glass-strong rounded-3xl p-6 sm:p-8 space-y-5 animate-pop-in">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 rounded-2xl gradient-brand grid place-items-center glow-purple mb-3">
          <MessageSquare className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-black text-gradient">Leave a Review</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Rate your room experience and share honest feedback.
        </p>
      </div>

      <div className="space-y-4">
        <Field
          icon={<User className="h-4 w-4" />}
          placeholder="Your name"
          value={name}
          onChange={setName}
        />
        <Field
          icon={<Hash className="h-4 w-4" />}
          placeholder="Room code (e.g. SUITE-123)"
          value={roomCode}
          onChange={setRoomCode}
        />

        <div>
          <p className="text-xs font-semibold mb-2 text-muted-foreground">Rating</p>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
              const value = i + 1;
              const active = value <= (hoverRating || rating);
              return (
                <button
                  key={value}
                  type="button"
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(value)}
                  className="p-1 transition hover:scale-110"
                >
                  <Star
                    className={`h-7 w-7 transition ${active ? "text-electric-orange fill-electric-orange" : "text-muted-foreground/30"}`}
                  />
                </button>
              );
            })}
            <span className="ml-2 text-sm font-bold text-electric-orange">
              {rating > 0 ? `${rating}/5` : "Select a rating"}
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold mb-2 text-muted-foreground">Feedback</p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="How was your room experience? What would you change?"
            rows={4}
            className="w-full px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60 resize-none placeholder:text-muted-foreground"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit || loading}
          className="w-full py-3 rounded-2xl gradient-brand font-semibold text-white glow-purple hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Send className="h-4 w-4" /> Submit Review</>}
        </button>
      </div>
    </div>
  );
}

function Field({
  icon,
  placeholder,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 rounded-2xl glass border border-white/10 focus-within:border-neon-purple/60 transition">
      <span className="text-muted-foreground">{icon}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
      />
    </div>
  );
}
