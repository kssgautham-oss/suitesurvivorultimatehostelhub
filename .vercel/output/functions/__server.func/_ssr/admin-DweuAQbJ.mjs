import { r as __toESM } from "../_runtime.mjs";
import { n as fetchAllReviews } from "./room-api-DGV2ef_4.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { D as Loader, E as Lock, K as Calendar, S as MessageSquare, j as Hash, l as Star } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DweuAQbJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ADMIN_CODE = "ADMIN123";
function AdminReviews() {
	const [unlocked, setUnlocked] = (0, import_react.useState)(false);
	const [input, setInput] = (0, import_react.useState)("");
	const [reviews, setReviews] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!unlocked) return;
		fetchAllReviews().then((data) => {
			setReviews(data);
			setLoading(false);
		}).catch((err) => {
			setError(err instanceof Error ? err.message : "Failed to load reviews");
			setLoading(false);
		});
	}, [unlocked]);
	(0, import_react.useEffect)(() => {
		fetchAllReviews().then((data) => {
			setReviews(data);
			setLoading(false);
		}).catch((err) => {
			setError(err instanceof Error ? err.message : "Failed to load reviews");
			setLoading(false);
		});
	}, []);
	const avg = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "0.0";
	if (!unlocked) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative min-h-screen flex items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm glass-strong rounded-3xl p-6 sm:p-8 text-center space-y-4 animate-pop-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto h-14 w-14 rounded-2xl gradient-brand grid place-items-center glow-purple",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-6 w-6 text-white" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-black text-gradient",
					children: "Admin Access"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Enter the admin code to view the review dashboard."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "password",
					value: input,
					onChange: (e) => setInput(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter" && input === ADMIN_CODE) setUnlocked(true);
					},
					placeholder: "Admin code",
					className: "w-full px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						if (input === ADMIN_CODE) setUnlocked(true);
					},
					disabled: input !== ADMIN_CODE,
					className: "w-full py-3 rounded-2xl gradient-brand font-semibold text-white glow-purple hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50",
					children: "Unlock"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative min-h-screen px-4 py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-3xl mx-auto space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-black text-gradient",
						children: "Admin Dashboard"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-1",
						children: "Global review aggregation panel"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { className: "h-5 w-5" }),
							label: "Total Reviews",
							value: String(reviews.length)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-5 w-5" }),
							label: "Avg Rating",
							value: avg
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-5 w-5" }),
							label: "Rooms Reviewed",
							value: String(new Set(reviews.map((r) => r.room_code)).size)
						})
					]
				}),
				loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center py-20 gap-2 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-5 w-5 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm",
						children: "Loading reviews…"
					})]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "glass-strong rounded-3xl p-6 text-center text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: error
					})
				}),
				!loading && !error && reviews.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-strong rounded-3xl p-8 text-center text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-8 w-8 mx-auto mb-2 opacity-40" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: "No reviews yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs mt-1",
							children: "Reviews will appear here once users submit feedback."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-strong rounded-2xl p-5 flex flex-col sm:flex-row sm:items-start gap-4 transition hover:bg-white/[0.06]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shrink-0 flex items-center gap-1",
							children: [Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-4 w-4 ${i < r.rating ? "text-electric-orange fill-electric-orange" : "text-muted-foreground/30"}` }, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-1 text-xs font-bold text-electric-orange",
								children: [r.rating, "/5"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed",
								children: r.feedback
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { className: "h-3 w-3" }),
											" ",
											r.room_code
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-3 w-3" }),
											" ",
											r.user_name
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }), new Date(r.created_at).toLocaleDateString()]
									})
								]
							})]
						})]
					}, r.id))
				})
			]
		})
	});
}
function StatCard({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-strong rounded-2xl p-4 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto h-10 w-10 rounded-xl gradient-brand grid place-items-center text-white mb-2",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-2xl font-black text-gradient",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-muted-foreground mt-0.5",
				children: label
			})
		]
	});
}
var SplitComponent = AdminReviews;
//#endregion
export { SplitComponent as component };
