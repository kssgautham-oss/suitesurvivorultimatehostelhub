import { r as __toESM } from "../_runtime.mjs";
import { i as submitReview, r as findRoomByCode, t as createRoom } from "./room-api-9XS3Sp0n.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { A as Link2, B as Egg, C as MessageSquare, D as Lock, E as LogIn, F as Gavel, G as CircleCheck, H as Cookie, J as Check, K as CircleAlert, L as Flame, M as House, N as Hash, O as Loader, P as Ghost, R as Eye, S as Moon, T as LogOut, U as Coffee, V as Copy, W as Clock, X as ArrowRight, Z as ArrowLeft, _ as Scale, a as Users, b as Plus, c as Sun, d as Snowflake, f as Shuffle, g as ScrollText, i as Wallet, j as KeyRound, k as LoaderCircle, l as Star, m as Send, n as X, o as User, p as Share2, q as ChefHat, r as Wand, s as Trash2, t as Zap, u as Sparkles, v as RotateCw, w as Mail, x as PenLine, y as Receipt, z as EyeOff } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as confetti_module_default } from "../_libs/canvas-confetti.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D6C9-N0A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PREFIX = "ss_";
var KEY = PREFIX + btoa("hostel-harmony-auth");
var ROOM_KEY = PREFIX + btoa("hostel-harmony-room");
var ACCOUNTS_KEY = PREFIX + btoa("hostel-harmony-accounts");
function loadAccounts() {
	if (typeof window === "undefined") return [];
	try {
		return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? "[]");
	} catch {
		return [];
	}
}
function saveAccounts(a) {
	if (typeof window !== "undefined") localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(a));
}
function registerAccount(name, email, password) {
	const e = email.trim().toLowerCase();
	if (!e || !password) return {
		ok: false,
		error: "Email and password are required."
	};
	const accounts = loadAccounts();
	if (accounts.some((a) => a.email === e)) return {
		ok: false,
		error: "An account with this email already exists."
	};
	accounts.push({
		name: name.trim() || e.split("@")[0],
		email: e,
		password
	});
	saveAccounts(accounts);
	return { ok: true };
}
function validateCredentials(email, password) {
	const e = email.trim().toLowerCase();
	return loadAccounts().find((a) => a.email === e && a.password === password) ?? null;
}
var ALIAS_ADJECTIVES = [
	"Sneaky",
	"Chaotic",
	"Midnight",
	"Salty",
	"Caffeinated",
	"Petty",
	"Feral",
	"Lowkey",
	"Spicy",
	"Drowsy"
];
var ALIAS_NOUNS = [
	"Survivor",
	"Goblin",
	"Menace",
	"Snackster",
	"Gremlin",
	"Diva",
	"Phantom",
	"TeaSpiller",
	"Pajama",
	"Maggi"
];
function generateAlias() {
	return `${ALIAS_ADJECTIVES[Math.floor(Math.random() * ALIAS_ADJECTIVES.length)]}_${ALIAS_NOUNS[Math.floor(Math.random() * ALIAS_NOUNS.length)]}_${Math.floor(100 + Math.random() * 900)}`;
}
function setAlias(alias) {
	if (!current) return;
	current = {
		...current,
		alias: alias.trim()
	};
	if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(current));
	listeners.forEach((fn) => fn());
}
var EXPENSE_CATEGORIES = [
	"Rent",
	"Food",
	"Wifi",
	"Utilities",
	"Snacks",
	"Other"
];
var listeners = /* @__PURE__ */ new Set();
var roomListeners = /* @__PURE__ */ new Set();
var pollListeners = /* @__PURE__ */ new Set();
var current = null;
var currentRoom = null;
var seedExpenses = null;
var seedVibe = null;
var customPolls = [];
var DEMO_EMAIL = "judge@suitesurvivor.app";
function isValidSession(u) {
	if (!u || typeof u !== "object") return false;
	const candidate = u;
	if (typeof candidate.name !== "string" || typeof candidate.email !== "string") return false;
	if (!candidate.name.trim() || !candidate.email.trim()) return false;
	const email = candidate.email.toLowerCase();
	if (email === DEMO_EMAIL) return true;
	if (email === "google@hostel.app" || email === "facebook@hostel.app") return true;
	return loadAccounts().some((a) => a.email === email);
}
if (typeof window !== "undefined") try {
	const raw = localStorage.getItem(KEY);
	if (raw) {
		const parsed = JSON.parse(raw);
		if (isValidSession(parsed)) current = parsed;
		else localStorage.removeItem(KEY);
	}
	const rawRoom = localStorage.getItem(ROOM_KEY);
	if (rawRoom) currentRoom = JSON.parse(rawRoom);
} catch {}
function setUser(u) {
	current = u;
	if (typeof window !== "undefined") if (u) localStorage.setItem(KEY, JSON.stringify(u));
	else {
		localStorage.removeItem(KEY);
		localStorage.removeItem(ROOM_KEY);
		currentRoom = null;
		seedExpenses = null;
		seedVibe = null;
		customPolls = [];
		roomListeners.forEach((fn) => fn());
		pollListeners.forEach((fn) => fn());
	}
	listeners.forEach((fn) => fn());
}
function useAuth() {
	const [user, setU] = (0, import_react.useState)(current);
	(0, import_react.useEffect)(() => {
		const fn = () => setU(current);
		listeners.add(fn);
		return () => {
			listeners.delete(fn);
		};
	}, []);
	return user;
}
function setRoom(r) {
	currentRoom = r;
	if (typeof window !== "undefined") if (r) localStorage.setItem(ROOM_KEY, JSON.stringify(r));
	else localStorage.removeItem(ROOM_KEY);
	roomListeners.forEach((fn) => fn());
}
function useRoom() {
	const [room, setR] = (0, import_react.useState)(currentRoom);
	(0, import_react.useEffect)(() => {
		const fn = () => setR(currentRoom);
		roomListeners.add(fn);
		return () => {
			roomListeners.delete(fn);
		};
	}, []);
	return room;
}
function generateRoomCode() {
	return `SUITE-${Math.floor(1e5 + Math.random() * 9e5).toString().slice(0, 3)}`;
}
function consumeSeedExpenses() {
	const s = seedExpenses;
	seedExpenses = null;
	return s;
}
function consumeSeedVibe() {
	const s = seedVibe;
	seedVibe = null;
	return s;
}
function addCustomPoll(p) {
	const poll = {
		id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
		question: p.question,
		options: p.options,
		tally: Object.fromEntries(p.options.map((o) => [o, 0])),
		voters: Object.fromEntries(p.options.map((o) => [o, []])),
		source: p.source ?? "user"
	};
	customPolls = [poll, ...customPolls];
	pollListeners.forEach((fn) => fn());
	return poll;
}
function voteCustomPoll(id, option, voterAlias) {
	customPolls = customPolls.map((p) => {
		if (p.id !== id) return p;
		if (p.options.some((opt) => p.voters[opt]?.includes(voterAlias))) return p;
		return {
			...p,
			tally: {
				...p.tally,
				[option]: (p.tally[option] ?? 0) + 1
			},
			voters: {
				...p.voters,
				[option]: [...p.voters[option] ?? [], voterAlias]
			}
		};
	});
	pollListeners.forEach((fn) => fn());
}
function hasUserVotedCustomPoll(id, alias) {
	const p = customPolls.find((cp) => cp.id === id);
	if (!p) return false;
	return p.options.some((opt) => p.voters[opt]?.includes(alias));
}
function useCustomPolls() {
	const [polls, setPolls] = (0, import_react.useState)(customPolls);
	(0, import_react.useEffect)(() => {
		const fn = () => setPolls([...customPolls]);
		pollListeners.add(fn);
		return () => {
			pollListeners.delete(fn);
		};
	}, []);
	return polls;
}
function enableDemoMode() {
	const roommates = [
		"Rahul",
		"Karthik",
		"You"
	];
	seedExpenses = [
		{
			id: "d1",
			label: "Rent Split",
			amount: 3e3,
			paidBy: "You",
			category: "Rent"
		},
		{
			id: "d2",
			label: "Wifi Bill",
			amount: 600,
			paidBy: "Rahul",
			category: "Wifi"
		},
		{
			id: "d3",
			label: "Emergency Midnight Maggi Supplies",
			amount: 450,
			paidBy: "Karthik",
			category: "Snacks"
		}
	];
	seedVibe = {
		question: "Who left the empty milk packet inside the induction kettle and burnt the base again?",
		votes: {
			Rahul: "Rahul",
			Karthik: "Rahul",
			You: "Karthik"
		},
		percentages: {
			Rahul: 60,
			Karthik: 30,
			You: 10
		},
		completedQuestion: "Who is genuinely responsible for the absolute biohazard fermenting in our trash can right now?",
		completedWinner: "Karthik",
		upcomingQuestion: "Are we allowing Rahul's loud gaming friend to crash on our floor this upcoming weekend?"
	};
	customPolls = [];
	setUser({
		name: "Demo Judge",
		email: "judge@suitesurvivor.app",
		alias: "The_Judge_Supreme"
	});
	setRoom({
		code: "SUITE-DEMO",
		roommates
	});
}
var GoogleIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	viewBox: "0 0 48 48",
	className: "h-5 w-5",
	"aria-hidden": "true",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#FFC107",
			d: "M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6 8-11.3 8a12 12 0 1 1 7.9-21l5.7-5.7A20 20 0 1 0 44 24c0-1.2-.1-2.4-.4-3.5z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#FF3D00",
			d: "m6.3 14.7 6.6 4.8A12 12 0 0 1 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7A20 20 0 0 0 6.3 14.7z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#4CAF50",
			d: "M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.5 5A20 20 0 0 0 24 44z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#1976D2",
			d: "M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C37 35 44 30 44 24c0-1.2-.1-2.4-.4-3.5z"
		})
	]
});
var AppleIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	viewBox: "0 0 24 24",
	className: "h-5 w-5",
	fill: "currentColor",
	"aria-hidden": "true",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" })
});
var FEATURES = [
	{
		icon: House,
		title: "Room Management",
		body: "Create or join rooms with unique codes. Track roommates, manage shared spaces, and keep everyone in sync.",
		accent: "bg-neon-purple/15 text-neon-purple border-neon-purple/30"
	},
	{
		icon: Wallet,
		title: "Group Expense Tracking",
		body: "Split rent, utilities, food, and snacks with itemized chips. Real-time balances so everyone knows who owes what.",
		accent: "bg-electric-orange/15 text-electric-orange border-electric-orange/30"
	},
	{
		icon: MessageSquare,
		title: "Shared Reviews",
		body: "Rate your room experience and leave feedback. Honest reviews help future roommates find the right vibe.",
		accent: "bg-success/15 text-success border-success/30"
	},
	{
		icon: ChefHat,
		title: "Midnight Pantry AI",
		body: "Match your exact hostel ingredients. Pick 2–5 items and get a strict-mode recipe that uses only what you have.",
		accent: "bg-neon-purple/15 text-neon-purple border-neon-purple/30"
	},
	{
		icon: Scale,
		title: "The Tribunal",
		body: "Move room disputes cleanly from Open Dispute to Jury Review to Resolved. Anonymous POV voting keeps it fair.",
		accent: "bg-electric-orange/15 text-electric-orange border-electric-orange/30"
	},
	{
		icon: Zap,
		title: "Instant Demo Mode",
		body: "No sign-up required. Jump straight into a fully populated dashboard and explore every feature in seconds.",
		accent: "bg-success/15 text-success border-success/30"
	}
];
function AuthScreen() {
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [room, setRoom] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [remember, setRemember] = (0, import_react.useState)(true);
	const [loading, setLoading] = (0, import_react.useState)(null);
	const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	const submit = (provider) => {
		if (provider === "email") {
			if (!emailValid) {
				toast.error("Please enter a valid email address.");
				return;
			}
			if (!password) {
				toast.error("Password is required.");
				return;
			}
			setLoading("email");
			setTimeout(() => {
				if (mode === "signup") {
					if (!name.trim()) {
						setLoading(null);
						toast.error("Please enter your full name.");
						return;
					}
					if (password.length < 6) {
						setLoading(null);
						toast.error("Password must be at least 6 characters.");
						return;
					}
					const res = registerAccount(name, email, password);
					if (!res.ok) {
						setLoading(null);
						toast.error(res.error);
						return;
					}
					toast.success("Account created. Welcome to SuiteSurvivor!");
					setUser({
						name: name.trim(),
						email: email.trim().toLowerCase()
					});
				} else {
					const acct = validateCredentials(email, password);
					if (!acct) {
						setLoading(null);
						setPassword("");
						toast.error("Invalid credentials or account does not exist.");
						return;
					}
					setUser({
						name: acct.name,
						email: acct.email
					});
				}
			}, 800);
			return;
		}
		setLoading(provider);
		setTimeout(() => {
			setUser({
				name: provider === "google" ? "Google Roomie" : "Apple Roomie",
				email: `${provider}@hostel.app`
			});
		}, 1200);
	};
	const startDemo = () => {
		setLoading("demo");
		setTimeout(() => {
			enableDemoMode();
		}, 600);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen flex flex-col overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 overflow-hidden",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-32 -left-32 h-80 w-80 rounded-full bg-neon-purple/40 blur-3xl animate-float-blob" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-1/2 -right-32 h-80 w-80 rounded-full bg-electric-orange/30 blur-3xl animate-float-blob",
						style: { animationDelay: "2s" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-neon-purple/25 blur-3xl animate-float-blob",
						style: { animationDelay: "4s" }
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative z-10 px-4 pt-16 pb-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-5xl mx-auto text-center space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-neon-purple",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), "The Ultimate Space for Roommates to Co-Live & Sync"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-4xl sm:text-5xl lg:text-6xl font-black text-gradient leading-[1.1] tracking-tight",
							children: "SuiteSurvivor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed",
							children: "The all-in-one hub to vibe with roommates, split expenses, resolve drama, and share reviews — before things boil over."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row items-center justify-center gap-3 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: startDemo,
								disabled: !!loading,
								className: "group px-8 py-4 rounded-2xl gradient-brand text-white font-black text-base glow-purple hover:scale-[1.03] active:scale-[0.97] transition disabled:opacity-70 disabled:hover:scale-100 flex items-center gap-2 relative overflow-hidden",
								children: [
									loading === "demo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5 transition group-hover:scale-110" }),
									loading === "demo" ? "Launching instant tour…" : "Quick Demo Mode — Skip Auth",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition group-hover:translate-x-0.5" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "No sign-up required. Explore every feature in 60 seconds."
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative z-10 px-4 pb-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-5xl mx-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
						children: FEATURES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-strong rounded-2xl p-5 flex flex-col gap-3 transition hover:bg-white/[0.08] hover:-translate-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `shrink-0 h-10 w-10 rounded-xl grid place-items-center border ${f.accent}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-sm",
								children: f.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-1 leading-relaxed",
								children: f.body
							})] })]
						}, f.title))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative z-10 px-4 pb-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-md mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground font-medium",
								children: "share your room experience"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineReviewForm, {})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative z-10 px-4 pb-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-md mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground font-medium",
								children: "or sign in to save your room"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-strong rounded-3xl p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative grid grid-cols-2 p-1 rounded-full glass mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-1 bottom-1 w-1/2 rounded-full gradient-brand transition-transform duration-300",
									style: { transform: mode === "signin" ? "translateX(0)" : "translateX(100%)" }
								}), ["signin", "signup"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setMode(m),
									className: "relative z-10 py-2 text-sm font-semibold",
									children: m === "signin" ? "Sign In" : "Create Account"
								}, m))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }),
										placeholder: "Full name",
										value: name,
										onChange: setName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }),
										placeholder: "Email",
										value: email,
										onChange: setEmail,
										type: "email",
										valid: email.length > 0 ? emailValid : void 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" }),
										placeholder: "Password",
										value: password,
										onChange: setPassword,
										type: show ? "text" : "password",
										right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setShow((s) => !s),
											className: "text-muted-foreground hover:text-foreground transition",
											"aria-label": show ? "Hide password" : "Show password",
											children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
										})
									}),
									mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-4 w-4" }),
										placeholder: "Room code / invite link (optional)",
										value: room,
										onChange: setRoom
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs pt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 cursor-pointer select-none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												onClick: () => setRemember((r) => !r),
												className: `h-4 w-4 rounded grid place-items-center transition ${remember ? "gradient-brand" : "glass"}`,
												children: remember && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
													className: "h-3 w-3 text-white",
													strokeWidth: 3
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Remember me"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#",
											className: "text-gradient font-semibold hover:opacity-80",
											children: "Forgot password?"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => submit("email"),
										disabled: !!loading,
										className: "w-full mt-2 py-3 rounded-2xl gradient-brand font-semibold text-white glow-purple hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2",
										children: loading === "email" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-5 w-5 animate-spin" }) : mode === "signin" ? "Sign In" : "Create Account"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 my-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: "or"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => submit("google"),
									disabled: !!loading,
									className: "py-3 rounded-2xl glass hover:bg-white/15 transition flex items-center justify-center gap-2 font-medium disabled:opacity-70",
									children: loading === "google" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {}), " Google"] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => submit("apple"),
									disabled: !!loading,
									className: "py-3 rounded-2xl glass hover:bg-white/15 transition flex items-center justify-center gap-2 font-medium disabled:opacity-70",
									children: loading === "apple" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppleIcon, {}), " Apple"] })
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "relative z-10 border-t border-white/10 py-8 px-4 mt-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/privacy",
								className: "hover:text-foreground transition",
								children: "Privacy Policy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-white/10",
								children: "|"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/privacy",
								className: "hover:text-foreground transition",
								children: "Terms of Service"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-white/10",
								children: "|"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/admin",
								className: "hover:text-foreground transition",
								children: "Admin"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "opacity-60",
						children: "SuiteSurvivor. Built for hostel life."
					})]
				})
			})
		]
	});
}
function Field$1({ icon, placeholder, value, onChange, type = "text", right, valid }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center gap-2 px-4 py-3 rounded-2xl glass border transition ${valid === true ? "border-success/60" : valid === false ? "border-destructive/60" : "border-white/10 focus-within:border-neon-purple/60"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type,
				value,
				onChange: (e) => onChange(e.target.value),
				placeholder,
				className: "flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
			}),
			right
		]
	});
}
function InlineReviewForm() {
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 px-4 py-3 rounded-2xl glass border border-white/10 focus-within:border-neon-purple/60 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Your name",
						className: "flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 px-4 py-3 rounded-2xl glass border border-white/10 focus-within:border-neon-purple/60 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: roomCode,
						onChange: (e) => setRoomCode(e.target.value),
						placeholder: "Room code (e.g. SUITE-123)",
						className: "flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
					})]
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
function AliasOnboarding() {
	const [alias, setLocalAlias] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setLocalAlias(generateAlias());
	}, []);
	const reroll = () => setLocalAlias(generateAlias());
	const confirm = () => {
		const trimmed = alias.trim();
		if (trimmed.length < 3) {
			toast.error("Alias must be at least 3 characters.");
			return;
		}
		if (trimmed.length > 24) {
			toast.error("Alias must be under 24 characters.");
			return;
		}
		if (/\s/.test(trimmed)) {
			toast.error("No spaces — use _ or - instead.");
			return;
		}
		setAlias(trimmed);
		toast.success(`Welcome, ${trimmed}. Your real name stays a mystery.`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-neon-purple/40 blur-3xl animate-float-blob" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-electric-orange/30 blur-3xl animate-float-blob",
				style: { animationDelay: "2s" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full max-w-md glass-strong rounded-3xl p-6 sm:p-8 animate-pop-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto h-14 w-14 rounded-2xl gradient-brand grid place-items-center glow-purple mb-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ghost, {
								className: "h-7 w-7 text-white",
								strokeWidth: 2.5
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold text-gradient",
							children: "Pick your hostel alias"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-1",
							children: "Anonymity rule: your real name never shows up. Pick a handle the jury will know you by."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 px-4 py-3 rounded-2xl glass border border-white/10 focus-within:border-neon-purple/60 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: alias,
								onChange: (e) => setLocalAlias(e.target.value),
								maxLength: 24,
								placeholder: "e.g. Room302_Survivor",
								className: "flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: reroll,
							className: "w-full py-3 rounded-2xl glass hover:bg-white/15 transition flex items-center justify-center gap-2 font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { className: "h-4 w-4" }), " Generate another one"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: confirm,
							className: "w-full py-3 rounded-2xl gradient-brand font-semibold text-white glow-purple hover:scale-[1.02] active:scale-[0.98] transition",
							children: "Lock in alias"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-center text-muted-foreground pt-1",
							children: "This is the only name shown on the Dashboard, Drama Board, polls, and splits."
						})
					]
				})]
			})
		]
	});
}
var QUESTIONS = [
	"Who left the empty milk packet inside the induction kettle and burnt the base again?",
	"Whose unwashed laundry pile is silently evolving into a new life form?",
	"Who steals the last Maggi packet at 2 AM without restocking?",
	"Whose 6 AM alarm rings 14 times before they touch it?",
	"Who would survive longest if the Wi-Fi died for a week?",
	"Whose side of the room qualifies as an official biohazard zone?"
];
function VibeCheck() {
	const room = useRoom();
	const currentAlias = useAuth()?.alias ?? "You";
	const ROOMMATES = room?.roommates ?? [
		"A",
		"B",
		"C"
	];
	const seed = (0, import_react.useMemo)(() => consumeSeedVibe(), []);
	const [seedExtras] = (0, import_react.useState)(seed);
	const [customQ, setCustomQ] = (0, import_react.useState)(seed?.question ?? null);
	const [customPct, setCustomPct] = (0, import_react.useState)(seed?.percentages ?? null);
	const [qIndex, setQIndex] = (0, import_react.useState)(0);
	const [votes, setVotes] = (0, import_react.useState)(seed ? Object.fromEntries(ROOMMATES.map((r) => [r, seed.votes[r] ?? null])) : Object.fromEntries(ROOMMATES.map((r) => [r, null])));
	const polls = useCustomPolls();
	const [builderOpen, setBuilderOpen] = (0, import_react.useState)(false);
	const [newQ, setNewQ] = (0, import_react.useState)("");
	const [newOpts, setNewOpts] = (0, import_react.useState)(["", ""]);
	const allVoted = ROOMMATES.every((r) => votes[r]);
	const question = customQ ?? QUESTIONS[qIndex];
	const verdict = (0, import_react.useMemo)(() => {
		if (customPct) {
			let winner = "";
			let max = 0;
			Object.entries(customPct).forEach(([k, v]) => {
				if (v > max) {
					winner = k;
					max = v;
				}
			});
			return {
				winner,
				max,
				tally: customPct,
				isPercent: true
			};
		}
		const tally = {};
		Object.values(votes).forEach((v) => {
			if (v) tally[v] = (tally[v] ?? 0) + 1;
		});
		let winner = "";
		let max = 0;
		Object.entries(tally).forEach(([k, v]) => {
			if (v > max) {
				winner = k;
				max = v;
			}
		});
		return {
			winner,
			max,
			tally,
			isPercent: false
		};
	}, [votes, customPct]);
	const reset = () => {
		setCustomQ(null);
		setCustomPct(null);
		setQIndex((i) => (i + 1) % QUESTIONS.length);
		setVotes(Object.fromEntries(ROOMMATES.map((r) => [r, null])));
	};
	const share = async () => {
		const text = `🔥 SuiteSurvivor Verdict: "${question}" → ${verdict.isPercent ? `${verdict.winner} takes the crown with ${verdict.max}% of votes` : `${verdict.winner} wins — ${verdict.max}/${ROOMMATES.length} votes`}. #RoomieDrama\n\nPick your own hot take at ${typeof window !== "undefined" ? window.location.origin : "suitesurvivor.app"}`;
		try {
			await navigator.clipboard.writeText(text);
			toast.success("Copied to clipboard!");
		} catch {
			toast.error("Couldn't copy. Long-press to share manually.");
		}
	};
	const submitPoll = () => {
		const opts = newOpts.map((o) => o.trim()).filter(Boolean);
		if (!newQ.trim() || opts.length < 2) {
			toast.error("Need a question and at least 2 options.");
			return;
		}
		addCustomPoll({
			question: newQ.trim(),
			options: opts,
			source: "user"
		});
		toast.success("Poll launched! 🚀");
		setNewQ("");
		setNewOpts(["", ""]);
		setBuilderOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 animate-pop-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setBuilderOpen((o) => !o),
				className: "w-full glass-strong rounded-3xl p-4 flex items-center gap-3 hover:bg-white/10 transition group",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-10 w-10 rounded-2xl gradient-brand grid place-items-center glow-purple group-hover:scale-110 transition",
						children: builderOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5 text-white" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5 text-white" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-left flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold text-sm",
							children: "Create Custom Poll"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "Drop your own roomie drama for a vote"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-electric-orange" })
				]
			}),
			builderOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong rounded-3xl p-5 space-y-3 animate-pop-in",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-widest text-electric-orange font-bold",
						children: "New Poll"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: newQ,
						onChange: (e) => setNewQ(e.target.value),
						placeholder: "e.g. Who forgot to lock the main door?",
						className: "w-full px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [newOpts.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: o,
								onChange: (e) => setNewOpts((arr) => arr.map((v, idx) => idx === i ? e.target.value : v)),
								placeholder: `Option ${i + 1}`,
								className: "flex-1 px-4 py-2.5 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60"
							}), newOpts.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setNewOpts((arr) => arr.filter((_, idx) => idx !== i)),
								className: "h-9 w-9 grid place-items-center rounded-full glass hover:bg-destructive/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
							})]
						}, i)), newOpts.length < 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setNewOpts((arr) => [...arr, ""]),
							className: "text-xs text-electric-orange font-semibold flex items-center gap-1 hover:underline",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" }),
								" Add option (",
								4 - newOpts.length,
								" left)"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: submitPoll,
						className: "w-full py-3 rounded-2xl gradient-brand text-white font-bold glow-purple flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wand, { className: "h-4 w-4" }), " Launch Poll"]
					})
				]
			}),
			polls.map((p) => {
				const total = Object.values(p.tally).reduce((a, b) => a + b, 0);
				const userLocked = hasUserVotedCustomPoll(p.id, currentAlias);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-strong rounded-3xl p-5 animate-pop-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs uppercase tracking-widest text-neon-purple font-bold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }),
								" ",
								p.source === "onboarding" ? "Auto-Generated Poll" : "Custom Poll"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 text-lg font-bold leading-snug",
							children: p.question
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-2",
							children: p.options.map((opt) => {
								const count = p.tally[opt] ?? 0;
								const pct = total > 0 ? Math.round(count / total * 100) : 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => voteCustomPoll(p.id, opt, currentAlias),
									disabled: userLocked,
									className: `w-full relative overflow-hidden glass rounded-2xl p-3 text-left transition ${userLocked ? "opacity-50 cursor-not-allowed" : "hover:bg-white/15"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-y-0 left-0 gradient-brand opacity-30 transition-all duration-500",
										style: { width: `${pct}%` }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-semibold",
											children: opt
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-bold text-gradient",
											children: [
												pct,
												"% · ",
												count
											]
										})]
									})]
								}, opt);
							})
						}),
						userLocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[10px] text-muted-foreground text-center",
							children: "You have already voted on this poll."
						})
					]
				}, p.id);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong rounded-3xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs uppercase tracking-widest text-electric-orange font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3.5 w-3.5" }), " Active Poll"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-2 text-2xl font-bold leading-snug",
						children: question
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-3",
						children: [(() => {
							const myVote = votes[currentAlias] ?? null;
							const hasVoted = myVote !== null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: currentAlias
										}), " votes for…"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `grid gap-2`,
										style: { gridTemplateColumns: `repeat(${ROOMMATES.length}, minmax(0, 1fr))` },
										children: ROOMMATES.map((target) => {
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													if (!hasVoted) {
														setVotes((v) => ({
															...v,
															[currentAlias]: target
														}));
														setCustomPct(null);
													}
												},
												disabled: hasVoted,
												className: `py-2 rounded-xl text-xs font-semibold transition ${myVote === target ? "gradient-brand text-white glow-purple" : hasVoted ? "glass opacity-50 cursor-not-allowed" : "glass hover:bg-white/15"}`,
												children: target
											}, target);
										})
									}),
									hasVoted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-[10px] text-muted-foreground text-center",
										children: "You have already voted on this poll."
									})
								]
							}, currentAlias);
						})(), ROOMMATES.filter((r) => r !== currentAlias && votes[r]).map((voter) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-2xl p-3 opacity-70",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: voter
								}), " voted for…"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `grid gap-2`,
								style: { gridTemplateColumns: `repeat(${ROOMMATES.length}, minmax(0, 1fr))` },
								children: ROOMMATES.map((target) => {
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `py-2 rounded-xl text-xs font-semibold text-center ${votes[voter] === target ? "gradient-brand text-white" : "glass"}`,
										children: target
									}, target);
								})
							})]
						}, voter))]
					})
				]
			}),
			(allVoted || customPct) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative rounded-3xl p-6 overflow-hidden animate-pop-in gradient-brand glow-purple",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative text-center text-white space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.3em] opacity-80",
							children: "The Verdict Is In"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-4xl font-black drop-shadow-lg",
							children: verdict.winner
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm opacity-90 italic",
							children: [
								"\"",
								question,
								"\""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-center gap-2 pt-1 flex-wrap",
							children: ROOMMATES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `px-2 py-1 rounded-full text-[10px] font-bold ${r === verdict.winner ? "bg-white text-neon-purple" : "bg-white/20"}`,
								children: [
									r,
									" · ",
									verdict.tally[r] ?? 0,
									verdict.isPercent ? "%" : ""
								]
							}, r))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: share,
								className: "flex-1 py-2.5 rounded-xl bg-white text-neon-purple font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "h-4 w-4" }), " 🔗 Share Verdict"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: reset,
								className: "px-4 py-2.5 rounded-xl bg-white/20 backdrop-blur font-bold flex items-center justify-center gap-2 hover:bg-white/30 transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-4 w-4" })
							})]
						})
					]
				})]
			}),
			seedExtras?.completedQuestion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong rounded-3xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs uppercase tracking-widest text-success font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), " Completed Poll"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed",
						children: seedExtras.completedQuestion
					}),
					seedExtras.completedWinner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center justify-between glass rounded-2xl p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "Verdict"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-black text-gradient",
							children: seedExtras.completedWinner
						})]
					})
				]
			}),
			seedExtras?.upcomingQuestion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong rounded-3xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs uppercase tracking-widest text-electric-orange font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }), " Upcoming Poll"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed",
						children: seedExtras.upcomingQuestion
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[10px] text-muted-foreground italic",
						children: "Drops next — get ready to take sides."
					})
				]
			})
		]
	});
}
var CATEGORY_EMOJI = {
	Rent: "🏠",
	Food: "🍱",
	Wifi: "📶",
	Utilities: "💡",
	Snacks: "🍪",
	Other: "🧾"
};
function SplitExpense() {
	const ROOMMATES = useRoom()?.roommates ?? [
		"A",
		"B",
		"C"
	];
	const [items, setItems] = (0, import_react.useState)(() => consumeSeedExpenses() ?? []);
	const [label, setLabel] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [paidBy, setPaidBy] = (0, import_react.useState)(ROOMMATES[0]);
	const [category, setCategory] = (0, import_react.useState)("Food");
	const add = () => {
		const amt = parseFloat(amount);
		if (!label.trim() || !amt || amt <= 0) return;
		setItems((i) => [{
			id: Date.now().toString(),
			label: label.trim(),
			amount: amt,
			paidBy,
			category
		}, ...i]);
		setLabel("");
		setAmount("");
	};
	const balances = (0, import_react.useMemo)(() => {
		const b = Object.fromEntries(ROOMMATES.map((r) => [r, 0]));
		items.forEach((e) => {
			const share = e.amount / ROOMMATES.length;
			ROOMMATES.forEach((r) => {
				b[r] -= share;
			});
			if (b[e.paidBy] !== void 0) b[e.paidBy] += e.amount;
		});
		return b;
	}, [items, ROOMMATES]);
	const max = Math.max(1, ...Object.values(balances).map(Math.abs));
	const hasItems = items.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 animate-pop-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong rounded-3xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs uppercase tracking-widest text-electric-orange font-bold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-3.5 w-3.5" }),
							" ",
							ROOMMATES.length,
							"-Way Split"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-2 text-2xl font-bold",
						children: "Who owes who?"
					}),
					hasItems ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 space-y-3",
						children: ROOMMATES.map((r) => {
							const bal = balances[r];
							const positive = bal >= 0;
							const pct = Math.abs(bal) / max * 100;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: r
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `text-sm font-bold ${positive ? "text-success" : "text-electric-orange"}`,
											children: [
												positive ? "+" : "−",
												"₹",
												Math.abs(bal).toFixed(0)
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2 rounded-full bg-white/10 overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `h-full rounded-full transition-all duration-700 ${positive ? "bg-success" : "gradient-brand"}`,
											style: { width: `${pct}%` }
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-[10px] text-muted-foreground",
										children: [positive ? "Gets back" : "Owes", " to the group"]
									})
								]
							}, r);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 glass rounded-2xl p-6 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-8 w-8 mx-auto text-muted-foreground mb-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold",
								children: "Your room has zero expenses."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: "Either you're all monks, or someone is hiding the bills. Add one below 👇"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong rounded-3xl p-5 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-bold",
						children: "Add expense"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: label,
						onChange: (e) => setLabel(e.target.value),
						placeholder: "e.g. Internet Bill",
						className: "w-full px-4 py-3 rounded-2xl glass outline-none text-sm focus:border-neon-purple/60 border border-white/10"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: amount,
							onChange: (e) => setAmount(e.target.value.replace(/[^0-9.]/g, "")),
							placeholder: "₹900",
							inputMode: "decimal",
							className: "px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: paidBy,
							onChange: (e) => setPaidBy(e.target.value),
							className: "px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10",
							children: ROOMMATES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: r,
								className: "bg-background",
								children: [r, " paid"]
							}, r))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1.5",
						children: "Category"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5",
						children: EXPENSE_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setCategory(c),
							className: `px-3 py-1.5 rounded-full text-xs font-bold transition ${category === c ? "gradient-brand text-white glow-purple" : "glass hover:bg-white/15"}`,
							children: [
								CATEGORY_EMOJI[c],
								" ",
								c
							]
						}, c))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: add,
						className: "w-full py-3 rounded-2xl gradient-brand glow-purple text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add to split"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: items.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-2xl p-3 flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-0.5",
							children: [e.category && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] px-2 py-0.5 rounded-full glass-strong text-neon-pink font-bold whitespace-nowrap",
								children: [
									CATEGORY_EMOJI[e.category],
									" ",
									e.category
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold truncate",
								children: e.label
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Paid by ",
								e.paidBy,
								" · ₹",
								(e.amount / ROOMMATES.length).toFixed(0),
								" each"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-gradient font-bold",
							children: ["₹", e.amount]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setItems((arr) => arr.filter((x) => x.id !== e.id)),
							className: "h-8 w-8 grid place-items-center rounded-full glass hover:bg-destructive/20 transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
						})]
					})]
				}, e.id))
			})
		]
	});
}
var INGREDIENTS = [
	"Bread",
	"Cheese",
	"Maggi",
	"Onion",
	"Egg",
	"Tomato",
	"Butter",
	"Chilli",
	"Curd",
	"Biscuit",
	"Milk",
	"Banana"
];
var DICTIONARY = [
	{
		name: "Chilli Cheese Toast",
		emoji: "🧀",
		time: "5 min",
		tool: "Tawa",
		needs: [
			"Bread",
			"Cheese",
			"Chilli"
		],
		steps: [
			"Butter one side of each bread slice if you have butter handy.",
			"Grate cheese, mix with finely chopped chilli, press onto bread.",
			"Toast on low flame till the cheese melts and bread is golden."
		]
	},
	{
		name: "Bombay Veg Sandwich",
		emoji: "🥪",
		time: "6 min",
		tool: "Tawa",
		needs: [
			"Bread",
			"Cheese",
			"Tomato",
			"Onion"
		],
		steps: [
			"Slice onion and tomato thin, season with salt and pepper.",
			"Layer cheese + onion + tomato between two bread slices.",
			"Toast both sides till crisp; cut diagonally for the aesthetic."
		]
	},
	{
		name: "Buttery Garlic-less Toast",
		emoji: "🍞",
		time: "3 min",
		tool: "Tawa",
		needs: ["Bread", "Butter"],
		steps: [
			"Heat tawa, butter both sides of the bread generously.",
			"Toast 60–90s a side till golden brown.",
			"Stack, salt lightly, vanish at 2am."
		]
	},
	{
		name: "Sweet Banana Toast",
		emoji: "🍌",
		time: "4 min",
		tool: "Tawa",
		needs: [
			"Bread",
			"Banana",
			"Butter"
		],
		steps: [
			"Butter the bread, layer banana slices on top.",
			"Toast butter-side down on low flame till caramelized.",
			"Optional: crush a biscuit over it for crunch."
		]
	},
	{
		name: "Bread Omelet",
		emoji: "🍳",
		time: "6 min",
		tool: "Tawa",
		needs: [
			"Bread",
			"Egg",
			"Onion"
		],
		steps: [
			"Whisk eggs with chopped onion, salt and pepper.",
			"Pour onto hot tawa, immediately press bread slice into it.",
			"Flip after 60s, cook the other side, fold and serve."
		]
	},
	{
		name: "Curd Bread Bites",
		emoji: "🥣",
		time: "3 min",
		tool: "No-cook",
		needs: ["Bread", "Curd"],
		steps: [
			"Tear bread into bite-size pieces in a bowl.",
			"Top with chilled curd, pinch of salt and pepper.",
			"Mix and eat immediately — it gets soggy fast."
		]
	},
	{
		name: "Cheesy Maggi Bomb",
		emoji: "🍜",
		time: "7 min",
		tool: "Kettle",
		needs: ["Maggi", "Cheese"],
		steps: [
			"Boil 1.5 cups of water in your kettle.",
			"Drop Maggi + tastemaker, cook 2 minutes.",
			"Tear cheese on top, cover for 30s, devour."
		]
	},
	{
		name: "Masala Maggi",
		emoji: "🌶️",
		time: "8 min",
		tool: "Induction",
		needs: [
			"Maggi",
			"Onion",
			"Tomato"
		],
		steps: [
			"Sauté chopped onion till translucent, add tomato, cook till mushy.",
			"Pour 1.5 cups water + tastemaker, bring to boil.",
			"Add Maggi cake, cook 2 minutes, stir and serve hot."
		]
	},
	{
		name: "Egg Maggi",
		emoji: "🥚",
		time: "8 min",
		tool: "Induction",
		needs: ["Maggi", "Egg"],
		steps: [
			"Boil 1.5 cups water, add Maggi + tastemaker.",
			"When Maggi is half-cooked, crack egg directly in and stir.",
			"Cook 2 more minutes till noodles soak the egg — golden silk."
		]
	},
	{
		name: "Hostel Champion Maggi",
		emoji: "👑",
		time: "10 min",
		tool: "Induction",
		needs: [
			"Maggi",
			"Egg",
			"Onion",
			"Tomato"
		],
		steps: [
			"Sauté onion + tomato till soft, crack egg in and scramble.",
			"Add 1.5 cups water + tastemaker, bring to boil.",
			"Drop Maggi, cook 2 minutes, finish with chilli if you have it."
		]
	},
	{
		name: "Classic Scrambled Eggs",
		emoji: "🍳",
		time: "4 min",
		tool: "Tawa",
		needs: ["Egg", "Butter"],
		steps: [
			"Whisk eggs with a pinch of salt.",
			"Melt butter on low flame, pour eggs in.",
			"Stir slowly till just-set and creamy. Don't overcook."
		]
	},
	{
		name: "Masala Anda Bhurji",
		emoji: "🍽️",
		time: "8 min",
		tool: "Induction",
		needs: [
			"Egg",
			"Onion",
			"Tomato",
			"Chilli"
		],
		steps: [
			"Sauté onion + chilli till soft, add tomato, cook till mushy.",
			"Whisk eggs and pour in, scramble on medium heat.",
			"Season with salt + pepper, serve with bread or solo."
		]
	},
	{
		name: "Late Night Banana Shake",
		emoji: "🥤",
		time: "3 min",
		tool: "Blender",
		needs: [
			"Banana",
			"Milk",
			"Biscuit"
		],
		steps: [
			"Toss banana + 1 cup milk + 2 biscuits into blender.",
			"Blend 30s till smooth and frothy.",
			"Pour into your one clean glass. Sleep peacefully."
		]
	},
	{
		name: "Quick Banana Milk",
		emoji: "🍼",
		time: "2 min",
		tool: "No-cook",
		needs: ["Banana", "Milk"],
		steps: [
			"Mash banana in a glass with a fork.",
			"Pour cold milk over, stir well.",
			"Optional sugar. Drink in 60s of zen."
		]
	},
	{
		name: "Biscuit Dunk Session",
		emoji: "🍪",
		time: "1 min",
		tool: "No-cook",
		needs: ["Biscuit", "Milk"],
		steps: [
			"Warm milk if you're feeling fancy.",
			"Dunk biscuit for exactly 2 seconds — any longer is anarchy.",
			"Repeat till packet is gone."
		]
	},
	{
		name: "Curd Banana Bowl",
		emoji: "🍌",
		time: "2 min",
		tool: "No-cook",
		needs: ["Curd", "Banana"],
		steps: [
			"Slice banana into a bowl.",
			"Top with curd, drizzle of sugar/honey if you have it.",
			"Mix and eat — closest thing to breakfast at 3am."
		]
	}
];
function dynamicRecipe(picked) {
	const set = new Set(picked);
	const has = (i) => set.has(i);
	const list = picked.join(" + ");
	const steps = [];
	let tool = "Tawa";
	let emoji = "🍳";
	let name = `${picked[0]} Hostel Mashup`;
	if (has("Maggi")) {
		tool = "Induction";
		emoji = "🍜";
		name = picked.length === 1 ? "Plain Maggi" : `Custom Maggi (${picked.filter((p) => p !== "Maggi").join(" + ")})`;
		if (has("Onion") || has("Tomato") || has("Chilli")) steps.push(`Sauté ${[
			has("Onion") && "onion",
			has("Chilli") && "chilli",
			has("Tomato") && "tomato"
		].filter(Boolean).join(" + ")} till soft.`);
		if (has("Egg")) steps.push("Crack egg in and scramble lightly.");
		steps.push("Add 1.5 cups water + Maggi tastemaker, bring to a boil.");
		steps.push("Drop Maggi cake, cook 2 minutes.");
		if (has("Cheese")) steps.push("Tear cheese on top, cover 30s till melted.");
		if (has("Butter")) steps.push("Finish with a tiny knob of butter for shine.");
	} else if (has("Egg")) {
		tool = "Tawa";
		emoji = "🍳";
		name = has("Bread") ? "Bread + Egg Stack" : "Custom Egg Plate";
		if (has("Butter")) steps.push("Heat tawa, melt butter on low flame.");
		else steps.push("Heat tawa on low flame, light oil/ghee if you have it.");
		if (has("Onion") || has("Tomato") || has("Chilli")) steps.push(`Sauté ${[
			has("Onion") && "onion",
			has("Chilli") && "chilli",
			has("Tomato") && "tomato"
		].filter(Boolean).join(" + ")} till soft.`);
		steps.push("Whisk eggs with salt and pepper, pour into the pan.");
		if (has("Cheese")) steps.push("Sprinkle cheese while still wet so it melts in.");
		steps.push("Scramble gently till just-set.");
		if (has("Bread")) steps.push("Pile onto bread (toast it first if you have butter), fold, eat.");
	} else if (has("Bread")) {
		tool = "Tawa";
		emoji = "🥪";
		name = "Custom Hostel Sandwich";
		if (has("Butter")) steps.push("Butter both bread slices on one side.");
		const fillings = [
			has("Cheese") && "cheese",
			has("Tomato") && "tomato",
			has("Onion") && "onion",
			has("Chilli") && "chilli",
			has("Curd") && "a thin curd smear",
			has("Banana") && "banana slices"
		].filter(Boolean);
		if (fillings.length) steps.push(`Layer ${fillings.join(" + ")} between the slices.`);
		else steps.push("Stack the slices together as-is.");
		steps.push("Toast both sides on low flame till golden and crisp.");
	} else if (has("Milk")) {
		tool = "No-cook";
		emoji = "🥛";
		name = "Quick Milk Mix";
		const adds = [has("Banana") && "mashed banana", has("Biscuit") && "crushed biscuit"].filter(Boolean);
		if (adds.length) steps.push(`Stir ${adds.join(" + ")} into a glass of milk.`);
		else steps.push("Pour milk into a glass. Warm it if you want.");
		steps.push("Add sugar to taste, drink slowly.");
	} else if (has("Curd")) {
		tool = "No-cook";
		emoji = "🥣";
		name = "Curd Bowl";
		const adds = [
			has("Banana") && "banana slices",
			has("Biscuit") && "crushed biscuit",
			has("Tomato") && "chopped tomato",
			has("Onion") && "fine onion",
			has("Chilli") && "chopped chilli"
		].filter(Boolean);
		steps.push("Spoon curd into a bowl, season with salt.");
		if (adds.length) steps.push(`Top with ${adds.join(" + ")}.`);
		steps.push("Mix gently and eat cold.");
	} else {
		tool = "No-cook";
		emoji = "🍽️";
		name = "Hostel Snack Plate";
		steps.push(`Arrange ${list} on a plate.`);
		steps.push("Season with salt/sugar depending on the vibe.");
		steps.push("Eat in bed. Don't tell mom.");
	}
	steps.push(`Uses only what you picked: ${list}. Nothing else required.`);
	const time = picked.length <= 2 ? "3 min" : picked.length === 3 ? "6 min" : "8 min";
	return {
		name,
		emoji,
		time,
		tool,
		needs: picked,
		steps
	};
}
function matchRecipes(picked) {
	if (picked.length === 0) return [];
	const set = new Set(picked);
	const matches = DICTIONARY.filter((r) => r.needs.every((n) => set.has(n)));
	matches.sort((a, b) => b.needs.length - a.needs.length);
	return matches.map((r) => {
		const used = r.needs.filter((n) => set.has(n));
		return {
			recipe: r,
			used,
			unused: picked.filter((p) => !r.needs.includes(p)),
			coverage: picked.length > 0 ? used.length / picked.length : 0
		};
	});
}
function getEggWarnings(picked) {
	const set = new Set(picked);
	if (!set.has("Egg")) return [];
	const warnings = [];
	if (set.has("Milk") && !set.has("Banana") && !set.has("Biscuit")) warnings.push("Egg + milk without banana/biscuit? That's an unusual combo.");
	if (set.has("Curd")) warnings.push("Egg + curd is a conflicting combo for many. Consider dropping one.");
	if (set.has("Biscuit") && !set.has("Milk") && !set.has("Banana")) warnings.push("Egg + biscuit without milk/banana? Might not work well together.");
	return warnings;
}
function exportRecipeCard(recipe) {
	return [
		`🍽️ ${recipe.name} ${recipe.emoji}`,
		``,
		`⏱️ ${recipe.time} · 🔧 ${recipe.tool}`,
		``,
		`Ingredients: ${recipe.needs.join(", ")}`,
		``,
		`Steps:`,
		...recipe.steps.map((s, i) => `${i + 1}. ${s}`),
		``,
		`— Generated by SuiteSurvivor Midnight Pantry AI`
	].join("\n");
}
function PantryAI() {
	const [picked, setPicked] = (0, import_react.useState)([]);
	const [generated, setGenerated] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const toggle = (i) => {
		setPicked((p) => p.includes(i) ? p.filter((x) => x !== i) : p.length >= 5 ? p : [...p, i]);
		setGenerated(null);
	};
	const matches = (0, import_react.useMemo)(() => matchRecipes(picked), [picked]);
	const warnings = (0, import_react.useMemo)(() => getEggWarnings(picked), [picked]);
	const generate = () => {
		setLoading(true);
		setGenerated(null);
		setTimeout(() => {
			setGenerated(matches[0]?.recipe ?? dynamicRecipe(picked));
			setLoading(false);
		}, 900);
	};
	const canGen = picked.length >= 2 && picked.length <= 5;
	const share = async () => {
		if (!generated) return;
		const text = exportRecipeCard(generated);
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			toast.success("Recipe card copied to clipboard!");
			setTimeout(() => setCopied(false), 2e3);
		} catch {
			toast.error("Couldn't copy. Long-press to copy manually.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 animate-pop-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong rounded-3xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs uppercase tracking-widest text-electric-orange font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChefHat, { className: "h-3.5 w-3.5" }), " Midnight Pantry AI"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-2 text-2xl font-bold",
						children: "Pick 2–5 ingredients"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: [
							"Strict mode: only recipes that fit your exact selection. Selected ",
							picked.length,
							"/5."
						]
					}),
					warnings.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 space-y-1.5",
						children: warnings.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-2 rounded-xl bg-electric-orange/10 border border-electric-orange/30 p-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Egg, { className: "h-4 w-4 text-electric-orange shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-electric-orange font-medium",
								children: w
							})]
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: INGREDIENTS.map((i) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => toggle(i),
								className: `px-3 py-2 rounded-full text-sm font-semibold transition ${picked.includes(i) ? "gradient-brand text-white glow-purple scale-105" : "glass hover:bg-white/15"}`,
								children: i
							}, i);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: generate,
						disabled: !canGen || loading,
						className: "mt-5 w-full py-3 rounded-2xl gradient-brand text-white font-bold glow-purple disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2",
						children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), loading ? "Cooking up magic…" : "Generate Recipe"]
					})
				]
			}),
			picked.length >= 2 && !generated && (matches.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong rounded-3xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[10px] uppercase tracking-widest text-neon-pink font-bold mb-2",
					children: [
						matches.length,
						" strict match",
						matches.length > 1 ? "es" : ""
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: matches.slice(0, 4).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setGenerated(m.recipe),
						className: "w-full text-left glass rounded-2xl p-3 hover:bg-white/15 transition",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl",
									children: m.recipe.emoji
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold truncate",
										children: m.recipe.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-muted-foreground truncate",
										children: [
											m.recipe.needs.join(" + "),
											" · ",
											m.recipe.time
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap gap-1.5",
								children: [m.used.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "px-2 py-0.5 rounded-full text-[10px] font-bold bg-success/20 text-success border border-success/30",
									children: ["✓ ", u]
								}, u)), m.unused.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/5 text-muted-foreground border border-white/10",
									children: ["+", u]
								}, u))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1.5 text-[10px] text-muted-foreground",
								children: [
									"Uses ",
									Math.round(m.coverage * 100),
									"% of your selection · ",
									m.unused.length > 0 ? `${m.unused.length} extra${m.unused.length > 1 ? "s" : ""} unused` : "Perfect fit"
								]
							})
						]
					}, m.recipe.name))
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-3xl p-4 flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 text-electric-orange mt-0.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"No curated recipe needs ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "only" }),
						" ",
						picked.join(", "),
						". Hit Generate to dynamically build one from exactly what you picked."
					]
				})]
			})),
			generated && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong rounded-3xl p-5 animate-pop-in",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-5xl",
							children: generated.emoji
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: share,
							className: "shrink-0 h-9 w-9 grid place-items-center rounded-full glass hover:bg-white/15 transition",
							"aria-label": "Copy recipe card",
							children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-2 text-2xl font-bold text-gradient",
						children: generated.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap gap-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "glass px-2.5 py-1 rounded-full flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
									" ",
									generated.time
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "glass px-2.5 py-1 rounded-full flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3 w-3" }),
									" ",
									generated.tool
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "glass px-2.5 py-1 rounded-full text-neon-pink font-bold",
								children: generated.needs.join(" + ")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-4 space-y-2",
						children: generated.steps.map((s, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3 glass rounded-2xl p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-6 w-6 shrink-0 rounded-full gradient-brand grid place-items-center text-xs font-bold",
								children: idx + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: s
							})]
						}, idx))
					})
				]
			})
		]
	});
}
var TEMPLATES = [(g, n) => ({
	grievance: `Filed by the room: "${g.slice(0, 140)}"`,
	compromise: `Quiet hours enforced from 12:00 AM to 7:00 AM. Headphones mandatory after midnight. ${n[0]} gets one "loud night" exemption per week with 6-hour notice.`,
	penalty: `Each violation = one round of midnight chai for the room (₹50 fund). Three strikes = lose AC remote privileges for a week.`,
	summary: `Peace restored. Sleep schedules respected. Snacks subsidized.`
}), (g, n) => ({
	grievance: `The court acknowledges: "${g.slice(0, 140)}"`,
	compromise: `Shared chore rotation reset every Monday. Defaulting party owes the room a homemade Maggi session within 48 hours.`,
	penalty: `Skipping chore week = ₹100 to the common pantry fund + losing the Wi-Fi password for 24 hours.`,
	summary: `Order restored to ${n.join(", ")}'s kingdom. Long live the treaty.`
})];
function RoomCourt() {
	const names = useRoom()?.roommates ?? [
		"A",
		"B",
		"C"
	];
	const [grievance, setGrievance] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [treaty, setTreaty] = (0, import_react.useState)(null);
	const [signed, setSigned] = (0, import_react.useState)(false);
	const summon = () => {
		if (!grievance.trim()) return;
		setLoading(true);
		setTreaty(null);
		setSigned(false);
		setTimeout(() => {
			const tmpl = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
			setTreaty(tmpl(grievance.trim(), names));
			setLoading(false);
		}, 1400);
	};
	const sign = () => {
		if (signed) return;
		setSigned(true);
		const burst = (x) => confetti_module_default({
			particleCount: 90,
			spread: 70,
			origin: {
				x,
				y: .6
			},
			colors: [
				"#a855f7",
				"#f97316",
				"#ec4899",
				"#ffffff"
			]
		});
		burst(.3);
		setTimeout(() => burst(.7), 150);
		setTimeout(() => burst(.5), 300);
		toast.success("Treaty ratified! Peace upon this room. ⚖️");
	};
	const share = async () => {
		if (!treaty) return;
		const text = `Our room just signed an official SuiteSurvivor Peace Treaty ⚖️🤖\n\nGrievance: ${grievance.trim()}\nCompromise: ${treaty.compromise}\nPenalty: ${treaty.penalty}\n\nGet your own at ${typeof window !== "undefined" ? window.location.origin : "suitesurvivor.app"}`;
		try {
			await navigator.clipboard.writeText(text);
			toast.success("Copied to clipboard!");
		} catch {
			toast.error("Couldn't copy. Long-press to copy manually.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 animate-pop-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-strong rounded-3xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs uppercase tracking-widest text-electric-orange font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "h-3.5 w-3.5" }), " Room Court"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-2 text-2xl font-bold",
					children: "File a Grievance"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-1",
					children: "The AI mediator drafts a binding-ish peace treaty."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: grievance,
					onChange: (e) => setGrievance(e.target.value),
					placeholder: "e.g., Karthik keeps playing Valorant until 3 AM with the lights on...",
					rows: 4,
					className: "mt-4 w-full px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60 resize-none placeholder:text-muted-foreground"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: summon,
					disabled: !grievance.trim() || loading,
					className: "mt-3 w-full py-3 rounded-2xl gradient-brand text-white font-bold glow-purple disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2",
					children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "h-4 w-4" }), loading ? "Consulting diplomatic archives…" : "Summon AI Mediator ⚖️"]
				})
			]
		}), treaty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative rounded-3xl p-[2px] gradient-brand glow-purple animate-pop-in",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[calc(1.5rem-2px)] bg-background/80 backdrop-blur-2xl p-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto h-12 w-12 rounded-2xl gradient-brand grid place-items-center mb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, { className: "h-6 w-6 text-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
								children: "Hostel Peace Treaty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-black text-gradient mt-1",
								children: "Article I — Resolution"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clause, {
						label: "⚖️ Grievance",
						body: treaty.grievance
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clause, {
						label: "🤝 Compromise",
						body: treaty.compromise
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clause, {
						label: "🔥 Penalty Clause",
						body: treaty.penalty
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs italic text-muted-foreground border-t border-white/10 pt-3",
						children: treaty.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 pt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: sign,
							disabled: signed,
							className: `flex-1 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition ${signed ? "bg-success/20 text-success border border-success/40" : "gradient-brand text-white glow-purple hover:scale-[1.02] active:scale-[0.98]"}`,
							children: signed ? "Treaty Ratified ✅" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "h-4 w-4" }), " Sign Treaty ✍️"] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: share,
							className: "px-4 py-3 rounded-2xl glass hover:bg-white/15 transition flex items-center gap-2 font-bold",
							"aria-label": "Share treaty",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4" }), " 🔗"]
						})]
					})
				]
			})
		})]
	});
}
function Clause({ label, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-2xl p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] uppercase tracking-widest text-electric-orange font-bold mb-1",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm leading-relaxed",
			children: body
		})]
	});
}
var STATUS_STYLES = {
	"Open Dispute": "bg-electric-orange/20 text-electric-orange border-electric-orange/40",
	"Jury Review": "bg-neon-purple/20 text-neon-pink border-neon-purple/40",
	"Resolved": "bg-success/20 text-success border-success/40"
};
var SEED_TITLES = [
	"The Case of the Vanishing Maggi",
	"The Great Wi-Fi Hostage Crisis",
	"Operation Wet Towel on My Bed",
	"Who Killed the Last Parle-G"
];
var VIBES = [
	"🫣",
	"😤",
	"💀",
	"🧘",
	"🔥"
];
function Tribunal() {
	const room = useRoom();
	const currentAlias = useAuth()?.alias ?? "You";
	const suspects = [
		...room?.roommates ?? [
			"A",
			"B",
			"C"
		],
		"The Ghost 👻",
		"Nobody, chill"
	];
	const [incidents, setIncidents] = (0, import_react.useState)([]);
	const [openFile, setOpenFile] = (0, import_react.useState)(false);
	const [openPOV, setOpenPOV] = (0, import_react.useState)(null);
	const [openOpinion, setOpenOpinion] = (0, import_react.useState)(null);
	const [reveal, setReveal] = (0, import_react.useState)({});
	const [title, setTitle] = (0, import_react.useState)("");
	const [crime, setCrime] = (0, import_react.useState)("");
	const [pText, setPText] = (0, import_react.useState)("");
	const [pVibe, setPVibe] = (0, import_react.useState)("🫣");
	const [oSuspect, setOSuspect] = (0, import_react.useState)(suspects[0]);
	const [oIntensity, setOIntensity] = (0, import_react.useState)(60);
	const spillTea = () => {
		if (!crime.trim()) return;
		setIncidents([{
			id: Date.now().toString(36),
			title: title.trim() || SEED_TITLES[Math.floor(Math.random() * SEED_TITLES.length)],
			crime: crime.trim(),
			filedBy: currentAlias,
			createdAt: Date.now(),
			perspectives: [],
			opinions: [],
			status: "Open Dispute"
		}, ...incidents]);
		setTitle("");
		setCrime("");
		setOpenFile(false);
		toast.success("Tea spilled. The room is watching. ☕🔥");
	};
	const submitPOV = () => {
		if (!openPOV || !pText.trim()) return;
		if (openPOV.perspectives.some((p) => p.juror === currentAlias)) {
			toast.error("You already shared your POV on this case.");
			setOpenPOV(null);
			return;
		}
		const updated = {
			...openPOV,
			status: openPOV.status === "Resolved" ? "Resolved" : "Jury Review",
			perspectives: [...openPOV.perspectives, {
				id: Date.now().toString(36),
				juror: currentAlias,
				text: pText.trim(),
				vibe: pVibe
			}]
		};
		setIncidents(incidents.map((i) => i.id === updated.id ? updated : i));
		setOpenPOV(null);
		setPText("");
		toast.success("POV added to the lore. 🎭");
	};
	const toggleResolved = (inc) => {
		const next = inc.status === "Resolved" ? inc.perspectives.length > 0 ? "Jury Review" : "Open Dispute" : "Resolved";
		setIncidents(incidents.map((i) => i.id === inc.id ? {
			...i,
			status: next
		} : i));
		toast.success(next === "Resolved" ? "Case closed. Peace restored. 🕊️" : "Case reopened. Drama is back. 🔥");
	};
	const submitOpinion = () => {
		if (!openOpinion) return;
		if (openOpinion.opinions.some((o) => o.voter === currentAlias)) {
			toast.error("You already cast your verdict on this case.");
			setOpenOpinion(null);
			return;
		}
		const updated = {
			...openOpinion,
			opinions: [...openOpinion.opinions, {
				voter: currentAlias,
				suspect: oSuspect,
				intensity: oIntensity
			}]
		};
		setIncidents(incidents.map((i) => i.id === updated.id ? updated : i));
		setOpenOpinion(null);
		toast.success("Vote locked in. The room has spoken. ⚖️");
	};
	const toggleReveal = (id) => setReveal((r) => ({
		...r,
		[id]: !r[id]
	}));
	const hasUserPOV = (inc) => inc.perspectives.some((p) => p.juror === currentAlias);
	const hasUserOpinion = (inc) => inc.opinions.some((o) => o.voter === currentAlias);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 animate-pop-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative rounded-3xl p-[2px] gradient-brand glow-purple",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[calc(1.5rem-2px)] bg-background/85 backdrop-blur-2xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-electric-orange font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3.5 w-3.5" }), " The Drama Board"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 text-2xl font-black text-gradient",
							children: "Hostel Tribunal 👀"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: "Log the chaos. Drop your POV. Let the room decide who's guilty."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setOpenFile(true),
							className: "mt-4 w-full py-3.5 rounded-2xl gradient-brand text-white font-black glow-purple hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2 text-base",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coffee, { className: "h-5 w-5" }), " Spill the Tea ☕"]
						})
					]
				})
			}),
			incidents.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-3xl p-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto h-12 w-12 rounded-2xl glass-strong grid place-items-center mb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gavel, { className: "h-6 w-6 text-neon-pink" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold",
						children: "The board is suspiciously quiet."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: "No drama logged yet. Either you live in heaven, or somebody is hiding the receipts."
					})
				]
			}),
			incidents.map((inc) => {
				const revealed = !!reveal[inc.id];
				const verdict = computeVerdict(inc.opinions);
				const userHasPOV = hasUserPOV(inc);
				const userHasOpinion = hasUserOpinion(inc);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-strong rounded-3xl p-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground",
									children: [
										"Case #",
										inc.id.slice(-4).toUpperCase(),
										" · Filed by ",
										inc.filedBy
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-lg font-black text-gradient mt-1 truncate",
									children: inc.title
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-end gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-[10px] px-2 py-1 rounded-full font-black uppercase tracking-wider border whitespace-nowrap ${STATUS_STYLES[inc.status]}`,
									children: inc.status
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] px-2 py-1 rounded-full glass text-neon-pink font-bold whitespace-nowrap",
									children: [
										inc.perspectives.length,
										" POV · ",
										inc.opinions.length,
										" votes"
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-2xl p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-widest text-electric-orange font-bold mb-1",
								children: "🔥 The Alleged Crime"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed",
								children: inc.crime
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] uppercase tracking-widest text-neon-purple font-bold",
									children: "🎭 The Lore Timeline"
								}), inc.perspectives.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => toggleReveal(inc.id),
									className: "text-[10px] flex items-center gap-1 px-2 py-1 rounded-full glass hover:bg-white/15 transition",
									children: [revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3 w-3" }), revealed ? "Hide" : "Reveal"]
								})]
							}),
							inc.perspectives.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "glass rounded-2xl p-3 text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "No POVs yet. The lore is unwritten. Be the first storyteller."
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 snap-x",
								children: inc.perspectives.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "snap-start shrink-0 w-[78%] sm:w-[48%] rounded-2xl p-[1.5px] gradient-brand",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-[calc(1rem-1.5px)] bg-background/85 backdrop-blur-xl p-3 h-full flex flex-col",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[10px] font-black uppercase tracking-widest text-electric-orange",
													children: ["POV #", i + 1]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-base",
													children: p.vibe
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm leading-relaxed italic flex-1",
												children: [
													"\"",
													p.text,
													"\""
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[10px] text-muted-foreground mt-2 pt-2 border-t border-white/10",
												children: ["— ", revealed ? p.juror : "Anonymous Juror"]
											})
										]
									})
								}, p.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setOpenPOV(inc);
									setPText("");
									setPVibe("🫣");
								},
								disabled: userHasPOV,
								className: `mt-2 w-full py-2.5 rounded-2xl transition text-sm font-bold flex items-center justify-center gap-2 ${userHasPOV ? "glass opacity-50 cursor-not-allowed" : "glass hover:bg-white/15"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 text-neon-pink" }),
									" ",
									userHasPOV ? "POV Already Shared" : "Drop Your POV"
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-widest text-neon-purple font-bold mb-2",
								children: "⚖️ Opinion Tracker"
							}),
							verdict.total === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "glass rounded-2xl p-3 text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "No votes yet. The jury is still buffering…"
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-3 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] uppercase tracking-widest text-muted-foreground",
											children: "Room consensus"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-black text-gradient",
											children: [
												verdict.topSuspect,
												" · ",
												verdict.topPct,
												"%"
											]
										})]
									}),
									verdict.bars.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs mb-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold truncate",
											children: b.suspect
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground",
											children: [b.pct, "%"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2 rounded-full bg-white/5 overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full gradient-brand",
											style: { width: `${b.pct}%` }
										})
									})] }, b.suspect)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🌡️ Drama intensity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-electric-orange",
											children: [verdict.avgIntensity, "%"]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setOpenOpinion(inc);
										setOSuspect(suspects[0]);
										setOIntensity(60);
									},
									disabled: userHasOpinion,
									className: `py-2.5 rounded-2xl transition text-sm font-bold flex items-center justify-center gap-2 ${userHasOpinion ? "glass opacity-50 cursor-not-allowed" : "glass hover:bg-white/15"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "h-4 w-4 text-electric-orange" }),
										" ",
										userHasOpinion ? "Verdict Locked" : "Verdict"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => toggleResolved(inc),
									className: `py-2.5 rounded-2xl transition text-sm font-bold flex items-center justify-center gap-2 ${inc.status === "Resolved" ? "glass hover:bg-white/15" : "gradient-brand text-white glow-purple hover:scale-[1.02] active:scale-[0.98]"}`,
									children: inc.status === "Resolved" ? "↩ Reopen" : "✓ Resolve"
								})]
							})
						] })
					]
				}, inc.id);
			}),
			openFile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
				onClose: () => setOpenFile(false),
				title: "Spill the Tea ☕",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: title,
						onChange: (e) => setTitle(e.target.value),
						placeholder: "Headline (optional) — e.g. The Maggi Massacre",
						className: "w-full px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: crime,
						onChange: (e) => setCrime(e.target.value),
						placeholder: "What went down? Spill every detail. The room needs to know.",
						rows: 4,
						className: "w-full px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60 resize-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] text-muted-foreground",
						children: ["Filing as: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-foreground",
							children: currentAlias
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: spillTea,
						disabled: !crime.trim(),
						className: "w-full py-3 rounded-2xl gradient-brand text-white font-bold glow-purple disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-4 w-4" }), " Post to the Drama Board"]
					})
				]
			}),
			openPOV && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
				onClose: () => setOpenPOV(null),
				title: "Drop Your POV 🎭",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground -mt-1",
						children: ["On: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground font-bold",
							children: openPOV.title
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] text-muted-foreground",
						children: [
							"Submitting as: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-foreground",
								children: currentAlias
							}),
							" · stays anonymous until Reveal."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1.5",
						children: "Your vibe"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2",
						children: VIBES.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setPVibe(v),
							className: `h-10 w-10 rounded-2xl text-lg transition ${pVibe === v ? "gradient-brand glow-purple scale-110" : "glass hover:bg-white/15"}`,
							children: v
						}, v))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: pText,
						onChange: (e) => setPText(e.target.value),
						placeholder: "Your version of events. Maybe it wasn't even a crime. Maybe it was self-defense against bad vibes…",
						rows: 4,
						className: "w-full px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60 resize-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: submitPOV,
						disabled: !pText.trim(),
						className: "w-full py-3 rounded-2xl gradient-brand text-white font-bold glow-purple disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " Add to the Lore"]
					})
				]
			}),
			openOpinion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
				onClose: () => setOpenOpinion(null),
				title: "Cast Your Verdict ⚖️",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground -mt-1",
						children: ["On: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground font-bold",
							children: openOpinion.title
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] text-muted-foreground",
						children: ["Voting as: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-foreground",
							children: currentAlias
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipPicker, {
						label: "Who caused this?",
						value: oSuspect,
						options: suspects,
						onChange: setOSuspect
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-widest text-muted-foreground font-bold",
								children: "How sure are you?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-black text-electric-orange",
								children: [oIntensity, "%"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 100,
							value: oIntensity,
							onChange: (e) => setOIntensity(Number(e.target.value)),
							className: "w-full accent-[color:var(--neon-purple,#a855f7)]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-[10px] text-muted-foreground mt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🤷 Mid hunch" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🔥 1000% sure" })]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: submitOpinion,
						className: "w-full py-3 rounded-2xl gradient-brand text-white font-bold glow-purple hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "h-4 w-4" }), " Lock In Verdict"]
					})
				]
			})
		]
	});
}
function computeVerdict(opinions) {
	const total = opinions.length;
	if (total === 0) return {
		total: 0,
		bars: [],
		topSuspect: "—",
		topPct: 0,
		avgIntensity: 0
	};
	const counts = {};
	let intSum = 0;
	for (const o of opinions) {
		counts[o.suspect] = (counts[o.suspect] ?? 0) + 1;
		intSum += o.intensity;
	}
	const bars = Object.entries(counts).map(([suspect, n]) => ({
		suspect,
		pct: Math.round(n / total * 100)
	})).sort((a, b) => b.pct - a.pct);
	return {
		total,
		bars,
		topSuspect: bars[0].suspect,
		topPct: bars[0].pct,
		avgIntensity: Math.round(intSum / total)
	};
}
function ChipPicker({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1.5",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: options.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => onChange(n),
			className: `px-3 py-1.5 rounded-full text-xs font-bold transition ${value === n ? "gradient-brand text-white glow-purple" : "glass hover:bg-white/15"}`,
			children: n
		}, n))
	})] });
}
function Modal({ children, onClose, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[60] grid place-items-center p-4 bg-black/70 backdrop-blur-sm animate-pop-in",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full max-w-md rounded-3xl p-[2px] gradient-brand glow-purple max-h-[90vh] overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[calc(1.5rem-2px)] bg-background/90 backdrop-blur-2xl p-5 space-y-3 max-h-[calc(90vh-4px)] overflow-y-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-xl -mx-5 px-5 -mt-5 pt-5 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-black text-gradient",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "h-8 w-8 grid place-items-center rounded-full glass hover:bg-white/15 transition",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}), children]
			})
		})
	});
}
function Dashboard() {
	const [tab, setTab] = (0, import_react.useState)("vibe");
	const user = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen flex flex-col max-w-md mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "px-5 pt-6 pb-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Welcome back,"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold text-gradient truncate max-w-[200px]",
					children: user?.alias ?? "Anonymous"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setUser(null),
					className: "h-10 w-10 grid place-items-center rounded-full glass hover:bg-white/15 transition",
					"aria-label": "Sign out",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 px-5 pb-28 overflow-y-auto",
				children: [
					tab === "vibe" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VibeCheck, {}),
					tab === "split" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitExpense, {}),
					tab === "court" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoomCourt, {}),
					tab === "tribunal" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tribunal, {}),
					tab === "pantry" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PantryAI, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm glass-strong rounded-full p-1.5 flex items-center justify-between z-50",
				children: [
					{
						k: "vibe",
						label: "Vibe",
						icon: Sparkles
					},
					{
						k: "split",
						label: "Split",
						icon: Wallet
					},
					{
						k: "court",
						label: "Court",
						icon: Scale
					},
					{
						k: "tribunal",
						label: "Drama",
						icon: Flame
					},
					{
						k: "pantry",
						label: "Pantry",
						icon: ChefHat
					}
				].map(({ k, label, icon: Icon }) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTab(k),
						className: `flex-1 flex flex-col items-center justify-center gap-0.5 py-2 rounded-full transition ${tab === k ? "gradient-brand glow-purple text-white" : "text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-semibold",
							children: label
						})]
					}, k);
				})
			})
		]
	});
}
function RoomSetup() {
	const [mode, setMode] = (0, import_react.useState)("choose");
	const [size, setSize] = (0, import_react.useState)(3);
	const [me, setMe] = (0, import_react.useState)("");
	const [r2, setR2] = (0, import_react.useState)("");
	const [r3, setR3] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [roomNotFound, setRoomNotFound] = (0, import_react.useState)(false);
	const [sleep, setSleep] = (0, import_react.useState)(null);
	const [ac, setAc] = (0, import_react.useState)(null);
	const [snack, setSnack] = (0, import_react.useState)(null);
	const create = async () => {
		if (!me.trim() || !r2.trim() || size === 3 && !r3.trim()) return;
		setLoading(true);
		try {
			const mates = size === 3 ? [
				me.trim(),
				r2.trim(),
				r3.trim()
			] : [me.trim(), r2.trim()];
			const roomCode = generateRoomCode();
			await createRoom(roomCode, `${me.trim()}'s Room`, mates);
			setPending({
				code: roomCode,
				roommates: mates
			});
			setMode("success");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to create room");
		} finally {
			setLoading(false);
		}
	};
	const join = async () => {
		if (code.trim().length < 3) return;
		setLoading(true);
		setRoomNotFound(false);
		try {
			if (!await findRoomByCode(code)) {
				setRoomNotFound(true);
				setLoading(false);
				return;
			}
			setMode("survey");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to look up room");
		} finally {
			setLoading(false);
		}
	};
	const finishJoin = () => {
		const room = {
			code: code.trim().toUpperCase().startsWith("SUITE-") ? code.trim().toUpperCase() : `SUITE-${code.trim().replace(/\D/g, "").slice(0, 3) || "742"}`,
			roommates: ["You", "Arjun"]
		};
		if (sleep) addCustomPoll({
			question: sleep === "owl" ? "Poll: Who is crashing first based on bedtime habits — the night owl or the early riser?" : "Poll: Who's actually getting more done — early bird You or night-owl Arjun?",
			options: ["You", "Arjun"],
			source: "onboarding"
		});
		if (ac) addCustomPoll({
			question: `Poll: AC showdown — You want it ${ac === "arctic" ? "arctic ❄️" : ac === "chill" ? "comfortably chill" : "barely on"}, Arjun disagrees. Whose setting wins tonight?`,
			options: ["You", "Arjun"],
			source: "onboarding"
		});
		if (snack) addCustomPoll({
			question: snack === "share" ? "Poll: Snack-sharing is sacred — who will be the first to break the pact?" : snack === "ask" ? "Poll: Ask-before-you-eat rule in effect. Who'll forget within 48 hours?" : "Poll: 'Don't touch my Maggi' energy detected. Who gets caught raiding first?",
			options: ["You", "Arjun"],
			source: "onboarding"
		});
		setRoom(room);
	};
	const confirm = () => {
		if (pending) setRoom(pending);
	};
	const copy = async () => {
		if (!pending) return;
		try {
			await navigator.clipboard.writeText(pending.code);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-neon-purple/40 blur-3xl animate-float-blob" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-electric-orange/30 blur-3xl animate-float-blob",
				style: { animationDelay: "2s" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full max-w-md glass-strong rounded-3xl p-6 sm:p-8 animate-pop-in",
				children: [
					mode !== "choose" && mode !== "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setMode(mode === "survey" ? "join" : "choose");
							setRoomNotFound(false);
						},
						className: "mb-4 text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3" }), " Back"]
					}),
					mode === "choose" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto h-14 w-14 rounded-2xl gradient-brand grid place-items-center glow-purple mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-6 w-6 text-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-bold text-gradient",
								children: "Set up your room"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mt-1",
								children: "Start fresh or hop into your roomies' hub."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setMode("create"),
							className: "w-full p-4 rounded-2xl gradient-brand glow-purple text-white text-left hover:scale-[1.02] active:scale-[0.98] transition flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-10 w-10 rounded-xl bg-white/20 grid place-items-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold",
								children: "Create a New Room"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs opacity-90",
								children: "Name your crew & get an invite code"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setMode("join"),
							className: "w-full p-4 rounded-2xl glass hover:bg-white/15 text-left transition flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-10 w-10 rounded-xl gradient-brand grid place-items-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-5 w-5 text-white" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold",
								children: "Join an Existing Room"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Got a code from a roomie?"
							})] })]
						})]
					})] }),
					mode === "create" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold text-gradient mb-1",
							children: "Name your crew"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mb-4",
							children: "Pick your room size, then name the chaos squad."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-2",
								children: "Room Size"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-2 p-1 rounded-2xl glass",
								children: [2, 3].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setSize(s),
									className: `py-2.5 rounded-xl text-sm font-bold transition ${size === s ? "gradient-brand text-white glow-purple" : "text-muted-foreground hover:text-foreground"}`,
									children: [s, " Roommates"]
								}, s))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									placeholder: "Your nickname",
									value: me,
									onChange: setMe
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									placeholder: "Roommate 2's nickname",
									value: r2,
									onChange: setR2
								}),
								size === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									placeholder: "Roommate 3's nickname",
									value: r3,
									onChange: setR3
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: create,
									disabled: !me.trim() || !r2.trim() || size === 3 && !r3.trim() || loading,
									className: "w-full mt-2 py-3 rounded-2xl gradient-brand font-semibold text-white glow-purple hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2",
									children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), "Generate Room Hub"]
								})
							]
						})
					] }),
					mode === "join" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold text-gradient mb-1",
							children: "Join the hub"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mb-5",
							children: "Pop in the code your roomie sent you."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `flex items-center gap-2 px-4 py-3 rounded-2xl glass border transition ${roomNotFound ? "border-destructive/60" : "border-white/10 focus-within:border-neon-purple/60"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: code,
										onChange: (e) => {
											setCode(e.target.value.toUpperCase());
											setRoomNotFound(false);
										},
										placeholder: "Enter Room Code (e.g. SUITE-123)",
										className: "flex-1 bg-transparent outline-none text-sm tracking-widest placeholder:text-muted-foreground placeholder:tracking-normal"
									})]
								}),
								roomNotFound && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-destructive font-medium",
									children: "Room Not Found — double-check the code with your roomie."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: join,
									disabled: code.trim().length < 3 || loading,
									className: "w-full py-3 rounded-2xl gradient-brand font-semibold text-white glow-purple hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2",
									children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-4 w-4 animate-spin" }) : "Next: Quick Vibe Check"
								})
							]
						})
					] }),
					mode === "survey" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold text-gradient mb-1",
							children: "Onboarding Vibe Check"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mb-5",
							children: "3 quick taps. We'll auto-generate polls comparing your habits to your roomie."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SurveyBlock, {
							title: "Are you a night owl or an early bird?",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								active: sleep === "owl",
								onClick: () => setSleep("owl"),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-3.5 w-3.5" }),
								label: "Night Owl"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								active: sleep === "bird",
								onClick: () => setSleep("bird"),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-3.5 w-3.5" }),
								label: "Early Bird"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SurveyBlock, {
							title: "Ultimate room AC setting?",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
									active: ac === "arctic",
									onClick: () => setAc("arctic"),
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Snowflake, { className: "h-3.5 w-3.5" }),
									label: "Arctic 18°"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
									active: ac === "chill",
									onClick: () => setAc("chill"),
									label: "Chill 22°"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
									active: ac === "warm",
									onClick: () => setAc("warm"),
									label: "Barely On 26°"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SurveyBlock, {
							title: "Stance on sharing snacks/Maggi?",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
									active: snack === "share",
									onClick: () => setSnack("share"),
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cookie, { className: "h-3.5 w-3.5" }),
									label: "Share Freely"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
									active: snack === "ask",
									onClick: () => setSnack("ask"),
									label: "Ask First"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
									active: snack === "mine",
									onClick: () => setSnack("mine"),
									label: "Mine. Don't Touch."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: finishJoin,
							className: "mt-4 w-full py-3 rounded-2xl gradient-brand font-semibold text-white glow-purple hover:scale-[1.02] active:scale-[0.98] transition",
							children: "Enter Room →"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: finishJoin,
							className: "mt-2 w-full text-xs text-muted-foreground hover:text-foreground transition",
							children: "Skip for now"
						})
					] }),
					mode === "success" && pending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto h-14 w-14 rounded-2xl gradient-brand grid place-items-center glow-purple",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "h-7 w-7 text-white",
									strokeWidth: 3
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold text-gradient",
								children: "Room is live!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Share this invite code with your roomies."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: copy,
								className: "mx-auto flex items-center gap-2 px-5 py-3 rounded-2xl glass border border-neon-purple/40 hover:bg-white/15 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-black tracking-widest text-gradient",
									children: pending.code
								}), copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4 text-muted-foreground" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap justify-center gap-2 pt-2",
								children: pending.roommates.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-3 py-1 rounded-full glass text-xs font-semibold",
									children: r
								}, r))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: confirm,
								className: "w-full py-3 rounded-2xl gradient-brand font-semibold text-white glow-purple hover:scale-[1.02] active:scale-[0.98] transition",
								children: "Enter Dashboard"
							})
						]
					})
				]
			})
		]
	});
}
function Field({ placeholder, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center gap-2 px-4 py-3 rounded-2xl glass border border-white/10 focus-within:border-neon-purple/60 transition",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			className: "flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
		})
	});
}
function SurveyBlock({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-semibold mb-2",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children
		})]
	});
}
function Pill({ active, onClick, label, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: `px-3 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${active ? "gradient-brand text-white glow-purple" : "glass hover:bg-white/15 text-muted-foreground"}`,
		children: [icon, label]
	});
}
function Index() {
	const user = useAuth();
	const room = useRoom();
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthScreen, {});
	if (!user.alias) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AliasOnboarding, {});
	if (!room) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoomSetup, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {});
}
//#endregion
export { Index as component };
