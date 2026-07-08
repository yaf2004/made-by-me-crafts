import React from "react";
import { MapPin, Clock, MessageCircle, Mail, Instagram, Heart, Phone } from "lucide-react";
import { eventDetails } from "./packages";

export default function SiteFooter() {
  return (
    <footer style={{ backgroundColor: "#FDF6F0", borderTop: "1px solid #EDE0D4" }} className="px-6 py-14 md:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Heart className="h-4 w-4" style={{ color: "#E07A5F" }} fill="#E07A5F" />
              <h3 className="font-display text-2xl" style={{ color: "#2D1F1F", fontStyle: "italic", fontWeight: 500 }}>Made by Me Crafts</h3>
            </div>
            <p className="max-w-xs text-sm leading-relaxed" style={{ color: "rgba(45,31,31,0.55)" }}>
              {eventDetails.tagline}. Every piece made by hand, made with love, made for you.
            </p>
            <p className="mt-3 text-xs" style={{ color: "rgba(45,31,31,0.35)" }}>Send inspo. We'll bring it to life. 💌</p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] mb-4" style={{ color: "#E07A5F" }}>The Venue</p>
            <div className="space-y-3 text-sm" style={{ color: "rgba(45,31,31,0.65)" }}>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#E07A5F" }} />
                <span>{eventDetails.venue}<br />{eventDetails.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" style={{ color: "#E07A5F" }} />
                {eventDetails.date}
              </p>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] mb-4" style={{ color: "#E07A5F" }}>Get in touch</p>
            <div className="flex flex-col gap-3">
              {[
                { href: eventDetails.instagramUrl, icon: Instagram, label: "Instagram • madebyme.4" },
                { href: eventDetails.telegram, icon: MessageCircle, label: "Telegram • @azagbrazm" },
                { href: `tel:${eventDetails.phone}`, icon: Phone, label: `Phone • ${eventDetails.phone}` },
                { href: `mailto:${eventDetails.email}`, icon: Mail, label: eventDetails.email },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm transition-colors"
                  style={{ color: "rgba(45,31,31,0.55)" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#E07A5F"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(45,31,31,0.55)"}
                >
                  <Icon className="h-4 w-4" style={{ color: "#E07A5F" }} /> {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 pt-6 sm:flex-row" style={{ borderTop: "1px solid #EDE0D4" }}>
          <p className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(45,31,31,0.35)" }}>
            <Heart className="h-3 w-3" style={{ color: "#E07A5F" }} fill="#E07A5F" />
            © {new Date().getFullYear()} Made by Me Crafts. All pieces made by hand.
          </p>
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(45,31,31,0.3)" }}>
            {eventDetails.edition}
          </p>
        </div>
      </div>
    </footer>
  );
}
