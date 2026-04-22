import { useState, useEffect } from "react";
import Navbar from "@/components/server/Navbar";
import MainSections from "@/components/server/MainSections";
import ContentSections from "@/components/server/ContentSections";
import { NAV_ITEMS, MC_STATUS_URL, ServerStatus } from "@/components/server/shared";

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serverStatus, setServerStatus] = useState<ServerStatus>({
    online: false,
    players_online: 0,
    players_max: 0,
    version: "1.16.5-1.21.1",
    motd: "",
  });
  const [statusLoading, setStatusLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(MC_STATUS_URL);
        const raw = await res.json();
        const data = typeof raw === "string" ? JSON.parse(raw) : raw;
        setServerStatus(data);
      } catch {
        // оставляем дефолтные значения
      } finally {
        setStatusLoading(false);
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-cyber-dark font-rubik relative">
      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50" style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.08) 3px,rgba(0,0,0,0.08) 4px)" }} />
      {/* Grid */}
      <div className="fixed inset-0 cyber-grid opacity-60 pointer-events-none" />
      {/* Glow orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #00f5ff08 0%, transparent 70%)" }} />
      <div className="fixed bottom-20 right-10 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #bf00ff08 0%, transparent 70%)" }} />

      <Navbar
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollTo={scrollTo}
        serverStatus={serverStatus}
        statusLoading={statusLoading}
      />

      <MainSections
        scrollTo={scrollTo}
        serverStatus={serverStatus}
        statusLoading={statusLoading}
      />

      <ContentSections
        scrollTo={scrollTo}
        serverStatus={serverStatus}
      />
    </div>
  );
}
