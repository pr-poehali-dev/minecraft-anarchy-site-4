export const HERO_IMG = "https://cdn.poehali.dev/projects/6ab96b0a-ef17-4bee-9116-d35eb47504c0/files/f9b9ef58-8280-44e4-aef2-7ad3e43fd8bf.jpg";

export const NAV_ITEMS = [
  { id: "home", label: "ГЛАВНАЯ" },
  { id: "about", label: "О СЕРВЕРЕ" },
  { id: "shop", label: "МАГАЗИН" },
  { id: "donate", label: "ДОНАТ" },
  { id: "news", label: "НОВОСТИ" },
  { id: "rules", label: "ПРАВИЛА" },
];

export const SHOP_ITEMS = [
  { id: 1, name: "VIP статус", category: "Привилегии", price: "199₽", color: "cyan", desc: "Доступ к VIP зонам, кастомный ник, x2 к дропу ресурсов и специальные команды.", icon: "Crown", tag: "ПОПУЛЯРНО" },
  { id: 2, name: "PREMIUM", category: "Привилегии", price: "499₽", color: "purple", desc: "Все права VIP + fly режим, /hat, доступ к приватному серверу и Discord роль.", icon: "Zap", tag: "ХИТ" },
  { id: 3, name: "ELITE", category: "Привилегии", price: "999₽", color: "pink", desc: "Максимальные привилегии: сет предметов, личная точка спавна и менторство.", icon: "Star", tag: "ТОПОВОЕ" },
  { id: 4, name: "Кирка алмазная", category: "Предметы", price: "79₽", color: "cyan", desc: "Алмазная кирка с зачаровкой Эффективность V, Удача III и Починка.", icon: "Hammer", tag: "РЕДКОЕ" },
  { id: 5, name: "Кейс x10", category: "Кейсы", price: "149₽", color: "green", desc: "10 случайных кейсов с уникальными предметами, скинами и привилегиями.", icon: "Package", tag: "ВЫГОДНО" },
  { id: 6, name: "Монеты x1000", category: "Валюта", price: "99₽", color: "yellow", desc: "1000 игровых монет для торговли на рынке и покупки в внутриигровом магазине.", icon: "Coins", tag: "БАЗОВОЕ" },
];

export const CATEGORIES = ["Все", "Привилегии", "Предметы", "Кейсы", "Валюта"];

export const NEWS = [
  { id: 1, date: "15 АПР 2026", title: "Обновление 3.0 — Кибер Нексус", text: "Масштабное обновление с новым измерением, неоновыми биомами и 50+ предметами. Входи — не пожалеешь!", tag: "ОБНОВЛЕНИЕ", color: "cyan" },
  { id: 2, date: "12 АПР 2026", title: "Турнир по PvP — призовой фонд 5000₽", text: "Регистрируйся на турнир! 64 участника, 3 раунда на выбывание. Победитель получает ELITE статус.", tag: "ИВЕНТ", color: "green" },
  { id: 3, date: "08 АПР 2026", title: "Технические работы завершены", text: "Сервер переехал на новое железо. Пинг снижен до 10ms, стабильность 99.9%.", tag: "СИСТЕМА", color: "purple" },
];

export const DONATE_TIERS = [
  { name: "STARTER", price: "100₽", color: "cyan", perks: ["x1.5 к опыту", "Цветной ник", "Приветствие в чате", "/kit starter раз в 24ч"] },
  { name: "BOOSTER", price: "250₽", color: "green", perks: ["x2 к опыту", "VIP зоны", "Fly режим", "5 домов", "/back команда"] },
  { name: "GODMODE", price: "500₽", color: "purple", perks: ["x3 к опыту", "Все привилегии", "Личный остров", "Менторство", "Discord VIP"] },
];

export const RULES = [
  { num: "01", title: "Не гриферь", desc: "Запрещено ломать чужие постройки, воровать ресурсы и уничтожать имущество игроков без согласия.", color: "cyan" },
  { num: "02", title: "Без читов", desc: "Запрещено использование модов, дающих преимущество: fly hack, speed, x-ray и любые нечестные клиенты.", color: "green" },
  { num: "03", title: "Уважай игроков", desc: "Запрещен токсик, оскорбления, спам и реклама других серверов в чате.", color: "purple" },
  { num: "04", title: "Один аккаунт", desc: "Один игрок = один аккаунт. Обход банов с других аккаунтов влечет постоянный бан.", color: "pink" },
  { num: "05", title: "Слушайся модераторов", desc: "Решения модерации обязательны к исполнению. Апелляции — только через Discord тикеты.", color: "cyan" },
  { num: "06", title: "Постройки в рамках", desc: "Не строй непристойный контент. Мегабашни должны быть на расстоянии от чужих территорий.", color: "green" },
];

export const MC_STATUS_URL = "https://functions.poehali.dev/e6703a36-ef5c-4de0-8e81-c5801d1fb499";

export const SERVER_START_DATE = new Date("2024-01-01");

export function getDaysOnline(): number {
  const now = new Date();
  const diff = now.getTime() - SERVER_START_DATE.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export const STATS_TEMPLATE = [
  { label: "ИГРОКОВ ОНЛАЙН", key: "players_online", icon: "Users", color: "#00f5ff" },
  { label: "СЛОТОВ ВСЕГО", key: "players_max", icon: "Globe", color: "#39ff14" },
  { label: "ЧАСОВ СЫГРАНО", key: "hours_played", icon: "Clock", color: "#bf00ff" },
  { label: "ДНЕЙ РАБОТЫ", key: "days_online", icon: "Shield", color: "#ff0090" },
];

export const COLOR_MAP: Record<string, string> = {
  cyan: "#00f5ff",
  green: "#39ff14",
  purple: "#bf00ff",
  pink: "#ff0090",
  yellow: "#ffff00",
};

export interface ServerStatus {
  online: boolean;
  players_online: number;
  players_max: number;
  version: string;
  motd: string;
}
