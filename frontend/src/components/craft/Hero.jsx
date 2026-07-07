import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Heart } from "lucide-react";
import { eventDetails } from "./packages";

export default function Hero({ onReserve }) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: "#2A2118" }}>
      {/* Layered texture background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1600&auto=format&fit=crop&q=70"
          alt="Colourful craft supplies spread on a table"
          className="h-full w-full object-cover"
          style={{ opacity: 0.35 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #2A2118 30%, rgba(42,33,24,0.6) 65%, rgba(42,33,24,0.2) 100%)",
          }}
        />
      </motion.div>

      {/* Top nav strip */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-6 md:px-12 md:pt-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex items-center gap-2"
        >
          <Heart className="h-4 w-4" style={{ color: "#C96A3F" }} fill="#C96A3F" />
          <span
            className="text-xs font-medium uppercase tracking-[0.35em]"
            style={{ color: "rgba(247,240,232,0.7)" }}
          >
            Made by Me Crafts
          </span>
        </motion.div>
        <motion.span
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-xs font-medium uppercase tracking-[0.3em]"
          style={{ color: "rgba(247,240,232,0.5)" }}
        >
          {eventDetails.edition}
        </motion.span>
      </div>

      {/* Centre decorative element */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p
            className="mb-6 text-[11px] font-medium uppercase tracking-[0.5em]"
            style={{ color: "#C96A3F" }}
          >
            Welcome to
          </p>
          <h1
            className="font-display leading-[0.9] select-none"
            style={{
              color: "#F7F0E8",
              fontSize: "clamp(3.5rem, 12vw, 9rem)",
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            Bedazzling
          </h1>
          <div
            className="mx-auto my-5 h-px w-24"
            style={{ backgroundColor: "rgba(201,106,63,0.5)" }}
          />
          <p
            className="max-w-sm mx-auto text-sm font-light leading-relaxed px-4"
            style={{ color: "rgba(247,240,232,0.75)" }}
          >
            A craft-making celebration curated by{" "}
            <em style={{ color: "#D4856A" }}>Made by Me Crafts</em> &amp; hosted at{" "}
            <em style={{ color: "#D4856A" }}>Aurora Coworking Space</em>
          </p>
        </motion.div>
      </div>

      {/* Bottom CTA block */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-12 md:px-12 md:pb-16">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between">
          {/* Date / venue pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-center md:text-left"
          >
            <p
              className="text-[11px] font-medium uppercase tracking-[0.35em] mb-1"
              style={{ color: "rgba(247,240,232,0.5)" }}
            >
              {eventDetails.date}
            </p>
            <p
              className="text-base font-medium"
              style={{ color: "rgba(247,240,232,0.85)" }}
            >
              {eventDetails.venue} · {eventDetails.address}
            </p>
            <p className="mt-1 text-sm" style={{ color: "rgba(247,240,232,0.5)" }}>
              Entrance: <strong style={{ color: "#D4856A" }}>{eventDetails.entranceFee} {eventDetails.currency}</strong>{" "}
              — includes refreshments
            </p>
          </motion.div>

          <motion.button
            onClick={onReserve}
            whileHover={{ y: -2, backgroundColor: "#A8552F" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="focus-craft inline-flex items-center gap-3 px-8 py-4 text-sm font-medium uppercase tracking-[0.2em]"
            style={{
              backgroundColor: "#C96A3F",
              color: "#F7F0E8",
              border: "1px solid rgba(247,240,232,0.2)",
            }}
          >
            Reserve Your Spot
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
