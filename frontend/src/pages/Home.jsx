import React, { useState } from "react";
import Hero from "@/components/craft/Hero";
import CraftCurriculum from "@/components/craft/CraftCurriculum";
import RSVPForm from "@/components/craft/RSVPForm";
import SiteFooter from "@/components/craft/SiteFooter";

export default function Home() {
  const [selectedPackages, setSelectedPackages] = useState([]);

  const scrollToRSVP = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleToggle = (pkg) => {
    setSelectedPackages((prev) =>
      prev.some((p) => p.id === pkg.id)
        ? prev.filter((p) => p.id !== pkg.id)
        : [...prev, pkg]
    );
    setTimeout(scrollToRSVP, 200);
  };

  return (
    <main style={{ backgroundColor: "#F7F0E8" }}>
      <Hero onReserve={scrollToRSVP} />
      <CraftCurriculum selectedPackages={selectedPackages} onToggle={handleToggle} />
      <RSVPForm selectedPackages={selectedPackages} />
      <SiteFooter />
    </main>
  );
}
