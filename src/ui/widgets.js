// 공용 UI 위젯: 버튼 · 아이콘 버튼 · 팝업 · 토스트
import { W, H, TXT, FONT, INK } from '../config.js';
import { audio } from '../audio.js';

// 9-slice 버튼 (btn_primary / btn_secondary) + 글자
export function button(scene, x, y, label, onClick, { kind = 'primary', width = 480, height = 150, size = 56 } = {}) {
  const key = `btn_${kind}`;
  const c = scene.add.container(x, y);
  const slice = kind === 'primary' ? 70 : 56;
  const bg = scene.add.nineslice(0, 0, key, null, width, height, slice, slice, 0, 0);
  const txt = scene.add.text(0, -8, label, { ...TXT.mid, fontSize: `${size}px`, stroke: kind === 'primary' ? '#1E6A44' : '#9A2E56' }).setOrigin(0.5);
  c.add([bg, txt]);
  c.setSize(width, height);
  c.setInteractive({ useHandCursor: true });
  c.on('pointerdown', () => { bg.setTexture(`${key}_pressed`); txt.y = 0; c.setScale(0.98); });
  const release = () => { bg.setTexture(key); txt.y = -8; c.setScale(1); };
  c.on('pointerout', release);
  c.on('pointerup', () => { release(); audio.play('sfx_click'); onClick && onClick(); });
  c.label = txt;
  return c;
}

// 원형 아이콘 버튼 (btn_icon_bg + ico_*)
export function iconButton(scene, x, y, icon, onClick, { size = 120, bg = 'btn_icon_bg' } = {}) {
  const c = scene.add.container(x, y);
  const b = scene.add.image(0, 0, bg).setDisplaySize(size, size);
  const ic = scene.add.image(0, -size * 0.04, icon).setDisplaySize(size * 0.62, size * 0.62);
  c.add([b, ic]);
  c.setSize(size, size);
  c.setInteractive({ useHandCursor: true });
  c.on('pointerdown', () => { if (scene.textures.exists(`${bg}_pressed`)) b.setTexture(`${bg}_pressed`); ic.y = size * 0.02; });
  const release = () => { b.setTexture(bg); ic.y = -size * 0.04; };
  c.on('pointerout', release);
  c.on('pointerup', () => { release(); audio.play('sfx_click'); onClick && onClick(); });
  c.icon = ic;
  return c;
}

// 모달 팝업. 반환된 container 에 내용을 add 하고, close() 로 닫는다.
export function popup(scene, { title, width = 900, height = 1100, onClose, closeButton = true } = {}) {
  const layer = scene.add.container(0, 0).setDepth(1000);
  const dim = scene.add.rectangle(W / 2, H / 2, W * 2, H * 2, 0x3A1F2E, 0.55).setInteractive();
  const box = scene.add.container(W / 2, H / 2);
  const panel = scene.add.nineslice(0, 0, 'popup_panel', null, width, height, 96, 96, 96, 96);
  box.add(panel);
  if (title) {
    const rib = scene.add.image(0, -height / 2 + 10, 'popup_ribbon').setDisplaySize(Math.min(width + 120, 980), 220);
    const tt = scene.add.text(0, -height / 2 - 4, title, { ...TXT.big, stroke: '#9A2E56' }).setOrigin(0.5);
    box.add([rib, tt]);
  }
  layer.add([dim, box]);
  const close = (silent) => {
    if (layer.closing) return; layer.closing = true;
    if (!silent) audio.play('sfx_popup_close');
    scene.tweens.add({ targets: box, scale: 0.8, alpha: 0, duration: 160, ease: 'Back.In' });
    scene.tweens.add({ targets: dim, alpha: 0, duration: 180, onComplete: () => { layer.destroy(); onClose && onClose(); } });
  };
  if (closeButton) {
    const x = iconButton(scene, width / 2 - 30, -height / 2 + 30, 'ico_plus', () => close(), { size: 110, bg: 'btn_close' });
    x.icon.setVisible(false);
    box.add(x);
  }
  box.setScale(0.7); box.alpha = 0;
  scene.tweens.add({ targets: box, scale: 1, alpha: 1, duration: 260, ease: 'Back.Out' });
  audio.play('sfx_popup_open');
  layer.box = box; layer.close = close; layer.panelH = height; layer.panelW = width;
  return layer;
}

export function toast(scene, msg, y = H * 0.45) {
  const t = scene.add.text(W / 2, y, msg, { ...TXT.mid, align: 'center' }).setOrigin(0.5).setDepth(2000);
  t.setScale(0.6); t.alpha = 0;
  scene.tweens.add({ targets: t, scale: 1, alpha: 1, duration: 200, ease: 'Back.Out' });
  scene.tweens.add({ targets: t, alpha: 0, y: y - 80, delay: 1300, duration: 400, onComplete: () => t.destroy() });
  return t;
}

// 별 3개 (결과·맵용)
export function starsRow(scene, x, y, n, { size = 150, gap = 170, key = 'big', animate = false } = {}) {
  const c = scene.add.container(x, y);
  for (let i = 0; i < 3; i++) {
    const s = scene.add.image((i - 1) * gap, i === 1 ? -size * 0.18 : 0, `star_${key}_off`).setDisplaySize(size, size);
    c.add(s);
    if (i < n) {
      const on = scene.add.image(s.x, s.y, `star_${key}_on`).setDisplaySize(size, size);
      c.add(on);
      if (animate) {
        on.setScale(0); on.alpha = 0;
        scene.tweens.add({ targets: on, scaleX: size / on.width, scaleY: size / on.height, alpha: 1, delay: 300 + i * 350, duration: 380, ease: 'Back.Out',
          onStart: () => audio.play(`sfx_star_${i + 1}`) });
      }
    }
  }
  return c;
}

export function label(scene, x, y, text, style = TXT.mid) {
  return scene.add.text(x, y, text, style).setOrigin(0.5);
}

export { FONT, INK };
