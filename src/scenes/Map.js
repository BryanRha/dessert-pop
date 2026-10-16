// 월드맵: 3개 월드를 세로로 이어 붙이고, 30개 레벨 노드를 구불구불한 길로 연결한다.
import { W, H, TXT, INK } from '../config.js';
import { t } from '../i18n.js';
import { audio } from '../audio.js';
import { load, save, totalStars } from '../save.js';
import { LEVELS } from '../core/levels.js';
import { popup, button, iconButton, toast } from '../ui/widgets.js';

const WORLD_H = 3840;
const WORLDS = 3;
const TOTAL_H = WORLD_H * WORLDS;
const DECOS = ['lollipop_tree', 'cloud', 'cupcake_house', 'donut', 'icecream', 'cake', 'macaron_tower', 'meringue_mushroom', 'flower', 'cookie_rock', 'wafer_bridge', 'candle'];

export function nodePos(id) {
  const w = Math.ceil(id / 10), k = (id - 1) % 10;
  const yLocal = WORLD_H - 380 - k * ((WORLD_H - 760) / 9);
  return { x: W / 2 + 270 * Math.sin(k * 0.95 + w * 1.3), y: (WORLDS - w) * WORLD_H + yLocal };
}

export function settingsPopup(scene) {
  const d = load();
  const p = popup(scene, { title: t('settings'), width: 820, height: 760 });
  const row = (y, label, getOn, toggle, iconOn, iconOff) => {
    const txt = scene.add.text(-300, y, label, TXT.dark).setOrigin(0, 0.5);
    const btn = iconButton(scene, 230, y, getOn() ? iconOn : iconOff, () => { const on = toggle(); btn.icon.setTexture(on ? iconOn : iconOff); });
    p.box.add([txt, btn]);
  };
  row(-150, t('sound'), () => d.sfx, () => audio.toggleSfx(), 'ico_sound_on', 'ico_sound_off');
  row(10, t('music'), () => d.music, () => audio.toggleMusic(), 'ico_music_on', 'ico_music_off');
  const reset = button(scene, 0, 210, t('reset'), () => {
    p.close(true);
    const q = popup(scene, { title: t('reset'), width: 820, height: 620 });
    q.box.add(scene.add.text(0, -60, t('resetAsk'), TXT.body).setOrigin(0.5));
    q.box.add(button(scene, -180, 140, t('cancel'), () => q.close(), { kind: 'secondary', width: 320, height: 130, size: 44 }));
    q.box.add(button(scene, 180, 140, t('ok'), () => {
      try { localStorage.removeItem('dessertpop_save_v1'); } catch { /* */ }
      location.reload();
    }, { width: 320, height: 130, size: 44 }));
  }, { kind: 'secondary', width: 460, height: 130, size: 42 });
  p.box.add(reset);
  return p;
}

export class MapScene extends Phaser.Scene {
  constructor() { super('Map'); }

  create(data = {}) {
    const d = load();
    this.cameras.main.setBounds(0, 0, W, TOTAL_H);
    // 배경 (아래가 월드 1)
    for (let w = 1; w <= WORLDS; w++) {
      const img = this.add.image(W / 2, (WORLDS - w) * WORLD_H + WORLD_H / 2, `map_world_${w}`);
      img.setDisplaySize(W, WORLD_H);
      const banner = this.add.image(W / 2, (WORLDS - w + 1) * WORLD_H - 120, 'popup_ribbon').setDisplaySize(760, 170).setDepth(3);
      this.add.text(W / 2, banner.y - 8, `${w}. ${t('worldName')[w - 1]}`, { ...TXT.mid, stroke: '#9A2E56' }).setOrigin(0.5).setDepth(4);
    }
    // 길 좌표를 먼저 계산 (장식 배치와 점선 그리기에 함께 사용)
    const path = [];
    for (let id = 1; id < LEVELS.length; id++) {
      const a = nodePos(id), b = nodePos(id + 1);
      const n = Math.floor(Phaser.Math.Distance.Between(a.x, a.y, b.x, b.y) / 62);
      const cx = (a.x + b.x) / 2 + (a.x < b.x ? -60 : 60), cy = (a.y + b.y) / 2;
      for (let i = 1; i < n; i++) {
        const tt = i / n;
        path.push({ id, x: (1 - tt) ** 2 * a.x + 2 * (1 - tt) * tt * cx + tt * tt * b.x, y: (1 - tt) ** 2 * a.y + 2 * (1 - tt) * tt * cy + tt * tt * b.y });
      }
    }
    const nodes = LEVELS.map(l => nodePos(l.id));
    const banners = [1, 2, 3].map(w => (WORLDS - w + 1) * WORLD_H - 120);
    // 노드(번호 + 아래 별 줄)와 배너 영역은 비워 둔다
    const nearNode = (x, y, pad = 0) => nodes.some(n => Math.abs(x - n.x) < 100 + pad && y > n.y - 110 - pad && y < n.y + 135 + pad);
    const nearBanner = (x, y, pad = 0) => banners.some(by => Math.abs(y - by) < 100 + pad && Math.abs(x - W / 2) < 420 + pad);
    // 장식: 길·노드·배너에서 충분히 떨어진 곳에만
    const rnd = new Phaser.Math.RandomDataGenerator(['dessert-map']);
    for (let w = 1; w <= WORLDS; w++) {
      let placed = 0;
      for (let tries = 0; tries < 200 && placed < 14; tries++) {
        const y = (WORLDS - w) * WORLD_H + 260 + rnd.frac() * (WORLD_H - 520);
        const x = 90 + rnd.frac() * (W - 180);
        if (nearNode(x, y, 90) || nearBanner(x, y, 60) || path.some(pt => Math.hypot(pt.x - x, pt.y - y) < 150)) continue;
        const key = `map_deco_${rnd.pick(DECOS)}`;
        const s = this.add.image(x, y, key).setScale(0.45 + rnd.frac() * 0.3).setAlpha(0.95);
        if (key.includes('cloud')) { s.setAlpha(0.8); this.tweens.add({ targets: s, x: x + 30, yoyo: true, repeat: -1, duration: 4000 + rnd.frac() * 3000, ease: 'Sine.InOut' }); }
        placed++;
      }
    }
    // 길 점선
    for (const pt of path) {
      if (nearNode(pt.x, pt.y) || nearBanner(pt.x, pt.y)) continue;
      this.add.image(pt.x, pt.y, 'map_path_dot').setAlpha(pt.id < d.unlocked ? 1 : 0.55);
    }
    // 노드
    for (const lv of LEVELS) {
      const { x, y } = nodePos(lv.id);
      const unlocked = lv.id <= d.unlocked;
      const current = lv.id === d.unlocked;
      const key = !unlocked ? 'map_node_locked' : current ? 'map_node_current' : lv.boss ? 'map_node_boss' : 'map_node_open';
      const node = this.add.image(x, y, key).setScale(current || lv.boss ? 0.95 : 0.9);
      if (unlocked) {
        this.add.text(x, y - 10, `${lv.id}`, { ...TXT.big, fontSize: '68px' }).setOrigin(0.5);
        const st = d.stars[lv.id] || 0;
        for (let i = 0; i < 3; i++) this.add.image(x + (i - 1) * 46, y + 80 + (i === 1 ? 8 : 0), i < st ? 'star_small_on' : 'star_small_off').setScale(1);
        node.setInteractive({ useHandCursor: true });
        node.on('pointerup', (p) => { if (this.dragDist < 20) { audio.play('sfx_click'); this.openLevel(lv.id); } });
      }
      if (current && (d.seenUnlocked || 1) < lv.id) {
        // 새로 열린 레벨: 노드가 튀어나오는 연출
        const base = node.scale; node.setScale(0);
        this.tweens.add({ targets: node, scale: base, delay: 450, duration: 450, ease: 'Back.Out', onStart: () => audio.play('sfx_special_create') });
        for (let i = 0; i < 10; i++) {
          const p = this.add.image(x, y, 'ptc_star').setScale(0.4).setTint(0xFFD23F).setAlpha(0);
          const a = (i / 10) * Math.PI * 2;
          this.tweens.add({ targets: p, x: x + Math.cos(a) * 180, y: y + Math.sin(a) * 180, alpha: { from: 1, to: 0 }, delay: 500, duration: 700, onComplete: () => p.destroy() });
        }
        d.seenUnlocked = lv.id; save();
      }
      if (current) {
        this.tweens.add({ targets: node, scale: 1.02, yoyo: true, repeat: -1, duration: 600, delay: 1000 });
        const mk = this.add.image(x, y - 150, 'map_player_marker').setScale(0.85);
        this.tweens.add({ targets: mk, y: mk.y - 26, yoyo: true, repeat: -1, duration: 550, ease: 'Sine.InOut' });
      }
    }
    // 고정 UI
    const top = this.add.image(W / 2, 0, 'hud_topbar').setOrigin(0.5, 0).setScrollFactor(0).setScale(1, 0.62);
    iconButton(this, 90, 85, 'ico_home', () => this.scene.start('Title'), { size: 120 }).setScrollFactor(0);
    iconButton(this, W - 90, 85, 'ico_settings', () => settingsPopup(this), { size: 120 }).setScrollFactor(0);
    const coin = this.add.image(W / 2 - 180, 80, 'ico_coin').setScale(0.42).setScrollFactor(0);
    this.coinText = this.add.text(coin.x + 50, 80, `${d.coins}`, TXT.mid).setOrigin(0, 0.5).setScrollFactor(0);
    const star = this.add.image(W / 2 + 110, 80, 'star_small_on').setScale(1.1).setScrollFactor(0);
    this.add.text(star.x + 46, 80, `${totalStars()}`, TXT.mid).setOrigin(0, 0.5).setScrollFactor(0);

    // 스크롤
    const focus = nodePos(Math.min(d.unlocked, LEVELS.length));
    this.cameras.main.scrollY = Phaser.Math.Clamp(focus.y - H * 0.6, 0, TOTAL_H - H);
    this.dragDist = 0; this.vel = 0;
    this.input.on('pointerdown', p => { this.dragDist = 0; this.lastY = p.y; this.vel = 0; });
    this.input.on('pointermove', p => {
      if (!p.isDown) return;
      const dy = p.y - this.lastY; this.lastY = p.y;
      this.dragDist += Math.abs(dy);
      this.cameras.main.scrollY = Phaser.Math.Clamp(this.cameras.main.scrollY - dy, 0, TOTAL_H - H);
      this.vel = -dy;
    });
    this.input.on('wheel', (p, o, dx, dy) => { this.cameras.main.scrollY = Phaser.Math.Clamp(this.cameras.main.scrollY + dy, 0, TOTAL_H - H); });

    audio.music('bgm_map');
    this.cameras.main.fadeIn(250, 255, 227, 236);
    if (data.celebrate && d.unlocked > LEVELS.length) toast(this, t('allClear'));
  }

  update() {
    if (!this.input.activePointer.isDown && Math.abs(this.vel) > 0.5) {
      this.cameras.main.scrollY = Phaser.Math.Clamp(this.cameras.main.scrollY + this.vel, 0, TOTAL_H - H);
      this.vel *= 0.92;
    }
  }

  openLevel(id) {
    this.cameras.main.fadeOut(220, 255, 227, 236);
    this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('Game', { levelId: id }));
  }
}

export { INK };
