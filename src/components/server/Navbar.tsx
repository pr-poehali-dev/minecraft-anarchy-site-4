import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./shared";
import { ServerStatus } from "./shared";

interface NavbarProps {
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  scrollTo: (id: string) => void;
  serverStatus: ServerStatus;
  statusLoading: boolean;
}

export default function Navbar({
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollTo,
  serverStatus,
  statusLoading,
}: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40" style={{ background: "rgba(2,4,8,0.92)", borderBottom: "1px solid #00f5ff33", backdropFilter: "blur(12px)" }}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center" style={{ background: "#00f5ff", boxShadow: "0 0 16px #00f5ff" }}>
            <span className="pixel-font text-[10px] text-black">CC</span>
          </div>
          <span className="pixel-font text-xs neon-text-cyan hidden sm:block">DELL<span className="neon-text-green">AND</span></span>
        </button>

        <div className="items-center gap-2 hidden md:flex">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              background: serverStatus.online ? "#39ff14" : "#ff4444",
              boxShadow: serverStatus.online ? "0 0 8px #39ff14" : "0 0 8px #ff4444",
            }}
          />
          <span className="pixel-font" style={{ fontSize: "9px", color: serverStatus.online ? "#39ff14" : "#ff4444" }}>
            {statusLoading ? "..." : `${serverStatus.players_online} ОНЛАЙН`}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="px-3 py-2 pixel-font transition-all duration-300"
              style={{
                fontSize: "9px",
                color: activeSection === item.id ? "#00f5ff" : "#6b8299",
                textShadow: activeSection === item.id ? "0 0 10px #00f5ff" : "none",
                borderBottom: activeSection === item.id ? "2px solid #00f5ff" : "2px solid transparent",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button className="md:hidden p-2" style={{ color: "#00f5ff" }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t px-4 py-3 flex flex-col gap-2" style={{ background: "rgba(2,4,8,0.98)", borderColor: "#1a2a3a" }}>
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)} className="text-left px-3 py-2 pixel-font transition-all" style={{ fontSize: "9px", color: activeSection === item.id ? "#00f5ff" : "#6b8299" }}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
