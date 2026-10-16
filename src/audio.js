// 효과음 / 배경음 관리. 설정(save.sfx / save.music)을 따른다.
import { load, save } from './save.js';

export const SFX = [
  'sfx_swap', 'sfx_swap_invalid', 'sfx_select', 'sfx_match_1', 'sfx_match_2', 'sfx_match_3', 'sfx_match_4', 'sfx_match_5',
  'sfx_special_create', 'sfx_line', 'sfx_bomb', 'sfx_rainbow', 'sfx_combo_special', 'sfx_jelly', 'sfx_ice', 'sfx_stone',
  'sfx_chain', 'sfx_item_drop', 'sfx_star_1', 'sfx_star_2', 'sfx_star_3', 'sfx_moves_low', 'sfx_shuffle', 'sfx_booster',
  'sfx_click', 'sfx_popup_open', 'sfx_popup_close', 'sfx_coin', 'jingle_win', 'jingle_lose',
];
export const BGM = ['bgm_title', 'bgm_map', 'bgm_game_1', 'bgm_game_2'];

class AudioManager {
  constructor() { this.game = null; this.current = null; this.currentKey = null; this.last = {}; }
  attach(game) { this.game = game; }
  play(key, opts = {}) {
    if (!this.game || !load().sfx) return;
    const now = performance.now();
    if (this.last[key] && now - this.last[key] < 45) return; // 같은 소리 겹침 방지
    this.last[key] = now;
    try { this.game.sound.play(key, { volume: opts.volume ?? 0.7, rate: opts.rate ?? 1, detune: opts.detune ?? 0 }); } catch { /* 디코딩 실패 무시 */ }
  }
  music(key) {
    if (!this.game) return;
    if (this.currentKey === key && this.current && this.current.isPlaying) return;
    this.stopMusic();
    this.currentKey = key;
    if (!load().music) return;
    try {
      this.current = this.game.sound.add(key, { loop: true, volume: 0.4 });
      this.current.play();
    } catch { this.current = null; }
  }
  stopMusic() { if (this.current) { this.current.stop(); this.current.destroy(); this.current = null; } }
  toggleSfx() { const d = load(); d.sfx = !d.sfx; save(); return d.sfx; }
  toggleMusic() {
    const d = load(); d.music = !d.music; save();
    if (!d.music) this.stopMusic(); else if (this.currentKey) { const k = this.currentKey; this.currentKey = null; this.music(k); }
    return d.music;
  }
}

export const audio = new AudioManager();
