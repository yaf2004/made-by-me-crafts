import React from "react";
import { motion } from "framer-motion";
import PackageCard from "./PackageCard";
import { packages, alsoHappening, eventDetails } from "./packages";

export default function CraftCurriculum({ selectedPackages, onToggle }) {
  return (
    <>
      {/* ── Craft section ── */}
      <section id="crafts" style={{ backgroundColor: "#F7F0E8" }} className="px-6 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p
                className="mb-3 text-[11px] font-medium uppercase tracking-[0.4em]"
                style={{ color: "#3D7A8A" }}
              >
                Craft Spotlight
              </p>
              <h2
                className="font-display leading-[1.05]"
                style={{
                  color: "#2A2118",
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
              >
                Choose your craft.
                <br />
                <span style={{ color: "#C96A3F", fontStyle: "normal", fontWeight: 400 }}>
                  Make something yours.
                </span>
              </h2>
            </div>
            <div className="md:col-span-4">
              <p className="text-sm leading-relaxed" style={{ color: "rgba(42,33,24,0.65)" }}>
                Each activity is included in the{" "}
                <strong style={{ color: "#2A2118" }}>
                  {eventDetails.entranceFee} {eventDetails.currency}
                </strong>{" "}
                entrance fee — except Rhinestone Decorating which has an add-on cost. Select what
                you'd like to try and we'll hold your spot.
              </p>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                isSelected={selectedPackages.some((p) => p.id === pkg.id)}
                onSelect={onToggle}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Also happening ── */}
      <section style={{ backgroundColor: "#2A2118" }} className="px-6 py-16 md:px-14">
        <div className="mx-auto max-w-7xl">
          <p
            className="mb-8 text-center text-[11px] font-medium uppercase tracking-[0.45em]"
            style={{ color: "#C96A3F" }}
          >
            Also Happening
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {alsoHappening.map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="flex flex-col items-center gap-3 px-4 py-6 text-center"
                style={{
                  border: "1px solid rgba(247,240,232,0.1)",
                  backgroundColor: "rgba(247,240,232,0.04)",
                }}
              >
                <span style={{ fontSize: "2rem" }}>{item.icon}</span>
                <p
                  className="font-display text-xl"
                  style={{ color: "#F7F0E8", fontStyle: "italic" }}
                >
                  {item.label}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(247,240,232,0.5)" }}>
                  {item.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
