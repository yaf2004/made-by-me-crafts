import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Link2, Check, Loader2, Image as ImageIcon, Heart } from "lucide-react";
import { api } from "@/api/client";
import { eventDetails } from "./packages";

export default function RSVPForm({ selectedPackages }) {
  // Entrance fee is fixed, paid by everyone; add-on activities may have extra cost
  const activityAddOn = selectedPackages.reduce((sum, p) => sum + p.price, 0);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    number_of_seats: 1,
    include_refreshments: false,  // refreshments already included but kept for compat
    pay_activity_in_person: false,
    payment_method: "screenshot",
    payment_link: "",
    payment_screenshot_url: "",
    message: "",
  });

  const perSeatDue =
    eventDetails.entranceFee +
    (form.pay_activity_in_person ? 0 : activityAddOn);
  const totalDue = perSeatDue * form.number_of_seats;

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

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

    setSubmitting(true);
    try {
      await api.rsvp.create({
        ...form,
        selected_package: selectedPackages.map((p) => p.name).join(", "),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or DM us on Instagram.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success state ──────────────────────────────────────────────
  if (submitted) {
    return (
      <div
        className="flex min-h-[560px] items-center justify-center px-6 py-24"
        style={{ backgroundColor: "#F7F0E8" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg text-center"
        >
          <div
            className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: "#C96A3F" }}
          >
            <Heart className="h-8 w-8" style={{ color: "#F7F0E8" }} fill="#F7F0E8" />
          </div>
          <h3
            className="font-display text-4xl"
            style={{ color: "#2A2118", fontStyle: "italic", fontWeight: 500 }}
          >
            You're in! 💌
          </h3>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(42,33,24,0.65)" }}>
            We've received your RSVP for{" "}
            <strong style={{ color: "#2A2118" }}>
              {selectedPackages.map((p) => p.name).join(", ")}
            </strong>
            . Your spot is being held — we'll send confirmation to{" "}
            <strong style={{ color: "#2A2118" }}>{form.email}</strong> shortly.
          </p>
          <p
            className="mt-6 text-xs uppercase tracking-[0.25em]"
            style={{ color: "#7A8C6E" }}
          >
            {eventDetails.date} · {eventDetails.venue}
          </p>
          <p className="mt-2 text-xs" style={{ color: "rgba(42,33,24,0.4)" }}>
            Made by Me · Made with love
          </p>
        </motion.div>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────
  return (
    <section
      id="rsvp"
      className="relative overflow-hidden px-6 py-20 md:px-14 md:py-28"
      style={{ backgroundColor: "#2A2118" }}
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1400&auto=format&fit=crop&q=40"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-14 text-center">
          <p
            className="mb-3 text-[11px] font-medium uppercase tracking-[0.45em]"
            style={{ color: "#D4856A" }}
          >
            Reserve &amp; Confirm
          </p>
          <h2
            className="font-display"
            style={{
              color: "#F7F0E8",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            Book your spot
          </h2>
          <p className="mt-3 text-sm" style={{ color: "rgba(247,240,232,0.5)" }}>
            Entrance is <strong style={{ color: "#D4856A" }}>{eventDetails.entranceFee} birr</strong> per person, refreshments included.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* ─ Sticky Summary ─ */}
          <div className="lg:col-span-4">
            <div
              className="sticky top-8 p-7"
              style={{
                border: "1px solid rgba(247,240,232,0.12)",
                backgroundColor: "rgba(247,240,232,0.05)",
                backdropFilter: "blur(12px)",
              }}
            >
              <p
                className="text-[11px] font-medium uppercase tracking-[0.3em]"
                style={{ color: "rgba(247,240,232,0.45)" }}
              >
                Your booking
              </p>
              <AnimatePresence mode="wait">
                {selectedPackages.length > 0 ? (
                  <motion.div
                    key={selectedPackages.map((p) => p.id).join("-")}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ul className="mt-4 space-y-3">
                      {selectedPackages.map((p) => (
                        <li key={p.id} className="flex items-baseline justify-between gap-2">
                          <span
                            className="font-display text-xl"
                            style={{ color: "#F7F0E8", fontStyle: "italic" }}
                          >
                            {p.name}
                          </span>
                          <span className="text-sm shrink-0" style={{ color: "rgba(247,240,232,0.5)" }}>
                            {p.price > 0 ? `${p.price.toLocaleString()} birr` : "Included"}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div
                      className="mt-5 space-y-2 pt-5"
                      style={{ borderTop: "1px solid rgba(247,240,232,0.12)" }}
                    >
                      <div className="flex justify-between text-sm">
                        <span style={{ color: "rgba(247,240,232,0.45)" }}>Entrance + refreshments</span>
                        <span style={{ color: "#F7F0E8" }}>{eventDetails.entranceFee} birr</span>
                      </div>
                      {activityAddOn > 0 && (
                        <div className="flex justify-between text-sm">
                          <span style={{ color: "rgba(247,240,232,0.45)" }}>
                            Activity add-on {form.pay_activity_in_person && "(in person)"}
                          </span>
                          <span style={{ color: "#F7F0E8" }}>
                            {form.pay_activity_in_person ? "—" : `${activityAddOn.toLocaleString()} birr`}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span style={{ color: "rgba(247,240,232,0.45)" }}>Seats</span>
                        <span style={{ color: "#F7F0E8" }}>{form.number_of_seats}</span>
                      </div>
                      <div
                        className="flex items-baseline justify-between pt-3"
                        style={{ borderTop: "1px solid rgba(247,240,232,0.12)" }}
                      >
                        <span
                          className="text-xs uppercase tracking-wider"
                          style={{ color: "rgba(247,240,232,0.45)" }}
                        >
                          Total due
                        </span>
                        <span
                          className="font-display text-3xl"
                          style={{ color: "#D4856A", fontStyle: "italic" }}
                        >
                          {totalDue.toLocaleString()} birr
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <p
                    className="mt-4 text-sm leading-relaxed"
                    style={{ color: "rgba(247,240,232,0.35)" }}
                  >
                    Select the crafts you'd like to try above — your live total will appear here.
                  </p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ─ Form ─ */}
          <form onSubmit={handleSubmit} className="space-y-7 lg:col-span-8">
            {/* Personal info */}
            <div className="grid gap-7 sm:grid-cols-2">
              <Field label="Full Name" required>
                <input
                  type="text"
                  required
                  value={form.full_name}
                  onChange={(e) => set("full_name", e.target.value)}
                  className="craft-input"
                  placeholder="Your full name"
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className="craft-input"
                  placeholder="you@email.com"
                />
              </Field>
              <Field label="Phone / WhatsApp">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className="craft-input"
                  placeholder="Optional but helpful"
                />
              </Field>
              <Field label="Number of Tickets">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={form.number_of_seats}
                  onChange={(e) => set("number_of_seats", parseInt(e.target.value) || 1)}
                  className="craft-input"
                />
              </Field>
            </div>

            {/* Activity payment option */}
            {activityAddOn > 0 && (
              <div
                className="space-y-3 pt-6"
                style={{ borderTop: "1px solid rgba(247,240,232,0.12)" }}
              >
                <p
                  className="text-[11px] font-medium uppercase tracking-[0.3em]"
                  style={{ color: "rgba(247,240,232,0.45)" }}
                >
                  Activity Payment
                </p>
                <label
                  className="focus-craft flex min-h-[48px] cursor-pointer items-center gap-3 px-4"
                  style={{ border: "1px solid rgba(247,240,232,0.12)" }}
                >
                  <input
                    type="checkbox"
                    checked={form.pay_activity_in_person}
                    onChange={(e) => set("pay_activity_in_person", e.target.checked)}
                    className="h-4 w-4 accent-[#C96A3F]"
                  />
                  <span className="text-sm" style={{ color: "rgba(247,240,232,0.75)" }}>
                    I'll pay for my activity ({activityAddOn.toLocaleString()} birr) in person on the day
                  </span>
                </label>
              </div>
            )}

            {/* Payment proof */}
            <div
              className="space-y-4 pt-6"
              style={{ borderTop: "1px solid rgba(247,240,232,0.12)" }}
            >
              <p
                className="text-[11px] font-medium uppercase tracking-[0.3em]"
                style={{ color: "rgba(247,240,232,0.45)" }}
              >
                Payment Verification
              </p>
              <p className="text-sm" style={{ color: "rgba(247,240,232,0.55)" }}>
                Transfer{" "}
                <strong style={{ color: "#D4856A" }}>
                  {(form.pay_activity_in_person
                    ? eventDetails.entranceFee
                    : perSeatDue
                  ) * form.number_of_seats} birr
                </strong>{" "}
                to our account, then confirm below. We'll match your submission and finalize your seat.
              </p>

              {/* Toggle */}
              <div className="flex gap-2">
                {["screenshot", "link"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => set("payment_method", method)}
                    className="focus-craft flex min-h-[46px] flex-1 items-center justify-center gap-2 text-xs font-medium uppercase tracking-wider transition-colors"
                    style={
                      form.payment_method === method
                        ? { backgroundColor: "#C96A3F", color: "#F7F0E8", border: "none" }
                        : {
                            backgroundColor: "transparent",
                            color: "rgba(247,240,232,0.55)",
                            border: "1px solid rgba(247,240,232,0.18)",
                          }
                    }
                  >
                    {method === "screenshot" ? (
                      <><ImageIcon className="h-4 w-4" /> Screenshot</>
                    ) : (
                      <><Link2 className="h-4 w-4" /> Link / ID</>
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {form.payment_method === "link" ? (
                  <motion.div
                    key="link"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    <Field label="Payment Link or Transaction ID">
                      <input
                        type="text"
                        value={form.payment_link}
                        onChange={(e) => set("payment_link", e.target.value)}
                        className="craft-input"
                        placeholder="Paste your payment reference or transaction ID"
                      />
                    </Field>
                  </motion.div>
                ) : (
                  <motion.div
                    key="screenshot"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    <label
                      className="focus-craft flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-3 p-8 text-center transition-colors"
                      style={{
                        border: "1.5px dashed rgba(247,240,232,0.28)",
                        backgroundColor: "rgba(247,240,232,0.04)",
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFile(e.target.files?.[0])}
                      />
                      {uploading ? (
                        <Loader2 className="h-6 w-6 animate-spin" style={{ color: "#D4856A" }} />
                      ) : form.payment_screenshot_url ? (
                        <>
                          <Check className="h-6 w-6" style={{ color: "#D4856A" }} />
                          <span className="text-sm" style={{ color: "#F7F0E8" }}>Screenshot uploaded ✓</span>
                          <span className="text-xs" style={{ color: "rgba(247,240,232,0.35)" }}>Click to replace</span>
                        </>
                      ) : (
                        <>
                          <Upload className="h-6 w-6" style={{ color: "rgba(247,240,232,0.4)" }} />
                          <span className="text-sm" style={{ color: "rgba(247,240,232,0.65)" }}>
                            Upload payment screenshot
                          </span>
                          <span className="text-xs" style={{ color: "rgba(247,240,232,0.35)" }}>PNG or JPG, up to 10 MB</span>
                        </>
                      )}
                    </label>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notes */}
            <Field label="Notes / Anything we should know">
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                className="craft-input resize-none"
                placeholder="Allergies, accessibility needs, group seating — anything at all"
              />
            </Field>

            {error && (
              <p
                className="px-4 py-3 text-sm"
                style={{
                  border: "1px solid rgba(201,106,63,0.4)",
                  backgroundColor: "rgba(201,106,63,0.08)",
                  color: "#D4856A",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="focus-craft flex min-h-[52px] w-full items-center justify-center gap-3 text-sm font-medium uppercase tracking-[0.2em] transition-colors disabled:opacity-60"
              style={{ backgroundColor: "#C96A3F", color: "#F7F0E8" }}
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Heart className="h-4 w-4" fill="#F7F0E8" />
                  Confirm My Spot ·{" "}
                  {selectedPackages.length > 0 ? `${totalDue.toLocaleString()} birr` : "—"}
                </>
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
      <span
        className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em]"
        style={{ color: "rgba(247,240,232,0.45)" }}
      >
        {label} {required && <span style={{ color: "#C96A3F" }}>*</span>}
      </span>
      {children}
    </label>
  );
}
