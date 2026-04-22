import Icon from "@/components/ui/icon";
import { PixelBlock, NeonTag } from "./ServerUI";
import { NEWS, RULES, NAV_ITEMS, COLOR_MAP, ServerStatus } from "./shared";

interface ContentSectionsProps {
  scrollTo: (id: string) => void;
  serverStatus: ServerStatus;
}

export default function ContentSections({ scrollTo, serverStatus }: ContentSectionsProps) {
  return (
    <>
      {/* ===== NEWS ===== */}
      <section id="news" className="py-24 px-4 relative" style={{ background: "linear-gradient(180deg, #020408 0%, #050810 50%, #020408 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <PixelBlock color="#ff0090" />
              <span className="pixel-font text-xs text-gray-500">СЕКЦИЯ 05</span>
              <PixelBlock color="#ff0090" />
            </div>
            <h2 className="pixel-font text-2xl md:text-3xl neon-text-pink mb-4">НОВОСТИ</h2>
            <div className="w-32 h-px mx-auto" style={{ background: "linear-gradient(to right, transparent, #ff0090, transparent)" }} />
          </div>

          <div className="space-y-6">
            {NEWS.map((item) => {
              const c = COLOR_MAP[item.color];
              return (
                <div
                  key={item.id}
                  className="card-cyber p-6 group cursor-default"
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = c; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#1a2a3a"; }}
                  style={{ transition: "border-color 0.3s" }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="pixel-font text-gray-600" style={{ fontSize: "8px" }}>{item.date}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <NeonTag color={item.color}>{item.tag}</NeonTag>
                        <h3 className="pixel-font" style={{ color: c, textShadow: `0 0 6px ${c}`, fontSize: "11px" }}>{item.title}</h3>
                      </div>
                      <p className="text-gray-400 leading-relaxed">{item.text}</p>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <Icon name="ArrowRight" size={18} style={{ color: c, opacity: 0.5 }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== RULES ===== */}
      <section id="rules" className="py-24 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <PixelBlock color="#00f5ff" />
              <span className="pixel-font text-xs text-gray-500">СЕКЦИЯ 06</span>
              <PixelBlock color="#00f5ff" />
            </div>
            <h2 className="pixel-font text-2xl md:text-3xl neon-text-cyan mb-4">ПРАВИЛА</h2>
            <div className="w-32 h-px mx-auto mb-6" style={{ background: "linear-gradient(to right, transparent, #00f5ff, transparent)" }} />
            <p className="text-gray-400 max-w-xl mx-auto">Соблюдай правила — сохраняй атмосферу. Нарушения ведут к бану без предупреждения.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {RULES.map((rule) => {
              const c = COLOR_MAP[rule.color];
              return (
                <div
                  key={rule.num}
                  className="card-cyber p-6 flex gap-4"
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = c; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#1a2a3a"; }}
                  style={{ transition: "border-color 0.3s" }}
                >
                  <div className="pixel-font text-2xl flex-shrink-0" style={{ color: c, textShadow: `0 0 10px ${c}`, opacity: 0.6 }}>{rule.num}</div>
                  <div>
                    <div className="pixel-font mb-2" style={{ color: c, textShadow: `0 0 6px ${c}`, fontSize: "10px" }}>{rule.title}</div>
                    <p className="text-gray-400 text-sm leading-relaxed">{rule.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 card-cyber p-6 text-center" style={{ borderColor: "#ff009033" }}>
            <div className="pixel-font neon-text-pink mb-2" style={{ fontSize: "10px" }}>⚠ ВАЖНО</div>
            <p className="text-gray-400 text-sm">Полные правила сервера доступны в Discord. При спорных ситуациях обращайся к модераторам через тикеты.</p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-12 px-4" style={{ borderTop: "1px solid #00f5ff22", background: "#010203" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 flex items-center justify-center" style={{ background: "#00f5ff", boxShadow: "0 0 12px #00f5ff" }}>
                  <span className="pixel-font text-black" style={{ fontSize: "8px" }}>CC</span>
                </div>
                <span className="pixel-font text-xs neon-text-cyan">DELL<span className="neon-text-green">AND</span></span>
              </div>
              <p className="text-gray-600 text-sm">Лучший кибер-майнкрафт сервер. Играем с 2024 года.</p>
            </div>
            <div>
              <div className="pixel-font neon-text-cyan mb-4" style={{ fontSize: "10px" }}>РАЗДЕЛЫ</div>
              <div className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <button key={item.id} onClick={() => scrollTo(item.id)} className="block text-gray-500 text-sm hover:text-gray-300 transition-colors">
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="pixel-font neon-text-green mb-4" style={{ fontSize: "10px" }}>СЕРВЕР</div>
              <div className="space-y-2 text-sm">
                <div className="text-gray-400">IP: <span style={{ color: "#00f5ff" }}>delland.hypixel.ws</span></div>
                <div className="text-gray-400">Версия: <span className="text-gray-300">1.20.4</span></div>
                <div className="text-gray-400">Режим: <span className="text-gray-300">Survival</span></div>
              </div>
            </div>
            <div>
              <div className="pixel-font neon-text-purple mb-4" style={{ fontSize: "10px" }}>СОЦСЕТИ</div>
              <div className="space-y-3">
                {[
                  { name: "Discord", icon: "MessageCircle", color: "#5865F2" },
                  { name: "VKontakte", icon: "Users", color: "#0077FF" },
                  { name: "Telegram", icon: "Send", color: "#26A5E4" },
                ].map((s) => (
                  <button key={s.name} className="flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors text-sm">
                    <Icon name={s.icon} size={14} style={{ color: s.color }} />
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "#1a2a3a" }}>
            <div className="pixel-font text-gray-700" style={{ fontSize: "8px" }}>© 2024–2026 DELLAND. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</div>
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: serverStatus.online ? "#39ff14" : "#ff4444",
                  boxShadow: serverStatus.online ? "0 0 6px #39ff14" : "0 0 6px #ff4444",
                }}
              />
              <span className="pixel-font" style={{ fontSize: "8px", color: serverStatus.online ? "#39ff14" : "#ff4444" }}>
                {serverStatus.online ? "СЕРВЕР ОНЛАЙН" : "СЕРВЕР ОФЛАЙН"}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
