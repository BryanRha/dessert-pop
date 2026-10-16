// 화면·게임 공통 상수
// 화면 아래에 표시되는 버전 (배포할 때마다 올림)
export const VERSION = '1.0.11';
export const W = 1080;
export const BASE_H = 1920;
// 실제 세로 길이 (세로로 긴 폰에서는 1920 보다 커짐). ES 모듈 live binding 이라 import 한 곳에서도 갱신된 값이 보인다.
export let H = BASE_H;
export const setH = h => { H = Math.max(BASE_H, Math.round(h)); };
export const CELL = 112;
export const FONT = 'Jua, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
export const INK = '#5A2A3A';
export const COLOR_HEX = [0xFF4D6D, 0xFF9F1C, 0xFFD23F, 0x8CC63F, 0x3EC1F3, 0xA55CF0];
export const COLOR_NAMES = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
export const BOOSTER_PRICE = { hammer: 100, shuffle: 80, swap: 120, moves: 90 };
export const WORLD_COUNT = 3;
export const LEVELS_PER_WORLD = 10;

// 텍스트 스타일 프리셋
export const TXT = {
  title: { fontFamily: FONT, fontSize: '84px', color: '#ffffff', stroke: INK, strokeThickness: 14 },
  big: { fontFamily: FONT, fontSize: '64px', color: '#ffffff', stroke: INK, strokeThickness: 12 },
  mid: { fontFamily: FONT, fontSize: '48px', color: '#ffffff', stroke: INK, strokeThickness: 10 },
  small: { fontFamily: FONT, fontSize: '36px', color: '#ffffff', stroke: INK, strokeThickness: 8 },
  body: { fontFamily: FONT, fontSize: '40px', color: INK, align: 'center', wordWrap: { width: 700, useAdvancedWrap: true } },
  dark: { fontFamily: FONT, fontSize: '44px', color: INK },
};
