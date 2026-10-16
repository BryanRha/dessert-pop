// 진행 상황 저장 (localStorage — 실패해도 게임은 메모리 상태로 계속 동작)
const KEY = 'dessertpop_save_v1';
const DEFAULT = {
  unlocked: 1, stars: {}, best: {}, coins: 300,
  boosters: { hammer: 3, shuffle: 2, swap: 2, moves: 1 },
  sfx: true, music: true, seenTut: {},
};

let data = null;

export function load() {
  if (data) return data;
  try {
    const raw = localStorage.getItem(KEY);
    data = raw ? { ...structuredClone(DEFAULT), ...JSON.parse(raw) } : structuredClone(DEFAULT);
    data.boosters = { ...DEFAULT.boosters, ...data.boosters };
  } catch { data = structuredClone(DEFAULT); }
  return data;
}

export function save() {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* 사생활 보호 모드 등 */ }
}

export function recordWin(levelId, stars, score, maxLevel) {
  const d = load();
  d.stars[levelId] = Math.max(d.stars[levelId] || 0, stars);
  d.best[levelId] = Math.max(d.best[levelId] || 0, score);
  d.unlocked = Math.min(maxLevel, Math.max(d.unlocked, levelId + 1));
  save();
}

export function addCoins(n) { const d = load(); d.coins = Math.max(0, d.coins + n); save(); return d.coins; }
export function spendCoins(n) { const d = load(); if (d.coins < n) return false; d.coins -= n; save(); return true; }
export function useBooster(k) { const d = load(); if ((d.boosters[k] || 0) <= 0) return false; d.boosters[k]--; save(); return true; }
export function addBooster(k, n = 1) { const d = load(); d.boosters[k] = (d.boosters[k] || 0) + n; save(); }
export function totalStars() { return Object.values(load().stars).reduce((a, b) => a + b, 0); }
