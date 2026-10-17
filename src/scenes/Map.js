// 월드맵: 10개 월드를 세로로 이어 붙이고, 100개 레벨 노드를 구불구불한 길로 연결한다.
import { W, H, TXT, INK, WORLD_COUNT, MAP_THEME } from '../config.js';
import { t } from '../i18n.js';
import { audio } from '../audio.js';
import { load, save, availableStars } from '../save.js';
import { RESTORE_TASKS, taskCost } from '../restore.js';
import { dailyPopup, missionPopup } from '../ui/meta.js';
import { dailyState, claimableCount } from '../missions.js';
import { LEVELS } from '../core/levels.js';
import { popup, button, iconButton, toast, enableGlow } from '../ui/widgets.js';

const WORLD_H = 3840;
const WORLDS = WORLD_COUNT;
const TOTAL_H = WORLD_H * WORLDS;
const DECOS = ['bubbles', 'jellyfish', 'coral_tree', 'coral_fan', 'kelp', 'shell', 'anchor', 'chest', 'rock', 'urchin'];

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
    enableGlow(this);
    const d = load();
    this.cameras.main.setBounds(0, 0, W, TOTAL_H);
    // 배경 (아래가 월드 1)
    this.bgLayers = [];
    for (let w = 1; w <= WORLDS; w++) {
      this.bgLayers.push(this.drawWorld(w));
      const banner = this.add.image(W / 2, (WORLDS - w + 1) * WORLD_H - 120, 'popup_ribbon').setDisplaySize(760, 170).setDepth(3);
      this.add.text(W / 2, banner.y - 8, `${w}. ${t('worldName')[w - 1]}`, { ...TXT.mid, stroke: '#0B3E8A' }).setOrigin(0.5).setDepth(4);
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
    const banners = Array.from({ length: WORLDS }, (_, i) => (WORLDS - i) * WORLD_H - 120);
    // 노드(번호 + 아래 별 줄)와 배너 영역은 비워 둔다
    const nearNode = (x, y, pad = 0) => nodes.some(n => Math.abs(x - n.x) < 100 + pad && y > n.y - 110 - pad && y < n.y + 135 + pad);
    const nearBanner = (x, y, pad = 0) => banners.some(by => Math.abs(y - by) < 100 + pad && Math.abs(x - W / 2) < 420 + pad);
    // 장식: 길·노드·배너에서 충분히 떨어진 곳에만
    const rnd = new Phaser.Math.RandomDataGenerator(['ocean-map']);
    for (let w = 1; w <= WORLDS; w++) {
      let placed = 0;
      for (let tries = 0; tries < 200 && placed < 14; tries++) {
        const y = (WORLDS - w) * WORLD_H + 260 + rnd.frac() * (WORLD_H - 520);
        const x = 90 + rnd.frac() * (W - 180);
        if (nearNode(x, y, 90) || nearBanner(x, y, 60) || path.some(pt => Math.hypot(pt.x - x, pt.y - y) < 150)) continue;
        const key = `map_deco_${rnd.pick(DECOS)}`;
        const s = this.add.image(x, y, key).setScale(0.45 + rnd.frac() * 0.3).setAlpha(0.95);
        if (key.includes('bubbles') || key.includes('jellyfish')) { s.setAlpha(0.8); this.tweens.add({ targets: s, x: x + 30, yoyo: true, repeat: -1, duration: 4000 + rnd.frac() * 3000, ease: 'Sine.InOut' }); }
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
        const popDelay = data.arrive ? 2100 : 450;
        this.tweens.add({ targets: node, scale: base, delay: popDelay, duration: 450, ease: 'Back.Out', onStart: () => audio.play('sfx_special_create') });
        for (let i = 0; i < 10; i++) {
          const p = this.add.image(x, y, 'ptc_star').setScale(0.4).setTint(0xFFD23F).setAlpha(0);
          const a = (i / 10) * Math.PI * 2;
          this.tweens.add({ targets: p, x: x + Math.cos(a) * 180, y: y + Math.sin(a) * 180, alpha: { from: 1, to: 0 }, delay: popDelay + 50, duration: 700, onComplete: () => p.destroy() });
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
    this.add.text(star.x + 46, 80, `${availableStars()}`, TXT.mid).setOrigin(0, 0.5).setScrollFactor(0);
    // 바다 복원 버튼 (오른쪽 아래 고정). 별로 할 수 있는 과제가 있으면 빨간 알림 + 통통
    const reef = iconButton(this, W - 120, H - 190, 'ico_reef', () => {
      this.cameras.main.fadeOut(220, 189, 235, 255);
      this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('Reef'));
    }, { size: 160 }).setScrollFactor(0).setDepth(30);
    this.add.text(W - 120, H - 85, t('restoreTitle'), { ...TXT.small, fontSize: '28px', strokeThickness: 7 }).setOrigin(0.5).setScrollFactor(0).setDepth(30);
    const maxW = Math.min(10, Math.ceil(Math.min(d.unlocked, 100) / 10));
    let canDo = false;
    for (let w = 1; w <= maxW; w++) { const n = d.restore[w] || 0; if (n < RESTORE_TASKS && availableStars() >= taskCost(w, n)) canDo = true; }
    // 일일 미션 버튼 (왼쪽 아래). 받을 보상이 있으면 숫자 알림
    const mis = iconButton(this, 120, H - 190, 'ico_mission', () => missionPopup(this, () => this.refreshMissionBadge()), { size: 160 }).setScrollFactor(0).setDepth(30);
    this.add.text(120, H - 85, t('missionBtn'), { ...TXT.small, fontSize: '28px', strokeThickness: 7 }).setOrigin(0.5).setScrollFactor(0).setDepth(30);
    this.misBadge = this.add.circle(175, H - 245, 24, 0xFF3B4A).setStrokeStyle(5, 0xffffff).setScrollFactor(0).setDepth(31);
    this.misBadgeTxt = this.add.text(175, H - 247, '', { ...TXT.small, fontSize: '28px', strokeThickness: 0 }).setOrigin(0.5).setScrollFactor(0).setDepth(32);
    this.misBtn = mis;
    this.refreshMissionBadge();
    // 오늘 첫 방문이면 출석 보상 (새 월드로 이동하는 연출이 끝난 뒤)
    if (dailyState().canClaim) this.time.delayedCall(data.arrive ? 3600 : 650, () => dailyPopup(this));
    if (canDo) {
      const dot = this.add.circle(W - 65, H - 245, 24, 0xFF3B4A).setStrokeStyle(5, 0xffffff).setScrollFactor(0).setDepth(31);
      this.add.text(dot.x, dot.y - 2, '!', { ...TXT.small, fontSize: '32px', strokeThickness: 0 }).setOrigin(0.5).setScrollFactor(0).setDepth(32);
      this.tweens.add({ targets: reef, y: reef.y - 16, yoyo: true, repeat: -1, duration: 450, ease: 'Sine.InOut' });
    }

    // 스크롤
    const focus = nodePos(Math.min(d.unlocked, LEVELS.length));
    const clampY = y => Phaser.Math.Clamp(y - H * 0.6, 0, TOTAL_H - H);
    this.cameras.main.scrollY = clampY(focus.y);
    if (data.arrive) {
      // 월드 클리어 직후: 지난 월드 보스 노드에서 새 월드 첫 노드까지 카메라가 헤엄쳐 올라감
      const from = nodePos(Math.max(1, (data.arrive - 1) * 10));
      this.cameras.main.scrollY = clampY(from.y);
      this.tweens.add({ targets: this.cameras.main, scrollY: clampY(focus.y), delay: 500, duration: 1500, ease: 'Sine.InOut' });
    }
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

    audio.music('bgm_map', this);
    this.cameras.main.fadeIn(250, 189, 235, 255);
    if (data.celebrate && d.unlocked > LEVELS.length) toast(this, t('allClear'));
  }

  // 월드 한 칸 배경: 위→아래 그라데이션 + 모래·물빛 무늬 + 물결 + 물방울 (화면 밖 월드는 update 에서 숨김)
  drawWorld(w) {
    const [top, bottom, patch] = MAP_THEME[(w - 1) % MAP_THEME.length].map(c => Phaser.Display.Color.HexStringToColor(c).color);
    const y0 = (WORLDS - w) * WORLD_H;
    const g = this.add.graphics();
    g.fillGradientStyle(top, top, bottom, bottom, 1).fillRect(0, y0, W, WORLD_H);
    const rnd = new Phaser.Math.RandomDataGenerator([`world-${w}`]);
    g.fillStyle(patch, 0.45);
    for (let i = 0; i < 12; i++) {
      const rx = 120 + rnd.frac() * 160;
      g.fillEllipse(rnd.pick([rnd.frac() * 200 - 40, W - rnd.frac() * 200 + 40]), y0 + 200 + rnd.frac() * (WORLD_H - 400), rx * 2, rx * 1.1);
    }
    g.lineStyle(6, 0xffffff, 0.3);
    for (let i = 0; i < 26; i++) {
      const x = 40 + rnd.frac() * (W - 200), y = y0 + 80 + rnd.frac() * (WORLD_H - 160);
      g.beginPath(); g.moveTo(x, y);
      for (let k = 1; k <= 8; k++) g.lineTo(x + k * 20, y + Math.sin(k * Math.PI / 4) * 10);
      g.strokePath();
    }
    for (let i = 0; i < 40; i++) {
      const x = 40 + rnd.frac() * (W - 80), y = y0 + 60 + rnd.frac() * (WORLD_H - 120), r = 6 + rnd.frac() * 16;
      g.lineStyle(3, 0xffffff, 0.6).strokeCircle(x, y, r);
      g.fillStyle(0xffffff, 0.6).fillCircle(x - r * 0.35, y - r * 0.35, r * 0.22);
    }
    g.y0 = y0;
    return g;
  }

  refreshMissionBadge() {
    const n = claimableCount();
    this.misBadge.setVisible(n > 0); this.misBadgeTxt.setVisible(n > 0).setText(`${n}`);
    if (n > 0 && !this.misBounce) this.misBounce = this.tweens.add({ targets: this.misBtn, y: this.misBtn.y - 16, yoyo: true, repeat: -1, duration: 450, ease: 'Sine.InOut' });
    if (!n && this.misBounce) { this.misBounce.stop(); this.misBounce = null; this.misBtn.y = H - 190; }
  }

  update() {
    const cam = this.cameras.main;
    for (const g of this.bgLayers || []) g.setVisible(g.y0 < cam.scrollY + H && g.y0 + WORLD_H > cam.scrollY);
    if (!this.input.activePointer.isDown && Math.abs(this.vel) > 0.5) {
      this.cameras.main.scrollY = Phaser.Math.Clamp(this.cameras.main.scrollY + this.vel, 0, TOTAL_H - H);
      this.vel *= 0.92;
    }
  }

  openLevel(id) {
    this.cameras.main.fadeOut(220, 189, 235, 255);
    this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('Game', { levelId: id }));
  }
}

export { INK };
