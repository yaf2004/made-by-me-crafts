import React, { useState, useEffect } from "react";
import { Check, X, Clock, RefreshCw, Eye, Download } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "/api";

const STATUS_STYLES = {
  pending:   { bg: "#F7C59F30", color: "#C4614A", label: "Pending",   icon: Clock },
  confirmed: { bg: "#A8D8C830", color: "#1B7A78", label: "Confirmed", icon: Check },
  declined:  { bg: "#F2A6A630", color: "#C4614A", label: "Declined",  icon: X },
};

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);
  const [filter, setFilter] = useState("all");

  const fetchRSVPs = async (pw = password) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/rsvp?password=${encodeURIComponent(pw)}`);
      if (res.status === 401) { setError("Wrong password."); setAuthed(false); return; }
      const data = await res.json();
      setRsvps(data);
      setAuthed(true);
    } catch {
      setError("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    await fetch(`${API}/rsvp/${id}/status?password=${encodeURIComponent(password)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setRsvps((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const exportCSV = () => {
    const headers = ["ID","Name","Email","Phone","Guests","Activities","Seats","Payment","Status","Date"];
    const rows = rsvps.map((r) => [
      r.id, r.full_name, r.email, r.phone || "", r.guest_names || "",
      r.selected_package, r.number_of_seats, r.payment_method, r.status, r.created_at
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "rsvps.csv"; a.click();
  };

  const filtered = filter === "all" ? rsvps : rsvps.filter((r) => r.status === filter);
  const counts = { all: rsvps.length, pending: rsvps.filter(r=>r.status==="pending").length, confirmed: rsvps.filter(r=>r.status==="confirmed").length, declined: rsvps.filter(r=>r.status==="declined").length };
  const totalSeats = rsvps.filter(r=>r.status!=="declined").reduce((s,r)=>s+r.number_of_seats,0);

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6" style={{ backgroundColor: "#2D1F1F" }}>
        <div className="w-full max-w-sm text-center">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.45em]" style={{ color: "#F2A6A6" }}>Admin</p>
          <h1 className="font-display mb-8 text-4xl" style={{ color: "#FDF6F0", fontStyle: "italic" }}>Bedazzling RSVPs</h1>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchRSVPs()}
            className="w-full rounded-xl px-4 py-3 text-sm mb-3"
            style={{ backgroundColor: "rgba(253,246,240,0.08)", border: "1px solid rgba(253,246,240,0.15)", color: "#FDF6F0", outline: "none" }}
            autoFocus
          />
          {error && <p className="mb-3 text-sm" style={{ color: "#F2A6A6" }}>{error}</p>}
          <button
            onClick={() => fetchRSVPs()}
            disabled={loading}
            className="w-full rounded-xl py-3 text-sm font-semibold uppercase tracking-wider transition-colors"
            style={{ backgroundColor: "#E07A5F", color: "#FDF6F0" }}
          >
            {loading ? "Loading..." : "Enter"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FDF6F0" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#2D1F1F" }} className="px-6 py-6 md:px-10">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: "#F2A6A6" }}>Admin Dashboard</p>
            <h1 className="font-display text-3xl" style={{ color: "#FDF6F0", fontStyle: "italic" }}>Bedazzling RSVPs</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={exportCSV} className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium uppercase tracking-wider" style={{ backgroundColor: "rgba(253,246,240,0.1)", color: "#FDF6F0", border: "1px solid rgba(253,246,240,0.15)" }}>
              <Download className="h-3.5 w-3.5" /> Export CSV
            </button>
            <button onClick={() => fetchRSVPs()} disabled={loading} className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium uppercase tracking-wider" style={{ backgroundColor: "#E07A5F", color: "#FDF6F0" }}>
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total RSVPs", value: counts.all, color: "#E07A5F" },
            { label: "Confirmed", value: counts.confirmed, color: "#1B7A78" },
            { label: "Pending", value: counts.pending, color: "#C9B8E8" },
            { label: "Total Seats", value: totalSeats, color: "#F2A6A6" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-5 pastel-card">
              <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "rgba(45,31,31,0.5)" }}>{s.label}</p>
              <p className="font-display text-4xl" style={{ color: s.color, fontStyle: "italic" }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {["all","pending","confirmed","declined"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className="rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors"
              style={filter === f
                ? { backgroundColor: "#2D1F1F", color: "#FDF6F0" }
                : { backgroundColor: "#EDE0D4", color: "rgba(45,31,31,0.65)" }
              }
            >
              {f} ({counts[f]})
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl pastel-card">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid #EDE0D4", backgroundColor: "#FDF6F0" }}>
                {["#","Guests","Activities","Seats","Contact","Payment","Status","Date","Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider" style={{ color: "rgba(45,31,31,0.45)", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="py-16 text-center text-sm" style={{ color: "rgba(45,31,31,0.4)" }}>No RSVPs yet.</td></tr>
              ) : filtered.map((r, i) => {
                const st = STATUS_STYLES[r.status] || STATUS_STYLES.pending;
                const Icon = st.icon;
                return (
                  <tr key={r.id} style={{ borderBottom: "1px solid #EDE0D4", backgroundColor: i % 2 === 0 ? "white" : "#FDF6F0" }}>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: "rgba(45,31,31,0.4)" }}>#{r.id}</td>
                    <td className="px-4 py-3" style={{ minWidth: "160px" }}>
                      <p className="font-medium" style={{ color: "#2D1F1F" }}>{r.full_name}</p>
                      {r.guest_names && r.guest_names !== r.full_name && (
                        <p className="text-xs mt-0.5" style={{ color: "rgba(45,31,31,0.5)" }}>{r.guest_names}</p>
                      )}
                    </td>
                    <td className="px-4 py-3" style={{ minWidth: "180px" }}>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(45,31,31,0.7)" }}>{r.selected_package}</p>
                    </td>
                    <td className="px-4 py-3 text-center font-medium" style={{ color: "#2D1F1F" }}>{r.number_of_seats}</td>
                    <td className="px-4 py-3" style={{ minWidth: "160px" }}>
                      <p className="text-xs" style={{ color: "rgba(45,31,31,0.7)" }}>{r.email}</p>
                      {r.phone && <p className="text-xs" style={{ color: "rgba(45,31,31,0.5)" }}>{r.phone}</p>}
                    </td>
                    <td className="px-4 py-3">
                      {r.payment_screenshot_url ? (
                        <button onClick={() => setPreview(r.payment_screenshot_url)} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#E07A5F" }}>
                          <Eye className="h-3.5 w-3.5" /> View
                        </button>
                      ) : r.payment_link ? (
                        <span className="text-xs" style={{ color: "rgba(45,31,31,0.6)" }} title={r.payment_link}>Link ✓</span>
                      ) : (
                        <span className="text-xs" style={{ color: "rgba(45,31,31,0.3)" }}>—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: st.bg, color: st.color }}>
                        <Icon className="h-3 w-3" /> {st.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: "rgba(45,31,31,0.45)" }}>
                      {new Date(r.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => updateStatus(r.id, "confirmed")} title="Confirm"
                          className="flex h-7 w-7 items-center justify-center rounded-full transition-colors"
                          style={{ backgroundColor: r.status === "confirmed" ? "#1B7A78" : "#A8D8C830", color: r.status === "confirmed" ? "white" : "#1B7A78" }}>
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => updateStatus(r.id, "declined")} title="Decline"
                          className="flex h-7 w-7 items-center justify-center rounded-full transition-colors"
                          style={{ backgroundColor: r.status === "declined" ? "#C4614A" : "#F2A6A630", color: r.status === "declined" ? "white" : "#C4614A" }}>
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Screenshot preview modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: "rgba(45,31,31,0.85)" }} onClick={() => setPreview(null)}>
          <div className="relative max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPreview(null)} className="absolute -top-4 -right-4 flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: "#E07A5F", color: "white" }}>
              <X className="h-4 w-4" />
            </button>
            <img src={preview} alt="Payment screenshot" className="w-full rounded-2xl object-contain" style={{ maxHeight: "80vh" }} />
          </div>
        </div>
      )}
    </div>
  );
}
