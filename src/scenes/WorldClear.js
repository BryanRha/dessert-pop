// 월드 클리어 연출: 고래 떼가 유영하고, 바다 친구들이 행진하고, 새 바다를 발견하는 순간.
// 보스(10번째) 레벨을 처음 깼을 때 Game → WorldClear → Map(새 월드로 카메라 이동) 순서로 나온다.
import { W, H, TXT, MAP_THEME, WORLD_COUNT } from '../config.js';
import { t } from '../i18n.js';
import { audio } from '../audio.js';
import { addCoins } from '../save.js';
import { asset } from '../config.js';

const BONUS = 100;
const hex = c => Phaser.Display.Color.HexStringToColor(c).color;

export class WorldClearScene extends Phaser.Scene {
  constructor() { super('WorldClear'); }

  init({ world = 1 } = {}) { this.next = Math.min(WORLD_COUNT, world + 1); }
  // 새 월드의 게임 배경을 깔아 '새 바다에 도착한' 느낌 (다른 월드 배경은 메모리에서 내림)
  preload() {
    const key = `bg_game_${this.next}`;
    for (const k of this.textures.getTextureKeys()) if (k.startsWith('bg_game_') && k !== key) this.textures.remove(k);
    if (!this.textures.exists(key)) this.load.image(key, asset(`assets/img/${key}.png`));
  }

  create({ world = 1 } = {}) {
    const last = world >= WORLD_COUNT;
    const next = Math.min(WORLD_COUNT, world + 1);
    const [top, bottom] = MAP_THEME[(next - 1) % MAP_THEME.length];
    addCoins(BONUS);
    audio.music('bgm_title', this);

    // ── 바다 배경 (새 월드 그림) + 흔들리는 빛줄기
    this.add.graphics().fillGradientStyle(hex(top), hex(top), hex(bottom), hex(bottom), 1).fillRect(0, 0, W, H);
    const bg = this.add.image(W / 2, H / 2, `bg_game_${next}`);
    bg.setScale(Math.max(W / bg.width, H / bg.height));
    for (let i = 0; i < 6; i++) {
      const ray = this.add.rectangle(120 + i * 180, -100, 120, H * 1.6, 0xffffff, 0.07).setOrigin(0.5, 0).setAngle(-12 + i * 2);
      this.tweens.add({ targets: ray, angle: ray.angle + 6, alpha: 0.03, yoyo: true, repeat: -1, duration: 2200 + i * 300, ease: 'Sine.InOut' });
    }
    // 끊임없이 올라오는 물방울
    this.time.addEvent({ delay: 110, loop: true, callback: () => {
      const b = this.add.image(Phaser.Math.Between(20, W - 20), H + 30, 'ptc_bubble').setScale(0.2 + Math.random() * 0.45).setAlpha(0.8).setDepth(1);
      this.tweens.add({ targets: b, y: -40, x: b.x + Phaser.Math.Between(-60, 60), duration: 2600 + Math.random() * 2000, onComplete: () => b.destroy() });
    } });

    // ── 고래 떼: 크기·깊이가 다른 아기 고래 9마리가 글자 아래 띠를 오른쪽에서 왼쪽으로 유영
    audio.play('sfx_whale', { volume: 0.9 });
    for (let i = 0; i < 9; i++) {
      const s = 1.3 + (i % 3) * 0.6 + Math.random() * 0.3;
      const y = H * (0.47 + (i % 5) * 0.065) + Math.random() * 40;
      const wh = this.add.image(W + 200 + i * 170, y, 'tile_blue').setScale(s).setDepth(2 + s).setAlpha(0.75 + s * 0.15);
      this.tweens.add({ targets: wh, x: -260, duration: 6200 - s * 900, delay: i * 120, ease: 'Linear' });
      this.tweens.add({ targets: wh, y: y - 30, angle: { from: -4, to: 4 }, yoyo: true, repeat: -1, duration: 700 + i * 60, ease: 'Sine.InOut' });
      // 물줄기 뿜기
      this.time.addEvent({ delay: 900 + i * 110, repeat: 4, callback: () => {
        for (let k = 0; k < 3; k++) {
          const d = this.add.image(wh.x - 10 * s, wh.y - 60 * s, 'ptc_drop').setScale(0.25 * s).setDepth(wh.depth);
          this.tweens.add({ targets: d, y: d.y - 90 * s - k * 20, x: d.x + (k - 1) * 30 * s, alpha: 0, duration: 520, onComplete: () => d.destroy() });
        }
      } });
    }

    // ── 몽이 등장 (아래에서 헤엄쳐 올라와 가운데에서 신나게)
    const m = this.add.image(W / 2, H + 400, 'mascot_happy').setScale(0.5).setDepth(8);
    this.tweens.add({ targets: m, y: H * 0.66, duration: 1100, delay: 600, ease: 'Back.Out',
      onComplete: () => this.tweens.add({ targets: m, y: m.y - 30, angle: { from: -5, to: 5 }, yoyo: true, repeat: -1, duration: 520, ease: 'Sine.InOut' }) });

    // ── 바다 친구 행진: 아래쪽을 따라 들어와 자리를 잡고 통통 뜀
    const crew = ['tile_red', 'tile_orange', 'tile_yellow', 'tile_green', 'tile_purple', 'item_collect_star'];
    crew.forEach((key, i) => {
      const x = W * (0.12 + i * 0.152), y = H - 230;
      const c = this.add.image(-150 - i * 140, y, key).setScale(1.05).setDepth(9);
      this.tweens.add({ targets: c, x, duration: 1500, delay: 900 + i * 120, ease: 'Cubic.Out',
        onComplete: () => this.tweens.add({ targets: c, y: y - 50, scaleY: 1.12, yoyo: true, repeat: -1, duration: 300 + (i % 2) * 80, ease: 'Quad.Out' }) });
    });

    // ── 배너: World Clear! → 새 바다 이름 → 보너스 코인
    this.time.delayedCall(1300, () => {
      audio.play('sfx_world_clear'); audio.buzz([60, 40, 120]);
      this.cameras.main.flash(300, 255, 255, 255);
      const rays = this.add.image(W / 2, H * 0.13, 'ptc_rays').setScale(2.6).setAlpha(0.5).setTint(0xFFF1A8).setDepth(10);
      this.tweens.add({ targets: rays, angle: 360, duration: 8000, repeat: -1 });
      const ban = this.add.image(W / 2, H * 0.13, 'txt_world_clear').setScale(0).setDepth(11);
      this.tweens.add({ targets: ban, scale: 0.62, duration: 450, ease: 'Back.Out' });
      this.confetti();
    });
    this.time.delayedCall(2100, () => {
      const sub = this.add.text(W / 2, H * 0.26, last ? t('allSeas') : `${t('worldNew')}\n${next}. ${t('worldName')[next - 1]}`,
        { ...TXT.big, fontSize: '66px', align: 'center', stroke: '#0B3E8A', strokeThickness: 14, lineSpacing: 12 }).setOrigin(0.5).setDepth(11).setScale(0);
      this.tweens.add({ targets: sub, scale: 1, duration: 400, ease: 'Back.Out' });
      audio.play('sfx_star_slam');
    });
    this.time.delayedCall(2800, () => {
      const coin = this.add.image(W / 2 - 110, H * 0.37, 'ico_coin').setScale(0).setDepth(11);
      const txt = this.add.text(W / 2 - 50, H * 0.37, '+0', { ...TXT.big, stroke: '#7A3F00' }).setOrigin(0, 0.5).setDepth(11);
      this.add.text(W / 2, H * 0.37 + 70, t('worldBonus'), { ...TXT.small, fontSize: '30px' }).setOrigin(0.5).setDepth(11);
      this.tweens.add({ targets: coin, scale: 0.55, duration: 300, ease: 'Back.Out' });
      this.tweens.addCounter({ from: 0, to: BONUS, duration: 700, onUpdate: tw => txt.setText(`+${Math.round(tw.getValue())}`), onComplete: () => audio.play('sfx_coin') });
    });

    // ── 터치하면 지도로 (새 월드까지 카메라가 이동)
    this.time.delayedCall(3600, () => {
      const tap = this.add.text(W / 2, H - 80, t('tapContinue'), { ...TXT.mid, fontSize: '40px' }).setOrigin(0.5).setDepth(12);
      this.tweens.add({ targets: tap, alpha: 0.3, yoyo: true, repeat: -1, duration: 600 });
      this.input.once('pointerup', () => {
        audio.play('sfx_click');
        this.cameras.main.fadeOut(300, 189, 235, 255);
        this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('Map', last ? { celebrate: true } : { arrive: next }));
      });
    });
    this.cameras.main.fadeIn(400, 255, 255, 255);
  }

  confetti() {
    const colors = [0xFF4D6D, 0xFF9F1C, 0xFFD23F, 0x8CC63F, 0x3EC1F3, 0xA55CF0];
    for (let i = 0; i < 80; i++) {
      const c = this.add.image(Phaser.Math.Between(0, W), -40 - Math.random() * 400, 'ptc_confetti')
        .setTint(colors[i % 6]).setScale(0.8 + Math.random()).setAngle(Math.random() * 360).setDepth(13);
      this.tweens.add({ targets: c, y: H + 60, angle: c.angle + Phaser.Math.Between(180, 720), x: c.x + Phaser.Math.Between(-140, 140),
        duration: 2200 + Math.random() * 1600, delay: Math.random() * 600, ease: 'Sine.In', onComplete: () => c.destroy() });
    }
  }
}
