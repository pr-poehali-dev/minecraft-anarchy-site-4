import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/6ab96b0a-ef17-4bee-9116-d35eb47504c0/files/f9b9ef58-8280-44e4-aef2-7ad3e43fd8bf.jpg";

const NAV_ITEMS = [
  { id: "home", label: "ГЛАВНАЯ" },
  { id: "about", label: "О СЕРВЕРЕ" },
  { id: "shop", label: "МАГАЗИН" },
  { id: "donate", label: "ДОНАТ" },
  { id: "news", label: "НОВОСТИ" },
  { id: "rules", label: "ПРАВИЛА" },
];

const SHOP_ITEMS = [
  { id: 1, name: "VIP статус", category: "Привилегии", price: "199₽", color: "cyan", desc: "Доступ к VIP зонам, кастомный ник, x2 к дропу ресурсов и специальные команды.", icon: "Crown", tag: "ПОПУЛЯРНО" },
  { id: 2, name: "PREMIUM", category: "Привилегии", price: "499₽", color: "purple", desc: "Все права VIP + fly режим, /hat, доступ к приватному серверу и Discord роль.", icon: "Zap", tag: "ХИТ" },
  { id: 3, name: "ELITE", category: "Привилегии", price: "999₽", color: "pink", desc: "Максимальные привилегии: сет предметов, личная точка спавна и менторство.", icon: "Star", tag: "ТОПОВОЕ" },
  { id: 4, name: "Кирка алмазная", category: "Предметы", price: "79₽", color: "cyan", desc: "Алмазная кирка с зачаровкой Эффективность V, Удача III и Починка.", icon: "Hammer", tag: "РЕДКОЕ" },
  { id: 5, name: "Кейс x10", category: "Кейсы", price: "149₽", color: "green", desc: "10 случайных кейсов с уникальными предметами, скинами и привилегиями.", icon: "Package", tag: "ВЫГОДНО" },
  { id: 6, name: "Монеты x1000", category: "Валюта", price: "99₽", color: "yellow", desc: "1000 игровых монет для торговли на рынке и покупки в внутриигровом магазине.", icon: "Coins", tag: "БАЗОВОЕ" },
];

const CATEGORIES = ["Все", "Привилегии", "Предметы", "Кейсы", "Валюта"];

const NEWS = [
  { id: 1, date: "15 АПР 2026", title: "Обновление 3.0 — Кибер Нексус", text: "Масштабное обновление с новым измерением, неоновыми биомами и 50+ предметами. Входи — не пожалеешь!", tag: "ОБНОВЛЕНИЕ", color: "cyan" },
  { id: 2, date: "12 АПР 2026", title: "Турнир по PvP — призовой фонд 5000₽", text: "Регистрируйся на турнир! 64 участника, 3 раунда на выбывание. Победитель получает ELITE статус.", tag: "ИВЕНТ", color: "green" },
  { id: 3, date: "08 АПР 2026", title: "Технические работы завершены", text: "Сервер переехал на новое железо. Пинг снижен до 10ms, стабильность 99.9%.", tag: "СИСТЕМА", color: "purple" },
];

const DONATE_TIERS = [
  { name: "STARTER", price: "100₽", color: "cyan", perks: ["x1.5 к опыту", "Цветной ник", "Приветствие в чате", "/kit starter раз в 24ч"] },
  { name: "BOOSTER", price: "250₽", color: "green", perks: ["x2 к опыту", "VIP зоны", "Fly режим", "5 домов", "/back команда"] },
  { name: "GODMODE", price: "500₽", color: "purple", perks: ["x3 к опыту", "Все привилегии", "Личный остров", "Менторство", "Discord VIP"] },
];

const RULES = [
  { num: "01", title: "Не гриферь", desc: "Запрещено ломать чужие постройки, воровать ресурсы и уничтожать имущество игроков без согласия.", color: "cyan" },
  { num: "02", title: "Без читов", desc: "Запрещено использование модов, дающих преимущество: fly hack, speed, x-ray и любые нечестные клиенты.", color: "green" },
  { num: "03", title: "Уважай игроков", desc: "Запрещен токсик, оскорбления, спам и реклама других серверов в чате.", color: "purple" },
  { num: "04", title: "Один аккаунт", desc: "Один игрок = один аккаунт. Обход банов с других аккаунтов влечет постоянный бан.", color: "pink" },
  { num: "05", title: "Слушайся модераторов", desc: "Решения модерации обязательны к исполнению. Апелляции — только через Discord тикеты.", color: "cyan" },
  { num: "06", title: "Постройки в рамках", desc: "Не строй непристойный контент. Мегабашни должны быть на расстоянии от чужих территорий.", color: "green" },
];

const STATS = [
  { label: "ИГРОКОВ ОНЛАЙН", value: "247", icon: "Users", color: "#00f5ff" },
  { label: "ВСЕГО ИГРОКОВ", value: "12 840", icon: "Globe", color: "#39ff14" },
  { label: "ЧАСОВ СЫГРАНО", value: "890K", icon: "Clock", color: "#bf00ff" },
  { label: "ДНЕЙ РАБОТЫ", value: "847", icon: "Shield", color: "#ff0090" },
];

const COLOR_MAP: Record<string, string> = {
  cyan: "#00f5ff",
  green: "#39ff14",
  purple: "#bf00ff",
  pink: "#ff0090",
  yellow: "#ffff00",
};

function PixelBlock({ color }: { color: string }) {
  return (
    <span
      className="inline-block w-3 h-3 mr-1"
      style={{ background: color, imageRendering: "pixelated", boxShadow: `0 0 6px ${color}` }}
    />
  );
}

function NeonTag({ children, color }: { children: React.ReactNode; color: string }) {
  const c = COLOR_MAP[color] || "#00f5ff";
  return (
    <span
      className="pixel-font px-2 py-1"
      style={{ color: c, border: `1px solid ${c}`, textShadow: `0 0 6px ${c}`, boxShadow: `0 0 6px ${c}33`, fontSize: "8px" }}
    >
      {children}
    </span>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [shopCategory, setShopCategory] = useState("Все");
  const [shopSearch, setShopSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const filteredShop = SHOP_ITEMS.filter((item) => {
    const matchCat = shopCategory === "Все" || item.category === shopCategory;
    const matchSearch =
      item.name.toLowerCase().includes(shopSearch.toLowerCase()) ||
      item.desc.toLowerCase().includes(shopSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-cyber-dark font-rubik relative">
      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50" style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.08) 3px,rgba(0,0,0,0.08) 4px)" }} />
      {/* Grid */}
      <div className="fixed inset-0 cyber-grid opacity-60 pointer-events-none" />
      {/* Glow orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #00f5ff08 0%, transparent 70%)" }} />
      <div className="fixed bottom-20 right-10 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #bf00ff08 0%, transparent 70%)" }} />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-40" style={{ background: "rgba(2,4,8,0.92)", borderBottom: "1px solid #00f5ff33", backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center" style={{ background: "#00f5ff", boxShadow: "0 0 16px #00f5ff" }}>
              <span className="pixel-font text-[10px] text-black">CC</span>
            </div>
            <span className="pixel-font text-xs neon-text-cyan hidden sm:block">CYBER<span className="neon-text-green">CRAFT</span></span>
          </button>

          <div className="items-center gap-2 hidden md:flex">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: "0 0 8px #39ff14" }} />
            <span className="pixel-font text-green-400" style={{ fontSize: "9px" }}>247 ОНЛАЙН</span>
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
            <span className="pixel-font" style={{ color: "#00f5ff", fontSize: "9px" }}>play.cybercraft.ru</span>
          </div>

          <div className="mb-6">
            <h1 className="pixel-font text-4xl md:text-6xl mb-2 glitch-text" data-text="CYBERCRAFT"
              style={{ color: "#00f5ff", textShadow: "0 0 20px #00f5ff, 0 0 40px #00f5ff, 0 0 80px #00f5ff55" }}>
              CYBERCRAFT
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
            {STATS.map((stat) => (
              <div key={stat.label} className="card-cyber p-4 text-center">
                <div className="mb-2 flex justify-center">
                  <Icon name={stat.icon} size={18} style={{ color: stat.color, filter: `drop-shadow(0 0 6px ${stat.color})` }} />
                </div>
                <div className="pixel-font text-xl mb-1" style={{ color: stat.color, textShadow: `0 0 10px ${stat.color}` }}>{stat.value}</div>
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
                <span style={{ color: "#00f5ff" }}>CyberCraft</span> — это Minecraft сервер нового поколения, где классический геймплей встречается с неоновой кибер-эстетикой. Работаем с <span style={{ color: "#39ff14" }}>2024 года</span> и собрали тысячи игроков из всей России.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Уникальные режимы игры, авторские плагины, активное сообщество и честная система без pay-to-win. Здесь важно лишь умение и командная работа.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Версия", value: "1.20.4", color: "#00f5ff" },
                  { label: "Режим", value: "Survival", color: "#39ff14" },
                  { label: "Слоты", value: "500", color: "#bf00ff" },
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
                <span className="pixel-font text-xs neon-text-cyan">CYBER<span className="neon-text-green">CRAFT</span></span>
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
                <div className="text-gray-400">IP: <span style={{ color: "#00f5ff" }}>play.cybercraft.ru</span></div>
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
            <div className="pixel-font text-gray-700" style={{ fontSize: "8px" }}>© 2024–2026 CYBERCRAFT. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: "0 0 6px #39ff14" }} />
              <span className="pixel-font text-green-400" style={{ fontSize: "8px" }}>СЕРВЕР ОНЛАЙН</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}