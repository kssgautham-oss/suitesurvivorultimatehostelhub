import { useMemo, useState } from "react";
import { Plus, Trash2, Wallet, Receipt } from "lucide-react";
import { useRoom, consumeSeedExpenses, type SeedExpense } from "@/lib/mock-store";

type Expense = SeedExpense;

export default function SplitExpense() {
  const room = useRoom();
  const ROOMMATES = room?.roommates ?? ["A", "B", "C"];
  const [items, setItems] = useState<Expense[]>(() => consumeSeedExpenses() ?? []);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(ROOMMATES[0]);

  const add = () => {
    const amt = parseFloat(amount);
    if (!label.trim() || !amt || amt <= 0) return;
    setItems(i => [{ id: Date.now().toString(), label: label.trim(), amount: amt, paidBy }, ...i]);
    setLabel(""); setAmount("");
  };

  const balances = useMemo(() => {
    const b: Record<string, number> = Object.fromEntries(ROOMMATES.map(r => [r, 0]));
    items.forEach(e => {
      const share = e.amount / ROOMMATES.length;
      ROOMMATES.forEach(r => { b[r] -= share; });
      if (b[e.paidBy] !== undefined) b[e.paidBy] += e.amount;
    });
    return b;
  }, [items, ROOMMATES]);

  const max = Math.max(1, ...Object.values(balances).map(Math.abs));
  const hasItems = items.length > 0;

  return (
    <div className="space-y-5 animate-pop-in">
      <div className="glass-strong rounded-3xl p-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-electric-orange font-bold">
          <Wallet className="h-3.5 w-3.5" /> 3-Way Split
        </div>
        <h3 className="mt-2 text-2xl font-bold">Who owes who?</h3>

        {hasItems ? (
          <div className="mt-5 space-y-3">
            {ROOMMATES.map(r => {
              const bal = balances[r];
              const positive = bal >= 0;
              const pct = (Math.abs(bal) / max) * 100;
              return (
                <div key={r} className="glass rounded-2xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{r}</span>
                    <span className={`text-sm font-bold ${positive ? "text-success" : "text-electric-orange"}`}>
                      {positive ? "+" : "−"}₹{Math.abs(bal).toFixed(0)}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${positive ? "bg-success" : "gradient-brand"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[10px] text-muted-foreground">{positive ? "Gets back" : "Owes"} to the group</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-5 glass rounded-2xl p-6 text-center">
            <Receipt className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm font-semibold">Your room has zero expenses.</p>
            <p className="text-xs text-muted-foreground mt-1">Either you're all monks, or someone is hiding the bills. Add one below 👇</p>
          </div>
        )}
      </div>

      <div className="glass-strong rounded-3xl p-5 space-y-3">
        <h4 className="font-bold">Add expense</h4>
        <input
          value={label}
          onChange={e => setLabel(e.target.value)}
          placeholder="e.g. Internet Bill"
          className="w-full px-4 py-3 rounded-2xl glass outline-none text-sm focus:border-neon-purple/60 border border-white/10"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            value={amount}
            onChange={e => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            placeholder="₹900"
            inputMode="decimal"
            className="px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60"
          />
          <select
            value={paidBy}
            onChange={e => setPaidBy(e.target.value)}
            className="px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10"
          >
            {ROOMMATES.map(r => <option key={r} value={r} className="bg-background">{r} paid</option>)}
          </select>
        </div>
        <button onClick={add} className="w-full py-3 rounded-2xl gradient-brand glow-purple text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition">
          <Plus className="h-4 w-4" /> Add to split
        </button>
      </div>

      <div className="space-y-2">
        {items.map(e => (
          <div key={e.id} className="glass rounded-2xl p-3 flex items-center justify-between">
            <div className="min-w-0">
              <p className="font-semibold truncate">{e.label}</p>
              <p className="text-xs text-muted-foreground">Paid by {e.paidBy} · ₹{(e.amount/ROOMMATES.length).toFixed(0)} each</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-gradient font-bold">₹{e.amount}</span>
              <button onClick={() => setItems(arr => arr.filter(x => x.id !== e.id))} className="h-8 w-8 grid place-items-center rounded-full glass hover:bg-destructive/20 transition">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
