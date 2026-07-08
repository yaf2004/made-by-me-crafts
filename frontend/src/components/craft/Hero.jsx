import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Heart } from "lucide-react";
import { eventDetails } from "./packages";

// Logos as base64-friendly img tags — we reference uploaded images by URL
const MBM_LOGO = "/logos/mbm-logo.jpg";
const AURORA_LOGO = "/logos/aurora-logo.jpg";

export default function Hero({ onReserve }) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: "#2D1F1F" }}>
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1600&auto=format&fit=crop&q=70"
          alt=""
          className="h-full w-full object-cover"
          style={{ opacity: 0.28 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, #2D1F1F 35%, rgba(45,31,31,0.65) 65%, rgba(45,31,31,0.25) 100%)",
          }}
        />
      </motion.div>

      {/* Top bar — logos */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-7 md:px-14 md:pt-10">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex items-center gap-3"
        >
          {/* Made by Me logo */}
          <div
            className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white/10"
            style={{ border: "1.5px solid rgba(253,246,240,0.2)" }}
          >
            <img src={MBM_LOGO} alt="Made by Me Crafts" className="h-full w-full object-cover" onError={(e) => { e.target.style.display='none'; }} />
          </div>
          <span className="text-xs font-medium uppercase tracking-[0.3em]" style={{ color: "rgba(253,246,240,0.75)" }}>
            Made by Me Crafts
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="flex items-center gap-3"
        >
          <span className="text-xs font-medium uppercase tracking-[0.3em]" style={{ color: "rgba(253,246,240,0.5)" }}>
            Hosted by
          </span>
          {/* Aurora logo */}
          <div
            className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full"
            style={{ border: "1.5px solid rgba(253,246,240,0.2)" }}
          >
            <img src={AURORA_LOGO} alt="Aurora Coworking Space" className="h-full w-full object-cover" onError={(e) => { e.target.style.display='none'; }} />
          </div>
        </motion.div>
      </div>

      {/* Centre content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center px-6"
        >
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.55em]" style={{ color: "#F2A6A6" }}>
            Welcome to
          </p>
          <h1
            className="font-display leading-[0.9]"
            style={{
              color: "#FDF6F0",
              fontSize: "clamp(3.8rem, 13vw, 10rem)",
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            Bedazzling
          </h1>
          <div className="mx-auto my-5 flex items-center justify-center gap-3">
            <div className="h-px w-16" style={{ backgroundColor: "rgba(242,166,166,0.4)" }} />
            <Heart className="h-3.5 w-3.5" style={{ color: "#F2A6A6" }} fill="#F2A6A6" />
            <div className="h-px w-16" style={{ backgroundColor: "rgba(242,166,166,0.4)" }} />
          </div>
          <p className="mx-auto max-w-md text-sm font-light leading-relaxed" style={{ color: "rgba(253,246,240,0.72)" }}>
            A craft-making celebration curated by{" "}
            <em style={{ color: "#F2A6A6" }}>Made by Me Crafts</em> &amp; hosted at{" "}
            <em style={{ color: "#D4BBEA" }}>Aurora Coworking Space</em>
          </p>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-12 md:px-14 md:pb-16">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-center md:text-left space-y-1"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.35em]" style={{ color: "rgba(253,246,240,0.45)" }}>
              {eventDetails.date}
            </p>
            <p className="text-base font-medium" style={{ color: "rgba(253,246,240,0.88)" }}>
              {eventDetails.venue} · {eventDetails.address}
            </p>
            <p className="text-sm" style={{ color: "rgba(253,246,240,0.5)" }}>
              Entrance:{" "}
              <strong style={{ color: "#F7C59F" }}>{eventDetails.entranceFee} {eventDetails.currency}</strong>
              {" "}· includes refreshments
            </p>
          </motion.div>

          <motion.button
            onClick={onReserve}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="focus-craft inline-flex items-center gap-3 px-8 py-4 text-sm font-medium uppercase tracking-[0.22em] transition-colors"
            style={{ backgroundColor: "#E07A5F", color: "#FDF6F0", border: "1px solid rgba(253,246,240,0.15)" }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#C4614A"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#E07A5F"}
          >
            Reserve Your Spot
            <ArrowDown className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
