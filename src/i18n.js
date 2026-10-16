// 한국어 / 영어. 브라우저 언어가 ko 로 시작하면 한국어, 아니면 영어.
const STR = {
  ko: {
    play: '플레이', level: '레벨', moves: '이동', score: '점수', goal: '목표', start: '시작', next: '다음',
    retry: '다시 하기', map: '지도', resume: '계속하기', quit: '그만하기', settings: '설정', sound: '효과음', music: '배경음',
    on: '켜짐', off: '꺼짐', paused: '일시정지', levelClear: '레벨 클리어!', failed: '아쉬워요!', outOfMoves: '이동 횟수를 다 썼어요',
    timerBoom: '시한폭탄이 터졌어요', plus5: '+5 이동', plus5Ask: '이동 5번을 더 받을까요?', notEnough: '코인이 부족해요',
    buy: '구매', coins: '코인', giveUp: '포기', reward: '보상', best: '최고 점수', locked: '잠김', worldName: ['딸기 정원', '초콜릿 강', '아이스크림 설산'],
    tap: '터치해서 시작', allClear: '모든 레벨 클리어! 다음 업데이트를 기다려 주세요', boosterHammer: '롤리팝 망치', boosterShuffle: '거품기 셔플',
    boosterSwap: '자유 교환', boosterMoves: '+5 이동', buyBooster: '{0}\n{1}코인에 살까요?', tapTarget: '사용할 블록을 터치하세요', swapTarget: '바꿀 두 블록을 차례로 터치하세요',
    cancel: '취소', ok: '확인', shuffle: '섞는 중...', reset: '진행 초기화', resetAsk: '정말 처음부터 다시 할까요?',
    goals: { score: '점수 {0}', jelly: '젤리 모두 지우기', drop: '재료 내리기', collect: '블록 모으기', clear: '장애물 부수기', cover: '덮개 깨기', star: '별 코인 모으기' },
    tut: {
      swap: '이웃한 디저트 두 개를 바꿔서\n같은 디저트 3개를 한 줄로 맞춰요!',
      line: '4개를 맞추면 줄무늬 디저트가 생겨요.\n터뜨리면 한 줄이 통째로 사라져요!',
      jelly: '딸기 젤리 위에서 디저트를 맞추면\n젤리가 지워져요. 모두 지워 보세요!',
      bomb: 'L자나 T자로 맞추면 선물 포장 폭탄!\n5개를 일렬로 맞추면 무지개 젤라토가 생겨요.',
      drop: '체리를 맨 아래까지 내려 보내요.\n아래쪽 디저트를 없애면 떨어져요!',
      ice: '얼음 사탕 안의 디저트는 움직일 수 없어요.\n맞춰서 얼음을 깨뜨려요!',
      chain: '자물쇠로 잠긴 디저트는 움직일 수 없어요.\n같은 디저트와 맞추면 풀려요.',
      stone: '브라우니는 옆에서 디저트를 맞추면 부서져요.\n여러 번 맞혀야 하는 것도 있어요!',
      slime: '녹은 초콜릿은 한 턴에 하나도 안 없애면 번져요.\n옆에서 맞춰서 빨리 없애요!',
      star: '별 코인 옆에서 디저트를 맞추면 모을 수 있어요!',
      timer: '초콜릿 폭탄의 숫자가 0이 되면 실패!\n옆에서 맞춰서 먼저 없애요.',
      bubble: '솜사탕 거품은 옆에서 맞추기만 해도 터져요!',
    },
  },
  en: {
    play: 'Play', level: 'Level', moves: 'Moves', score: 'Score', goal: 'Goal', start: 'Start', next: 'Next',
    retry: 'Retry', map: 'Map', resume: 'Resume', quit: 'Quit', settings: 'Settings', sound: 'Sound', music: 'Music',
    on: 'On', off: 'Off', paused: 'Paused', levelClear: 'Level Clear!', failed: 'So close!', outOfMoves: 'Out of moves',
    timerBoom: 'The timer bomb went off', plus5: '+5 Moves', plus5Ask: 'Get 5 extra moves?', notEnough: 'Not enough coins',
    buy: 'Buy', coins: 'Coins', giveUp: 'Give up', reward: 'Reward', best: 'Best', locked: 'Locked', worldName: ['Strawberry Garden', 'Chocolate River', 'Ice Cream Peaks'],
    tap: 'Tap to start', allClear: 'All levels cleared! More coming soon', boosterHammer: 'Lollipop Hammer', boosterShuffle: 'Whisk Shuffle',
    boosterSwap: 'Free Swap', boosterMoves: '+5 Moves', buyBooster: 'Buy {0} for {1} coins?', tapTarget: 'Tap a piece to use it on', swapTarget: 'Tap two neighbors to swap',
    cancel: 'Cancel', ok: 'OK', shuffle: 'Shuffling...', reset: 'Reset progress', resetAsk: 'Start over from the beginning?',
    goals: { score: 'Score {0}', jelly: 'Clear all jelly', drop: 'Bring down fruits', collect: 'Collect pieces', clear: 'Break blockers', cover: 'Break covers', star: 'Collect star coins' },
    tut: {
      swap: 'Swap two neighboring desserts\nto line up 3 of the same kind!',
      line: 'Match 4 to make a striped dessert.\nPop it to clear a whole line!',
      jelly: 'Match on top of strawberry jelly\nto clear it. Clear them all!',
      bomb: 'Match in an L or T for a gift bomb!\nMatch 5 in a row for a rainbow gelato.',
      drop: 'Bring the cherry to the bottom.\nClear the desserts below it!',
      ice: 'Desserts inside ice candy can’t move.\nMatch them to crack the ice!',
      chain: 'Locked desserts can’t move.\nMatch them to unlock.',
      stone: 'Match next to brownies to break them.\nSome take several hits!',
      slime: 'Melted chocolate spreads if you don’t\nclear any in a turn. Stop it fast!',
      star: 'Match next to star coins to collect them!',
      timer: 'If a chocolate bomb hits 0, you lose!\nMatch next to it first.',
      bubble: 'Cotton candy bubbles pop when you\nmatch next to them!',
    },
  },
};

let lang = 'en';
try { lang = (navigator.language || 'en').toLowerCase().startsWith('ko') ? 'ko' : 'en'; } catch { /* node */ }

export function t(key, ...args) {
  const v = key.split('.').reduce((o, k) => (o ? o[k] : undefined), STR[lang]) ?? key.split('.').reduce((o, k) => (o ? o[k] : undefined), STR.en) ?? key;
  return typeof v === 'string' ? v.replace(/\{(\d)\}/g, (_, i) => args[i]) : v;
}
export const LANG = () => lang;
