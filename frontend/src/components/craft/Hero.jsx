import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Heart } from "lucide-react";
import { eventDetails } from "./packages";

// Logos as base64-friendly img tags — we reference uploaded images by URL
const MBM_LOGO = "/logos/mbm-logo.jpg";
const AURORA_LOGO = "/logos/aurora-logo.jpg";

const HERO_DARK = "#3C0008";

export default function Hero({ onReserve }) {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO_DARK }}>
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
          style={{ opacity: 0.22 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${HERO_DARK} 35%, rgba(91,122,127,0.65) 65%, rgba(91,122,127,0.25) 100%)`,
          }}
        />
      </motion.div>

      {/* Content column — natural flow, no absolute overlap */}
      <div className="relative z-10 flex min-h-screen flex-col px-6 py-7 md:px-14 md:py-10">
        {/* Top bar — logos */}
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex items-center gap-3"
          >
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
          >
            <div
              className="flex min-h-[48px] min-w-[180px] items-center justify-center rounded-2xl px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.22em]"
              style={{ backgroundColor: "rgba(253,246,240,0.12)", border: "1.5px solid rgba(253,246,240,0.22)", color: "rgba(253,246,240,0.9)" }}
            >
              Aurora Coworking Space
            </div>
          </motion.div>
        </div>

        {/* About cards */}
        <div className="mt-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row">
            <div className="flex-1 rounded-[24px] border border-white/10 p-4 backdrop-blur-sm" style={{ backgroundColor: "rgba(41,58,60,0.78)" }}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: "#F2A6A6" }}>Aurora Coworking Space</p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(253,246,240,0.78)" }}>
                At our co-working space, work is more than just a means to an end. We believe in creating a workspace that inspires and uplifts you, where you can connect with like-minded individuals, collaborate, and create something remarkable. Our modern office is designed to meet your professional needs while igniting your creativity and passion. Come and experience the possibilities at our co-working space.
              </p>
            </div>
            <div className="flex-1 rounded-[24px] border border-white/10 p-4 backdrop-blur-sm" style={{ backgroundColor: "rgba(41,58,60,0.78)" }}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: "#D4BBEA" }}>Made by Me Crafts</p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(253,246,240,0.78)" }}>
                Made by Me Crafts is a celebration of self-expression, creativity, and thoughtful gifting. From postcards, paper art, trinkets, drawings, and cute crafts to completely custom creations, every piece is handmade to tell a story and make someone feel loved—even on the most random days. Inspired by your memories, ideas, Pinterest boards, and little moments that matter, each piece is made to order and designed just for you. No two people are the same, so why should their gifts be? Whether it's for a birthday, graduation, baby shower, a special milestone, or simply no occasion at all, we're here to help you create something meaningful. Have inspiration? Send it our way. Feeling lost? We've got you—we'll help bring the vision to life.
              </p>
            </div>
          </div>
        </div>

        {/* Centre content */}
        <div className="flex flex-1 items-center justify-center py-10">
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
                fontSize: "clamp(3.4rem, 11vw, 8.6rem)",
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              Made by Me's Craft Event
            </h1>
            <div className="mx-auto my-5 flex items-center justify-center gap-3">
              <div className="h-px w-16" style={{ backgroundColor: "rgba(242,166,166,0.4)" }} />
              <Heart className="h-3.5 w-3.5" style={{ color: "#F2A6A6" }} fill="#F2A6A6" />
              <div className="h-px w-16" style={{ backgroundColor: "rgba(242,166,166,0.4)" }} />
            </div>
            <p className="mx-auto max-w-md text-sm font-light leading-relaxed" style={{ color: "rgba(253,246,240,0.72)" }}>
              Episode One — Bedazzling Event Hosted at Aurora Coworking Space
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div>
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
      </div>
    </section>
  );
}
