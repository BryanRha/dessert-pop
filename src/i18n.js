// 한국어 / 영어. 브라우저 언어가 ko 로 시작하면 한국어, 아니면 영어.
const STR = {
  ko: {
    play: '플레이', level: '레벨', moves: '이동', score: '점수', goal: '목표', start: '시작', next: '다음',
    retry: '다시 하기', map: '지도', resume: '계속하기', quit: '그만하기', settings: '설정', sound: '효과음', music: '배경음',
    on: '켜짐', off: '꺼짐', paused: '일시정지', levelClear: '레벨 클리어!', failed: '아쉬워요!', outOfMoves: '이동 횟수를 다 썼어요',
    timerBoom: '시한폭탄이 터졌어요', plus5: '+5 이동', plus5Ask: '이동 5번을 더 받을까요?', notEnough: '코인이 부족해요',
    buy: '구매', coins: '코인', giveUp: '포기', reward: '보상', best: '최고 점수', locked: '잠김', worldName: ['산호초 마을', '해초 숲', '깊은 바다'],
    tap: '터치해서 시작', allClear: '모든 레벨 클리어! 다음 업데이트를 기다려 주세요', boosterHammer: '롤리팝 망치', boosterShuffle: '거품기 셔플',
    boosterSwap: '자유 교환', boosterMoves: '+5 이동', buyBooster: '{0}\n{1}코인에 살까요?', tapTarget: '사용할 블록을 터치하세요', swapTarget: '바꿀 두 블록을 차례로 터치하세요',
    cancel: '취소', ok: '확인', newBest: '최고 기록 갱신!', nextStar: '다음 별까지 {0}점!\n남은 이동이 많을수록 점수가 커져요', perfect: '완벽해요! 별 3개!', starUp: '별 {0}개 → {1}개 갱신!', first3Bonus: '첫 별 3개 보너스 +30 포함', tapSkip: '화면을 터치하면 빨리 감기', hammerNo: '여기에는 망치를 쓸 수 없어요',
    blocked: { ice: '얼음 사탕 안의 바다 친구는 움직일 수 없어요. 옆에서 맞춰서 깨 주세요!', chain: '자물쇠로 잠긴 바다 친구예요. 같은 바다 친구와 맞추면 풀려요!', bubble: '솜사탕 거품에 갇혔어요. 옆에서 맞추면 터져요!', stone: '브라우니는 움직일 수 없어요. 옆에서 맞춰서 부숴요!', crate: '비스킷은 움직일 수 없어요. 옆에서 맞춰서 부숴요!', slime: '녹은 초콜릿은 움직일 수 없어요. 옆에서 맞춰서 없애요!' }, shuffle: '섞는 중...', reset: '진행 초기화', resetAsk: '정말 처음부터 다시 할까요?',
    goals: { score: '점수 {0}', jelly: '젤리 모두 지우기', drop: '재료 내리기', collect: '블록 모으기', clear: '장애물 부수기', cover: '덮개 깨기', star: '별 코인 모으기' },
    tut: {
      swap: '이웃한 바다 친구 둘을 바꿔서\n같은 친구 3마리를 한 줄로 맞춰요!',
      line: '4마리를 맞추면 빛줄기 친구가 생겨요.\n터뜨리면 한 줄이 통째로 사라져요!',
      jelly: '딸기 젤리 위에서 바다 친구를 맞추면\n젤리가 지워져요. 모두 지워 보세요!',
      bomb: 'L자나 T자로 맞추면 별빛 폭탄!\n5마리를 일렬로 맞추면 무지개 진주가 생겨요.',
      drop: '체리를 맨 아래까지 내려 보내요.\n아래쪽 바다 친구를 없애면 떨어져요!',
      ice: '얼음 사탕 안의 바다 친구는 움직일 수 없어요.\n맞춰서 얼음을 깨뜨려요!',
      chain: '자물쇠로 잠긴 바다 친구는 움직일 수 없어요.\n같은 바다 친구와 맞추면 풀려요.',
      stone: '브라우니는 옆에서 바다 친구를 맞추면 부서져요.\n여러 번 맞혀야 하는 것도 있어요!',
      slime: '녹은 초콜릿은 2턴 동안 하나도 안 없애면 번져요.\n옆에서 맞춰서 빨리 없애요!',
      star: '별 코인 옆에서 바다 친구를 맞추면 모을 수 있어요!',
      timer: '초콜릿 폭탄의 숫자가 0이 되면 실패!\n옆에서 맞춰서 먼저 없애요.',
      bubble: '솜사탕 거품은 옆에서 맞추기만 해도 터져요!',
    },
  },
  en: {
    play: 'Play', level: 'Level', moves: 'Moves', score: 'Score', goal: 'Goal', start: 'Start', next: 'Next',
    retry: 'Retry', map: 'Map', resume: 'Resume', quit: 'Quit', settings: 'Settings', sound: 'Sound', music: 'Music',
    on: 'On', off: 'Off', paused: 'Paused', levelClear: 'Level Clear!', failed: 'So close!', outOfMoves: 'Out of moves',
    timerBoom: 'The timer bomb went off', plus5: '+5 Moves', plus5Ask: 'Get 5 extra moves?', notEnough: 'Not enough coins',
    buy: 'Buy', coins: 'Coins', giveUp: 'Give up', reward: 'Reward', best: 'Best', locked: 'Locked', worldName: ['Coral Village', 'Kelp Forest', 'Deep Blue'],
    tap: 'Tap to start', allClear: 'All levels cleared! More coming soon', boosterHammer: 'Lollipop Hammer', boosterShuffle: 'Whisk Shuffle',
    boosterSwap: 'Free Swap', boosterMoves: '+5 Moves', buyBooster: 'Buy {0} for {1} coins?', tapTarget: 'Tap a piece to use it on', swapTarget: 'Tap two neighbors to swap',
    cancel: 'Cancel', ok: 'OK', newBest: 'New best score!', nextStar: '{0} more points for the next star!\nMore moves left means more points', perfect: 'Perfect! 3 stars!', starUp: 'Stars {0} → {1}!', first3Bonus: 'Includes first 3-star bonus +30', tapSkip: 'Tap to fast-forward', hammerNo: 'The hammer can’t be used here',
    blocked: { ice: 'Sea friends in ice can’t move. Match next to them to crack it!', chain: 'This sea friend is locked. Match it to unlock!', bubble: 'Trapped in a cotton candy bubble. Match next to it to pop it!', stone: 'Brownies can’t move. Match next to them to break them!', crate: 'Biscuits can’t move. Match next to them to break them!', slime: 'Melted chocolate can’t move. Match next to it to clear it!' }, shuffle: 'Shuffling...', reset: 'Reset progress', resetAsk: 'Start over from the beginning?',
    goals: { score: 'Score {0}', jelly: 'Clear all jelly', drop: 'Bring down fruits', collect: 'Collect pieces', clear: 'Break blockers', cover: 'Break covers', star: 'Collect star coins' },
    tut: {
      swap: 'Swap two neighboring sea friends\nto line up 3 of the same kind!',
      line: 'Match 4 to make a light-beam friend.\nPop it to clear a whole line!',
      jelly: 'Match on top of strawberry jelly\nto clear it. Clear them all!',
      bomb: 'Match in an L or T for a starburst bomb!\nMatch 5 in a row for a rainbow pearl.',
      drop: 'Bring the cherry to the bottom.\nClear the friends below it!',
      ice: 'Sea friends inside ice can’t move.\nMatch them to crack the ice!',
      chain: 'Locked sea friends can’t move.\nMatch them to unlock.',
      stone: 'Match next to brownies to break them.\nSome take several hits!',
      slime: 'Melted chocolate spreads if you don’t\nclear any for 2 turns. Stop it fast!',
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
