import { useEffect, useState } from "react";
import { HeybikeHeader } from "./HeybikeHeader";
import {
  HeybikeThemeSwitcher,
  type HeybikeTheme,
} from "./HeybikeThemeSwitcher";
import {
  BlogPreview,
  CompareBanner,
  EventsAndCommunity,
  GuaranteeStrip,
  HeybikeFooter,
  HeybikeHero,
  PressReviews,
  ProductShowcase,
  PromoTiles,
  RiderStories,
  SmartSupport,
} from "./HeybikeSections";
import "./heybike.css";
import "./heybike-themes.css";

const themeStorageKey = "heybike-demo-theme";

function getInitialTheme(): HeybikeTheme {
  const stored = window.localStorage.getItem(themeStorageKey);
  return ["original", "cyber", "mono", "sport"].includes(stored ?? "")
    ? (stored as HeybikeTheme)
    : "original";
}

export function HeybikeHome() {
  const [announcement, setAnnouncement] = useState(2);
  const [promo, setPromo] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<HeybikeTheme>(getInitialTheme);

  useEffect(() => {
    const announcementTimer = window.setInterval(
      () => setAnnouncement((value) => (value + 1) % 3),
      5000,
    );
    const promoTimer = window.setInterval(
      () => setPromo((value) => (value + 1) % 2),
      5000,
    );
    return () => {
      window.clearInterval(announcementTimer);
      window.clearInterval(promoTimer);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("hb-lock", menuOpen);
    return () => document.body.classList.remove("hb-lock");
  }, [menuOpen]);

  useEffect(() => {
    window.localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  return (
    <div className="heybike-page" data-hb-theme={theme}>
      <HeybikeThemeSwitcher value={theme} onChange={setTheme} />
      <HeybikeHeader
        announcement={announcement}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
      />
      <HeybikeHero />
      <PromoTiles active={promo} onChange={setPromo} />
      <ProductShowcase />
      <CompareBanner />
      <SmartSupport />
      <PressReviews />
      <RiderStories />
      <GuaranteeStrip />
      <EventsAndCommunity />
      <BlogPreview />
      <HeybikeFooter />
    </div>
  );
}

export default HeybikeHome;
