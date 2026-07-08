import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Link2, Check, Loader2, Image as ImageIcon, Heart, Plus, Minus } from "lucide-react";
import { api } from "@/api/client";
import { eventDetails } from "./packages";

export default function RSVPForm({ selectedPackages }) {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    number_of_seats: 1,
    guest_names: [""],
    payment_method: "screenshot",
    payment_link: "",
    payment_screenshot_url: "",
    message: "",
  });

  const totalDue = eventDetails.entranceFee * form.number_of_seats;
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const setSeats = (n) => {
    const count = Math.max(1, Math.min(10, n));
    set("number_of_seats", count);
    set("guest_names", Array.from({ length: count }, (_, i) => form.guest_names[i] || ""));
  };

  const setGuestName = (i, val) => {
    const names = [...form.guest_names];
    names[i] = val;
    set("guest_names", names);
  };

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const { file_url } = await api.upload.file(file);
      set("payment_screenshot_url", file_url);
    } catch {
      setError("Upload failed — try the payment link option instead.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (selectedPackages.length === 0) {
      setError("Please select at least one craft activity above before reserving.");
      document.getElementById("crafts")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const emptyNames = form.guest_names.some((n) => !n.trim());
    if (emptyNames) {
      setError("Please fill in the name for every guest.");
      return;
    }

    if (!form.phone.trim()) {
      setError("Please enter a phone number so we can reach you.");
      return;
    }

    if (form.payment_method === "screenshot" && !form.payment_screenshot_url) {
      setError("Please upload a payment screenshot to confirm your spot.");
      return;
    }
    if (form.payment_method === "link" && !form.payment_link.trim()) {
      setError("Please enter your payment link or transaction ID.");
      return;
    }

    setSubmitting(true);
    try {
      await api.rsvp.create({
        full_name: form.guest_names[0],
        email: form.email,
        phone: form.phone,
        selected_package: selectedPackages.map((p) => p.name).join(", "),
        number_of_seats: form.number_of_seats,
        guest_names: form.guest_names.join(", "),
        payment_method: form.payment_method,
        payment_link: form.payment_link,
        payment_screenshot_url: form.payment_screenshot_url,
        message: form.message,
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or DM us on Instagram.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success ──
  if (submitted) {
    return (
      <div className="flex min-h-[560px] items-center justify-center px-6 py-24" style={{ backgroundColor: "#FDF6F0" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: "#E07A5F" }}>
            <Heart className="h-8 w-8 text-white" fill="white" />
          </div>
          <h3 className="font-display text-4xl" style={{ color: "#2D1F1F", fontStyle: "italic", fontWeight: 500 }}>
            You're in! 💌
          </h3>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(45,31,31,0.65)" }}>
            We've reserved <strong style={{ color: "#2D1F1F" }}>{form.number_of_seats} spot{form.number_of_seats > 1 ? "s" : ""}</strong> for{" "}
            <strong style={{ color: "#2D1F1F" }}>{form.guest_names.join(", ")}</strong> for{" "}
            <strong style={{ color: "#2D1F1F" }}>{selectedPackages.map((p) => p.name).join(", ")}</strong>.
          </p>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(45,31,31,0.55)" }}>
            Remember — you'll pay for each craft activity in person to the instructor on the day. See you there! 🎨
          </p>
          <p className="mt-5 text-xs uppercase tracking-[0.25em]" style={{ color: "#E07A5F" }}>
            {eventDetails.date} · {eventDetails.venue}
          </p>
        </motion.div>
      </div>
    );
  }

  // ── Form ──
  return (
    <section id="rsvp" className="relative overflow-hidden px-6 py-20 md:px-14 md:py-28" style={{ backgroundColor: "#3C0008" }}>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <img src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1400&auto=format&fit=crop&q=40" alt="" className="h-full w-full object-cover" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.45em]" style={{ color: "#F2A6A6" }}>
            RSVP
          </p>
          <h2 className="font-display" style={{ color: "#FDF6F0", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontStyle: "italic", fontWeight: 500 }}>
            Reserve your spot
          </h2>
          <p className="mt-3 text-sm" style={{ color: "rgba(253,246,240,0.55)" }}>
            You're confirming your place at the event — <strong style={{ color: "#F7C59F" }}>not paying for activities.</strong>
            <br />Craft fees are paid in person to each instructor on the day.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Summary sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 rounded-2xl p-7" style={{ border: "1px solid rgba(253,246,240,0.1)", backgroundColor: "rgba(253,246,240,0.05)", backdropFilter: "blur(12px)" }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "rgba(253,246,240,0.4)" }}>
                Your RSVP
              </p>

              <AnimatePresence mode="wait">
                {selectedPackages.length > 0 ? (
                  <motion.div key="selected" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <ul className="mt-4 space-y-2">
                      {selectedPackages.map((p) => (
                        <li key={p.id} className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                          <span className="font-display text-lg" style={{ color: "#FDF6F0", fontStyle: "italic" }}>{p.name}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 space-y-2 pt-5" style={{ borderTop: "1px solid rgba(253,246,240,0.1)" }}>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: "rgba(253,246,240,0.45)" }}>Entrance + refreshments</span>
                        <span style={{ color: "#FDF6F0" }}>{eventDetails.entranceFee} birr × {form.number_of_seats}</span>
                      </div>
                      <div className="flex items-baseline justify-between pt-2" style={{ borderTop: "1px solid rgba(253,246,240,0.1)" }}>
                        <span className="text-xs uppercase tracking-wider" style={{ color: "rgba(253,246,240,0.4)" }}>Due now</span>
                        <span className="font-display text-3xl" style={{ color: "#F7C59F", fontStyle: "italic" }}>
                          {totalDue.toLocaleString()} birr
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed" style={{ color: "rgba(253,246,240,0.35)" }}>
                        Craft activity fees paid in person to each instructor.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(253,246,240,0.35)" }}>
                    Select activities from the craft menu above — your RSVP summary will appear here.
                  </p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8 lg:col-span-8">

            {/* Tickets */}
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "rgba(253,246,240,0.4)" }}>
                Number of tickets
              </p>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setSeats(form.number_of_seats - 1)}
                  className="focus-craft flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                  style={{ border: "1.5px solid rgba(253,246,240,0.2)", color: "#FDF6F0" }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(253,246,240,0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-display text-4xl" style={{ color: "#FDF6F0", fontStyle: "italic", minWidth: "2rem", textAlign: "center" }}>
                  {form.number_of_seats}
                </span>
                <button type="button" onClick={() => setSeats(form.number_of_seats + 1)}
                  className="focus-craft flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                  style={{ border: "1.5px solid rgba(253,246,240,0.2)", color: "#FDF6F0" }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(253,246,240,0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <Plus className="h-4 w-4" />
                </button>
                <span className="text-sm" style={{ color: "rgba(253,246,240,0.45)" }}>
                  ticket{form.number_of_seats > 1 ? "s" : ""} · {totalDue.toLocaleString()} birr total
                </span>
              </div>
            </div>

            {/* Guest names — one field per ticket */}
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "rgba(253,246,240,0.4)" }}>
                Guest names <span style={{ color: "#E07A5F" }}>*</span>
              </p>
              <div className="space-y-3">
                {form.guest_names.map((name, i) => (
                  <div key={i}>
                    <label className="block">
                      <span className="mb-1 block text-[11px] uppercase tracking-wider" style={{ color: "rgba(253,246,240,0.35)" }}>
                        {i === 0 ? "Your name" : `Guest ${i + 1}`}
                      </span>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setGuestName(i, e.target.value)}
                        className="craft-input"
                        placeholder={i === 0 ? "Your full name" : `Guest ${i + 1} full name`}
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Email" required>
                <input type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} className="craft-input" placeholder="you@email.com" />
              </Field>
              <Field label="Phone / WhatsApp" required>
                <input type="tel" required value={form.phone} onChange={(e) => set("phone", e.target.value)} className="craft-input" placeholder="+251 9XX XXX XXX" />
              </Field>
            </div>

            {/* Payment proof */}
            <div className="space-y-4 pt-2" style={{ borderTop: "1px solid rgba(253,246,240,0.1)" }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "rgba(253,246,240,0.4)" }}>
                Payment proof — entrance fee ({totalDue.toLocaleString()} birr) <span style={{ color: "#E07A5F" }}>*</span>
              </p>
              <p className="text-sm" style={{ color: "rgba(253,246,240,0.5)" }}>
                Transfer <strong style={{ color: "#F7C59F" }}>{totalDue.toLocaleString()} birr</strong> to our account, then confirm below.
              </p>

              <div className="rounded-2xl border p-4 text-sm" style={{ borderColor: "rgba(253,246,240,0.12)", backgroundColor: "rgba(253,246,240,0.03)" }}>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: "rgba(253,246,240,0.45)" }}>
                  Payment accounts
                </p>
                <ul className="space-y-2" style={{ color: "rgba(253,246,240,0.7)" }}>
                  <li><strong style={{ color: "#F7C59F" }}>CBE</strong> — Betselot Alemseged<br />1000348823594</li>
                  <li><strong style={{ color: "#F7C59F" }}>Telebirr</strong> — Betselot<br />0945127874</li>
                </ul>
              </div>

              <div className="flex gap-2">
                {["screenshot", "link"].map((method) => (
                  <button key={method} type="button" onClick={() => set("payment_method", method)}
                    className="focus-craft flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl text-xs font-medium uppercase tracking-wider transition-colors"
                    style={form.payment_method === method
                      ? { backgroundColor: "#E07A5F", color: "#FDF6F0", border: "none" }
                      : { backgroundColor: "transparent", color: "rgba(253,246,240,0.55)", border: "1px solid rgba(253,246,240,0.18)" }
                    }
                  >
                    {method === "screenshot" ? <><ImageIcon className="h-4 w-4" /> Screenshot</> : <><Link2 className="h-4 w-4" /> Link / ID</>}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {form.payment_method === "link" ? (
                  <motion.div key="link" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    <Field label="Payment link or transaction ID">
                      <input type="text" value={form.payment_link} onChange={(e) => set("payment_link", e.target.value)} className="craft-input" placeholder="Paste your payment reference or transaction ID" />
                    </Field>
                  </motion.div>
                ) : (
                  <motion.div key="screenshot" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    <label className="focus-craft flex min-h-[150px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl p-8 text-center transition-colors"
                      style={{ border: "1.5px dashed rgba(253,246,240,0.25)", backgroundColor: "rgba(253,246,240,0.03)" }}>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
                      {uploading ? (
                        <Loader2 className="h-6 w-6 animate-spin" style={{ color: "#F2A6A6" }} />
                      ) : form.payment_screenshot_url ? (
                        <>
                          <Check className="h-6 w-6" style={{ color: "#F2A6A6" }} />
                          <span className="text-sm" style={{ color: "#FDF6F0" }}>Screenshot uploaded ✓</span>
                          <span className="text-xs" style={{ color: "rgba(253,246,240,0.35)" }}>Click to replace</span>
                        </>
                      ) : (
                        <>
                          <Upload className="h-6 w-6" style={{ color: "rgba(253,246,240,0.4)" }} />
                          <span className="text-sm" style={{ color: "rgba(253,246,240,0.65)" }}>Upload payment screenshot</span>
                          <span className="text-xs" style={{ color: "rgba(253,246,240,0.35)" }}>PNG or JPG, up to 10 MB</span>
                        </>
                      )}
                    </label>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notes */}
            <Field label="Notes (optional)">
              <textarea rows={3} value={form.message} onChange={(e) => set("message", e.target.value)} className="craft-input resize-none" placeholder="Accessibility needs, group seating, anything else..." />
            </Field>

            {error && (
              <p className="rounded-xl px-4 py-3 text-sm" style={{ border: "1px solid rgba(224,122,95,0.4)", backgroundColor: "rgba(224,122,95,0.08)", color: "#F2A6A6" }}>
                {error}
              </p>
            )}

            <button type="submit" disabled={submitting}
              className="focus-craft flex min-h-[52px] w-full items-center justify-center gap-3 rounded-2xl text-sm font-semibold uppercase tracking-[0.2em] transition-colors disabled:opacity-60"
              style={{ backgroundColor: "#E07A5F", color: "#FDF6F0" }}
              onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.backgroundColor = "#C4614A"; }}
              onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.backgroundColor = "#E07A5F"; }}
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                <><Heart className="h-4 w-4" fill="#FDF6F0" /> Confirm My Spot · {selectedPackages.length > 0 ? `${totalDue.toLocaleString()} birr` : "—"}</>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium uppercase tracking-[0.2em]" style={{ color: "rgba(253,246,240,0.4)" }}>
        {label} {required && <span style={{ color: "#E07A5F" }}>*</span>}
      </span>
      {children}
    </label>
  );
}
