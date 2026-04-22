import { useState } from "react";
import Icon from "@/components/ui/icon";
import { PixelBlock, NeonTag } from "./ServerUI";
import {
  HERO_IMG,
  SHOP_ITEMS,
  CATEGORIES,
  DONATE_TIERS,
  STATS_TEMPLATE,
  COLOR_MAP,
  ServerStatus,
  getDaysOnline,
} from "./shared";

interface MainSectionsProps {
  scrollTo: (id: string) => void;
  serverStatus: ServerStatus;
  statusLoading: boolean;
}

export default function MainSections({ scrollTo, serverStatus, statusLoading }: MainSectionsProps) {
  const [shopCategory, setShopCategory] = useState("Все");
  const [shopSearch, setShopSearch] = useState("");

  const statsValues: Record<string, string> = {
    players_online: statusLoading ? "..." : String(serverStatus.players_online),
    players_max: statusLoading ? "..." : String(serverStatus.players_max),
    hours_played: "890K",
    days_online: String(getDaysOnline()),
  };

  const filteredShop = SHOP_ITEMS.filter((item) => {
    const matchCat = shopCategory === "Все" || item.category === shopCategory;
    const matchSearch =
      item.name.toLowerCase().includes(shopSearch.toLowerCase()) ||
      item.desc.toLowerCase().includes(shopSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* ===== HERO ===== */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="CyberCraft Hero" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(2,4,8,0.3) 0%, rgba(2,4,8,0.7) 60%, rgba(2,4,8,1) 100%)" }} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2" style={{ border: "1px solid #00f5ff44", background: "#00f5ff08" }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: "0 0 6px #39ff14" }} />
            <span className="pixel-font text-gray-400" style={{ fontSize: "9px" }}>СЕРВЕР:</span>
            <span className="pixel-font" style={{ color: "#00f5ff", fontSize: "9px" }}>delland.hypixel.ws</span>
          </div>

          <div className="mb-6">
            <h1 className="pixel-font text-4xl md:text-6xl mb-2 glitch-text" data-text="DELLAND"
              style={{ color: "#00f5ff", textShadow: "0 0 20px #00f5ff, 0 0 40px #00f5ff, 0 0 80px #00f5ff55" }}>
              DELLAND
            </h1>
            <p className="pixel-font text-lg md:text-2xl" style={{ color: "#39ff14", textShadow: "0 0 10px #39ff14" }}>
              MINECRAFT SERVER
            </p>
          </div>

          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Неоновый мир где <span style={{ color: "#00f5ff" }}>пиксели встречают будущее</span>. Строй, воюй и исследуй кибер-вселенную Minecraft.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="btn-neon-cyan px-8 py-4" onClick={() => scrollTo("about")}>▶ НАЧАТЬ ИГРАТЬ</button>
            <button className="btn-neon-purple px-8 py-4" onClick={() => scrollTo("shop")}>★ МАГАЗИН</button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS_TEMPLATE.map((stat) => (
              <div key={stat.label} className="card-cyber p-4 text-center">
                <div className="mb-2 flex justify-center">
                  <Icon name={stat.icon} size={18} style={{ color: stat.color, filter: `drop-shadow(0 0 6px ${stat.color})` }} />
                </div>
                <div className="pixel-font text-xl mb-1" style={{ color: stat.color, textShadow: `0 0 10px ${stat.color}` }}>
                  {statsValues[stat.key]}
                </div>
                <div className="text-gray-500 pixel-font" style={{ fontSize: "8px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} style={{ color: "#00f5ff55" }} />
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <PixelBlock color="#00f5ff" />
              <span className="pixel-font text-xs text-gray-500">СЕКЦИЯ 02</span>
              <PixelBlock color="#00f5ff" />
            </div>
            <h2 className="pixel-font text-2xl md:text-3xl neon-text-cyan mb-4">О СЕРВЕРЕ</h2>
            <div className="w-32 h-px mx-auto" style={{ background: "linear-gradient(to right, transparent, #00f5ff, transparent)" }} />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                <span style={{ color: "#00f5ff" }}>Delland</span> — это Minecraft сервер нового поколения, где классический геймплей встречается с неоновой кибер-эстетикой. Работаем с <span style={{ color: "#39ff14" }}>2024 года</span> и собрали тысячи игроков из всей России.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Уникальные режимы игры, авторские плагины, активное сообщество и честная система без pay-to-win. Здесь важно лишь умение и командная работа.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Версия", value: statusLoading ? "..." : (serverStatus.version || "1.16.5-1.21.1"), color: "#00f5ff" },
                  { label: "Режим", value: "Survival", color: "#39ff14" },
                  { label: "Слоты", value: statusLoading ? "..." : String(serverStatus.players_max || "500"), color: "#bf00ff" },
                  { label: "TPS", value: "20/20", color: "#ff0090" },
                ].map((item) => (
                  <div key={item.label} className="card-cyber p-4">
                    <div className="text-gray-500 pixel-font mb-1" style={{ fontSize: "8px" }}>{item.label}</div>
                    <div className="pixel-font text-sm" style={{ color: item.color, textShadow: `0 0 8px ${item.color}` }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: "Cpu", title: "Мощное железо", desc: "Сервер на Ryzen 9, 64GB RAM, NVMe SSD. Пинг <10ms для России.", color: "#00f5ff" },
                { icon: "Shield", title: "Античит система", desc: "Продвинутая защита от читов. Честная игра гарантирована.", color: "#39ff14" },
                { icon: "Users", title: "Активное комьюнити", desc: "Discord с 3000+ участниками, ивенты каждую неделю.", color: "#bf00ff" },
                { icon: "Zap", title: "Уникальные плагины", desc: "Авторские механики: кибер-крафт, неоновые биомы, PvP арена.", color: "#ff0090" },
              ].map((feature) => (
                <div key={feature.title} className="card-cyber p-4 flex gap-4 items-start">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center" style={{ border: `1px solid ${feature.color}44`, background: `${feature.color}11` }}>
                    <Icon name={feature.icon} size={18} style={{ color: feature.color }} />
                  </div>
                  <div>
                    <div className="pixel-font mb-1" style={{ color: feature.color, fontSize: "10px" }}>{feature.title}</div>
                    <div className="text-gray-400 text-sm">{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SHOP ===== */}
      <section id="shop" className="py-24 px-4 relative" style={{ background: "linear-gradient(180deg, #020408 0%, #050810 50%, #020408 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <PixelBlock color="#39ff14" />
              <span className="pixel-font text-xs text-gray-500">СЕКЦИЯ 03</span>
              <PixelBlock color="#39ff14" />
            </div>
            <h2 className="pixel-font text-2xl md:text-3xl neon-text-green mb-4">МАГАЗИН</h2>
            <div className="w-32 h-px mx-auto" style={{ background: "linear-gradient(to right, transparent, #39ff14, transparent)" }} />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#39ff14" }} />
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={shopSearch}
                onChange={(e) => setShopSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 font-rubik text-sm text-gray-300 placeholder-gray-600 outline-none transition-all"
                style={{ border: "1px solid #1a2a3a", background: "#0a0f1a" }}
                onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#39ff14"; (e.target as HTMLInputElement).style.boxShadow = "0 0 8px #39ff1433"; }}
                onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "#1a2a3a"; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setShopCategory(cat)}
                  className="px-4 py-3 pixel-font transition-all duration-300"
                  style={{
                    fontSize: "9px",
                    color: shopCategory === cat ? "#020408" : "#39ff14",
                    background: shopCategory === cat ? "#39ff14" : "transparent",
                    border: "1px solid #39ff14",
                    boxShadow: shopCategory === cat ? "0 0 16px #39ff14" : "0 0 4px #39ff1422",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filteredShop.length === 0 ? (
            <div className="text-center py-16">
              <div className="pixel-font text-gray-600" style={{ fontSize: "10px" }}>ТОВАРЫ НЕ НАЙДЕНЫ</div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShop.map((item) => {
                const c = COLOR_MAP[item.color] || "#00f5ff";
                return (
                  <div
                    key={item.id}
                    className="card-cyber p-6 flex flex-col"
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = c; el.style.boxShadow = `0 0 20px ${c}22`; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "#1a2a3a"; el.style.boxShadow = "none"; }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 flex items-center justify-center" style={{ border: `2px solid ${c}44`, background: `${c}11` }}>
                        <Icon name={item.icon} size={22} style={{ color: c, filter: `drop-shadow(0 0 6px ${c})` }} />
                      </div>
                      <NeonTag color={item.color}>{item.tag}</NeonTag>
                    </div>

                    <div className="text-gray-500 pixel-font mb-1" style={{ fontSize: "8px" }}>{item.category}</div>
                    <div className="pixel-font mb-3" style={{ color: c, textShadow: `0 0 8px ${c}`, fontSize: "11px" }}>{item.name}</div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{item.desc}</p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="pixel-font text-xl" style={{ color: c, textShadow: `0 0 10px ${c}` }}>{item.price}</div>
                      <button
                        className="px-4 py-2 pixel-font transition-all duration-300"
                        style={{ fontSize: "9px", color: c, border: `1px solid ${c}`, boxShadow: `0 0 6px ${c}33` }}
                        onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = `${c}22`; el.style.boxShadow = `0 0 16px ${c}`; }}
                        onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "transparent"; el.style.boxShadow = `0 0 6px ${c}33`; }}
                      >
                        КУПИТЬ
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== DONATE ===== */}
      <section id="donate" className="py-24 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <PixelBlock color="#bf00ff" />
              <span className="pixel-font text-xs text-gray-500">СЕКЦИЯ 04</span>
              <PixelBlock color="#bf00ff" />
            </div>
            <h2 className="pixel-font text-2xl md:text-3xl neon-text-purple mb-4">ДОНАТ</h2>
            <div className="w-32 h-px mx-auto mb-6" style={{ background: "linear-gradient(to right, transparent, #bf00ff, transparent)" }} />
            <p className="text-gray-400 max-w-xl mx-auto">Поддержи сервер и получи бонусы. Без pay-to-win — только комфорт и кастомизация.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {DONATE_TIERS.map((tier, i) => {
              const c = COLOR_MAP[tier.color];
              return (
                <div
                  key={tier.name}
                  className="card-cyber p-6 flex flex-col relative"
                  style={{ borderColor: i === 1 ? c : "#1a2a3a", boxShadow: i === 1 ? `0 0 30px ${c}22` : "none" }}
                >
                  {i === 1 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="pixel-font bg-cyber-dark px-3 py-1" style={{ color: c, border: `1px solid ${c}`, fontSize: "8px" }}>ПОПУЛЯРНЫЙ</span>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <div className="pixel-font text-lg mb-2" style={{ color: c, textShadow: `0 0 10px ${c}` }}>{tier.name}</div>
                    <div className="pixel-font text-3xl text-white">{tier.price}</div>
                    <div className="text-gray-500 text-xs mt-1">единоразово</div>
                  </div>
                  <div className="space-y-3 mb-6 flex-1">
                    {tier.perks.map((perk) => (
                      <div key={perk} className="flex items-center gap-2">
                        <span style={{ color: c, textShadow: `0 0 6px ${c}` }}>▸</span>
                        <span className="text-gray-300 text-sm">{perk}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    className="w-full py-3 pixel-font transition-all duration-300 mt-auto"
                    style={{
                      fontSize: "10px",
                      color: i === 1 ? "#020408" : c,
                      background: i === 1 ? c : "transparent",
                      border: `2px solid ${c}`,
                      boxShadow: `0 0 10px ${c}33`,
                    }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; if (i !== 1) el.style.background = `${c}22`; el.style.boxShadow = `0 0 20px ${c}`; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; if (i !== 1) el.style.background = "transparent"; el.style.boxShadow = `0 0 10px ${c}33`; }}
                  >
                    ПОЛУЧИТЬ
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
