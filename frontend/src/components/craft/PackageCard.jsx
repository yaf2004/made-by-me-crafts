import React from "react";
import { motion } from "framer-motion";
import { Check, Clock, Sparkles, Instagram } from "lucide-react";

export default function PackageCard({ pkg, isSelected, onSelect }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden pastel-card"
      style={{
        borderColor: isSelected ? pkg.color : undefined,
        boxShadow: isSelected ? `0 4px 28px ${pkg.color}55` : undefined,
      }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: "#EDE0D4" }}>
        <img
          src={pkg.image}
          alt={pkg.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(45,31,31,0.5) 0%, transparent 55%)", opacity: 0, transition: "opacity 0.4s" }} />

        {/* Hover badges */}
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded-full" style={{ backgroundColor: "rgba(253,246,240,0.93)", color: "#2D1F1F" }}>
            <Clock className="h-3 w-3" /> {pkg.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded-full" style={{ backgroundColor: "rgba(253,246,240,0.93)", color: "#2D1F1F" }}>
            <Sparkles className="h-3 w-3" /> {pkg.skillLevel}
          </span>
        </div>

        {/* Selected check */}
        {isSelected && (
          <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full" style={{ backgroundColor: pkg.color }}>
            <Check className="h-4 w-4 text-white" />
          </div>
        )}

        {/* Vendor tag */}
        <div className="absolute left-0 top-3 flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider" style={{ backgroundColor: pkg.color, color: "#2D1F1F" }}>
          {pkg.vendor}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display text-2xl leading-tight" style={{ color: "#2D1F1F", fontWeight: 500 }}>
            {pkg.name}
          </h3>
        </div>

        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: pkg.color }}>
          {pkg.tagline}
        </p>

        {/* Prices */}
        <div className="mb-3 space-y-1.5">
          {pkg.prices.map((p, i) => (
            <div key={i} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: `${pkg.color}20` }}>
              <span className="text-xs leading-snug" style={{ color: "rgba(45,31,31,0.7)" }}>{p.label}</span>
              {typeof p.amount === "number" ? (
                <span className="font-display text-lg font-medium shrink-0" style={{ color: "#E07A5F" }}>
                  {p.amount.toLocaleString()} <span className="text-xs font-normal" style={{ color: "rgba(45,31,31,0.45)" }}>birr</span>
                </span>
              ) : p.range ? (
                <span className="text-xs font-normal" style={{ color: "rgba(45,31,31,0.6)" }}>{p.range}</span>
              ) : (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: "#EDE0D4", color: "rgba(45,31,31,0.6)" }}>TBA</span>
              )}
            </div>
          ))}
        </div>

        <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(45,31,31,0.62)" }}>
          {pkg.description}
        </p>

        <ul className="mb-4 space-y-1">
          {pkg.materials.map((m) => (
            <li key={m} className="flex items-center gap-2 text-xs" style={{ color: "rgba(45,31,31,0.5)" }}>
              <span style={{ color: pkg.color }}>♥</span> {m}
            </li>
          ))}
        </ul>

        {/* Vendor handle */}
        {pkg.vendorHandle && (
          <div className="mb-3 flex items-center gap-1.5 text-xs" style={{ color: "rgba(45,31,31,0.45)" }}>
            <Instagram className="h-3 w-3" /> {pkg.vendorHandle}
          </div>
        )}

        <button
          onClick={() => onSelect(pkg)}
          className="focus-craft mt-auto inline-flex min-h-[44px] w-full items-center justify-center text-xs font-medium uppercase tracking-[0.18em] transition-all duration-200 rounded-lg"
          style={
            isSelected
              ? { backgroundColor: pkg.color, color: "#2D1F1F", border: "none" }
              : { backgroundColor: "transparent", color: "#2D1F1F", border: `1.5px solid ${pkg.color}` }
          }
          onMouseEnter={(e) => { if (!isSelected) { e.currentTarget.style.backgroundColor = `${pkg.color}30`; } }}
          onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.backgroundColor = "transparent"; } }}
        >
          {isSelected ? "✓ Added to RSVP" : "Add to RSVP"}
        </button>
      </div>
    </motion.article>
  );
}
