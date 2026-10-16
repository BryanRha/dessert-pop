import { W, BASE_H, setH } from './config.js';
import { audio } from './audio.js';
import { BootScene } from './scenes/Boot.js';
import { TitleScene } from './scenes/Title.js';
import { MapScene } from './scenes/Map.js';
import { GameScene } from './scenes/Game.js';

async function start() {
  try { await document.fonts.load('48px Jua'); } catch { /* 폰트 실패 시 기본 폰트 */ }
  document.getElementById('boot')?.remove();
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: W,
    height: BASE_H,
    backgroundColor: '#BDEBFF',
    transparent: false,
    // 세로로 긴 화면은 아래위를 넓혀 꽉 채우고(EXPAND), 가로로 넓은 화면은 9:16 으로 맞춤(FIT)
    scale: { mode: innerHeight / innerWidth > BASE_H / W ? Phaser.Scale.EXPAND : Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    render: { antialias: true, roundPixels: false },
    input: { activePointers: 1 },
    scene: [BootScene, TitleScene, MapScene, GameScene],
  });
  audio.attach(game);
  setH(game.scale.height);
  game.scale.on('resize', gs => setH(gs.height));
  window.__game = game; // 디버그용
}
start();
