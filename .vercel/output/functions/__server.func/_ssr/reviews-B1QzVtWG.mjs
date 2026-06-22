import { r as __toESM } from "../_runtime.mjs";
import { i as submitReview } from "./room-api-9XS3Sp0n.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { C as MessageSquare, G as CircleCheck, N as Hash, O as Loader, l as Star, m as Send, o as User } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reviews-B1QzVtWG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReviewForm() {
	const [name, setName] = (0, import_react.useState)("");
	const [roomCode, setRoomCode] = (0, import_react.useState)("");
	const [rating, setRating] = (0, import_react.useState)(0);
	const [hoverRating, setHoverRating] = (0, import_react.useState)(0);
	const [feedback, setFeedback] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
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
	if (submitted) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-strong rounded-3xl p-8 text-center space-y-4 animate-pop-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto h-14 w-14 rounded-2xl gradient-brand grid place-items-center glow-purple",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
					className: "h-7 w-7 text-white",
					strokeWidth: 3
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-2xl font-black text-gradient",
				children: "Thanks for your review!"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Your feedback helps future roommates find the right vibe."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: reset,
				className: "px-6 py-3 rounded-2xl gradient-brand text-white font-semibold glow-purple hover:scale-[1.02] active:scale-[0.98] transition",
				children: "Submit Another Review"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-strong rounded-3xl p-6 sm:p-8 space-y-5 animate-pop-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto h-12 w-12 rounded-2xl gradient-brand grid place-items-center glow-purple mb-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-6 w-6 text-white" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xl font-black text-gradient",
					children: "Leave a Review"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Rate your room experience and share honest feedback."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }),
					placeholder: "Your name",
					value: name,
					onChange: setName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { className: "h-4 w-4" }),
					placeholder: "Room code (e.g. SUITE-123)",
					value: roomCode,
					onChange: setRoomCode
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold mb-2 text-muted-foreground",
					children: "Rating"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [Array.from({ length: 5 }).map((_, i) => {
						const value = i + 1;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onMouseEnter: () => setHoverRating(value),
							onMouseLeave: () => setHoverRating(0),
							onClick: () => setRating(value),
							className: "p-1 transition hover:scale-110",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-7 w-7 transition ${value <= (hoverRating || rating) ? "text-electric-orange fill-electric-orange" : "text-muted-foreground/30"}` })
						}, value);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 text-sm font-bold text-electric-orange",
						children: rating > 0 ? `${rating}/5` : "Select a rating"
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold mb-2 text-muted-foreground",
					children: "Feedback"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: feedback,
					onChange: (e) => setFeedback(e.target.value),
					placeholder: "How was your room experience? What would you change?",
					rows: 4,
					className: "w-full px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60 resize-none placeholder:text-muted-foreground"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleSubmit,
					disabled: !canSubmit || loading,
					className: "w-full py-3 rounded-2xl gradient-brand font-semibold text-white glow-purple hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }), " Submit Review"] })
				})
			]
		})]
	});
}
function Field({ icon, placeholder, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 px-4 py-3 rounded-2xl glass border border-white/10 focus-within:border-neon-purple/60 transition",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			className: "flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
		})]
	});
}
var SplitComponent = ReviewForm;
//#endregion
export { SplitComponent as component };
