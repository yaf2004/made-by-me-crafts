import React from "react";
import { motion } from "framer-motion";
import { Check, Clock, Sparkles, Tag } from "lucide-react";

export default function PackageCard({ pkg, isSelected, onSelect }) {
  const isFree = pkg.price === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden"
      style={{
        backgroundColor: "#fff",
        border: isSelected ? "2px solid #C96A3F" : "2px solid transparent",
        boxShadow: isSelected
          ? "0 4px 24px rgba(201,106,63,0.18)"
          : "0 2px 16px rgba(42,33,24,0.08)",
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: "#E8D5BE" }}>
        <img
          src={pkg.image}
          alt={pkg.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: isSelected ? "saturate(1.1)" : "saturate(0.9)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(42,33,24,0.55) 0%, transparent 60%)",
            opacity: 0,
            transition: "opacity 0.4s",
          }}
        />
        {/* Hover badges */}
        <div
          className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-4 translate-y-2 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider"
            style={{ backgroundColor: "rgba(247,240,232,0.92)", color: "#2A2118" }}
          >
            <Clock className="h-3 w-3" /> {pkg.duration}
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider"
            style={{ backgroundColor: "rgba(247,240,232,0.92)", color: "#2A2118" }}
          >
            <Sparkles className="h-3 w-3" /> {pkg.skillLevel}
          </span>
        </div>

        {/* Selected check */}
        {isSelected && (
          <div
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full"
            style={{ backgroundColor: "#C96A3F" }}
          >
            <Check className="h-4 w-4" style={{ color: "#F7F0E8" }} />
          </div>
        )}

        {/* Vendor tag */}
        {pkg.vendor && (
          <div
            className="absolute left-3 top-3 flex items-center gap-1 px-2 py-1 text-[10px] font-medium uppercase tracking-wider"
            style={{ backgroundColor: "#3D7A8A", color: "#F7F0E8" }}
          >
            <Tag className="h-3 w-3" /> {pkg.vendor}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3
            className="font-display text-2xl leading-tight"
            style={{ color: "#2A2118", fontStyle: "normal", fontWeight: 500 }}
          >
            {pkg.name}
          </h3>
          <div className="text-right shrink-0">
            {isFree ? (
              <span
                className="text-xs font-semibold uppercase tracking-wider px-2 py-1"
                style={{ backgroundColor: "#7A8C6E", color: "#F7F0E8" }}
              >
                Included
              </span>
            ) : (
              <div>
                <span
                  className="font-display text-2xl font-medium"
                  style={{ color: "#C96A3F" }}
                >
                  {pkg.price.toLocaleString()}
                </span>
                <span className="ml-1 text-xs" style={{ color: "#2A2118", opacity: 0.5 }}>birr</span>
              </div>
            )}
          </div>
        </div>

        <p className="mt-1 text-xs font-medium uppercase tracking-wider" style={{ color: "#3D7A8A" }}>
          {pkg.tagline}
        </p>

        {pkg.priceNote && !isFree && (
          <p className="mt-1 text-xs" style={{ color: "rgba(42,33,24,0.5)" }}>
            {pkg.priceNote}
          </p>
        )}

        <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(42,33,24,0.65)" }}>
          {pkg.description}
        </p>

        <ul className="mt-3 space-y-1">
          {pkg.materials.map((m) => (
            <li key={m} className="flex items-center gap-2 text-xs" style={{ color: "rgba(42,33,24,0.55)" }}>
              <span style={{ color: "#C96A3F", fontSize: "0.6rem" }}>♥</span> {m}
            </li>
          ))}
        </ul>

        <button
          onClick={() => onSelect(pkg)}
          className="focus-craft mt-5 inline-flex min-h-[46px] w-full items-center justify-center text-xs font-medium uppercase tracking-[0.18em] transition-all duration-200"
          style={
            isSelected
              ? { backgroundColor: "#C96A3F", color: "#F7F0E8", border: "none" }
              : {
                  backgroundColor: "transparent",
                  color: "#2A2118",
                  border: "1.5px solid #2A2118",
                }
          }
          onMouseEnter={(e) => {
            if (!isSelected) {
              e.currentTarget.style.backgroundColor = "#2A2118";
              e.currentTarget.style.color = "#F7F0E8";
            }
          }}
          onMouseLeave={(e) => {
            if (!isSelected) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#2A2118";
            }
          }}
        >
          {isSelected ? "✓ Booked" : isFree ? "Add to RSVP" : "Book This Activity"}
        </button>
      </div>
    </motion.article>
  );
}
