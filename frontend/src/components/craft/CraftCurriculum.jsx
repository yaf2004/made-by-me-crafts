import React from "react";
import { motion } from "framer-motion";
import PackageCard from "./PackageCard";
import { packages, alsoHappening, eventDetails } from "./packages";
import { Mic, Music, Users, ShoppingBag } from "lucide-react";

const darkSectionColor = "#3C0008";

export default function CraftCurriculum({ selectedPackages, onToggle }) {
  return (
    <>
      {/* ── Craft Menu ── */}
      <section id="crafts" style={{ backgroundColor: "#FDF6F0" }} className="px-6 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-6 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.45em]" style={{ color: "#E07A5F" }}>
              Craft Menu
            </p>
            <h2
              className="font-display leading-[1.05]"
              style={{ color: "#2D1F1F", fontSize: "clamp(2.4rem, 6vw, 4rem)", fontStyle: "italic", fontWeight: 500 }}
            >
              Choose your crafts
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed" style={{ color: "rgba(45,31,31,0.6)" }}>
              Browse the craft menu below and select the activities you'd like to try. You can{" "}
              <strong style={{ color: "#2D1F1F" }}>select multiple</strong>. This is how we reserve your spot — your place at each activity station is limited, so RSVP early!
            </p>
          </div>

          {/* Important note */}
          <div className="mx-auto mb-12 max-w-2xl rounded-2xl px-6 py-4 text-center text-sm leading-relaxed" style={{ backgroundColor: "#F4C2C230", border: "1.5px solid #F4C2C2" }}>
            <span className="font-semibold" style={{ color: "#2D1F1F" }}>💳 How payment works: </span>
            <span style={{ color: "rgba(45,31,31,0.7)" }}>
              The <strong style={{ color: "#E07A5F" }}>{eventDetails.entranceFee} {eventDetails.currency} entrance fee</strong> (includes refreshments) is paid when you RSVP to confirm your spot.{" "}
              <strong style={{ color: "#2D1F1F" }}>Craft activity fees are paid in person</strong> directly to the instructor on the day — not here.
            </span>
          </div>

          {/* Cards */}
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

          {/* Selection reminder */}
          {selectedPackages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <span className="text-sm" style={{ color: "rgba(45,31,31,0.6)" }}>Selected:</span>
              {selectedPackages.map((p) => (
                <span key={p.id} className="rounded-full px-4 py-1.5 text-sm font-medium" style={{ backgroundColor: `${p.color}30`, color: "#2D1F1F", border: `1px solid ${p.color}` }}>
                  {p.name}
                </span>
              ))}
              <span className="text-sm font-medium" style={{ color: "#E07A5F" }}>
                → scroll down to RSVP
              </span>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Open Mic spotlight ── */}
      <section style={{ backgroundColor: darkSectionColor }} className="px-6 py-20 md:px-14">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.45em]" style={{ color: "#F2A6A6" }}>
                Open Stage
              </p>
              <h2
                className="font-display mb-4"
                style={{ color: "#FDF6F0", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontStyle: "italic", fontWeight: 500 }}
              >
                Open Mic — every talent welcome
              </h2>
              <p className="max-w-3xl text-sm leading-relaxed" style={{ color: "rgba(253,246,240,0.65)" }}>
                Sing, perform, read poetry, share a story, play an instrument — the stage is open to every kind of talent. Whether you've been performing for years or you're just starting out, this is your moment.
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed" style={{ color: "rgba(253,246,240,0.65)" }}>
                No auditions, no pressure — just sign up on the day and take the mic whenever you're ready. Sets are kept short and casual so as many people as possible get a turn, and the crowd is here to cheer you on, not judge you.
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed" style={{ color: "rgba(253,246,240,0.65)" }}>
                <span style={{ color: "#D4BBEA", fontWeight: 600 }}>Just starting your creative career?</span> Use the open mic as your launchpad — introduce yourself, share your art, and get visibility in a warm, supportive crowd. Past performers have used their few minutes on stage to promote their pages, hand out business cards, and meet collaborators they still work with today.
              </p>
            </div>

            <div className="rounded-[28px] p-6 md:p-8" style={{ backgroundColor: "#FDF6F0" }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: "#E07A5F" }}>
                Event Highlights
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {alsoHappening.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-2 rounded-2xl p-5"
                    style={{ backgroundColor: "#FDF6F0", border: "1px solid #EDE0D4" }}
                  >
                    <span style={{ fontSize: "1.8rem" }}>{item.icon}</span>
                    <p className="font-display text-lg font-medium" style={{ color: "#2D1F1F", fontStyle: "italic" }}>
                      {item.label}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(45,31,31,0.58)" }}>
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
