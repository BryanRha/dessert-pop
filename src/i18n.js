// 한국어 / 영어. 브라우저 언어가 ko 로 시작하면 한국어, 아니면 영어.
const STR = {
  ko: {
    play: '플레이', level: '레벨', moves: '이동', score: '점수', goal: '목표', start: '시작', next: '다음',
    retry: '다시 하기', map: '지도', resume: '계속하기', quit: '그만하기', settings: '설정', sound: '효과음', music: '배경음',
    on: '켜짐', off: '꺼짐', paused: '일시정지', levelClear: '레벨 클리어!', failed: '아쉬워요!', outOfMoves: '이동 횟수를 다 썼어요',
    timerBoom: '기뢰가 터졌어요', plus5: '+5 이동', plus5Ask: '이동 5번을 더 받을까요?', notEnough: '코인이 부족해요',
    buy: '구매', coins: '코인', giveUp: '포기', reward: '보상', best: '최고 점수', locked: '잠김', worldName: ['산호초 마을', '해초 숲', '깊은 바다', '열대 석호', '난파선 만', '빙하 바다', '진주 동굴', '화산 해구', '해파리 정원', '해저 도시'],
    tap: '터치해서 시작', allClear: '모든 레벨 클리어! 다음 업데이트를 기다려 주세요', boosterHammer: '삼지창', boosterShuffle: '소용돌이 섞기',
    boosterSwap: '자유 교환', boosterMoves: '+5 이동', buyBooster: '{0}\n{1}코인에 살까요?', tapTarget: '사용할 블록을 터치하세요', swapTarget: '바꿀 두 블록을 차례로 터치하세요',
    cancel: '취소', ok: '확인', restoreTitle: '바다 복원', health: '바다 건강도', restoreBtn: '복원하기', needStars: '별이 {0}개 더 필요해요\n레벨에서 별을 모아 보세요!', restoreDone: '바다 복원 완료!', restoreReward: '복원 보상', restoreAll: '이 바다는 다 살아났어요!\n다른 바다도 둘러보세요', restoreTasks: ['기름띠 걷어내기', '버려진 그물 치우기', '산호 심기', '해초 가꾸기', '보금자리 꾸미기', '바다 친구 부르기'], streakTitle: '연승 보너스', streakHint: '연속으로 깨면 특수 블록을 들고 시작해요!', streakOn: '{0}연승! 특수 블록을 들고 시작해요', streakLost: '연승 보너스가 사라졌어요', streakNow: '{0}연승 중!', bossWarn: '보스 레벨! 단단히 준비하세요', almost: '거의 다 왔어요! 한 번만 더!', leftGoals: '남은 목표', worldNew: '새로운 바다 발견!', allSeas: '모든 바다를 구했어요!', tapContinue: '화면을 터치하세요', worldBonus: '월드 클리어 보너스', install: '홈 화면에 추가', installIos: '아래쪽 공유 버튼 [□↑]을 누른 뒤\n\'홈 화면에 추가\'를 선택하세요', installMenu: '브라우저 메뉴 [⋮]에서\n\'홈 화면에 추가\' 또는 \'앱 설치\'를\n선택하세요', installInApp: '이 앱 안의 브라우저에서는 추가할 수 없어요.\n메뉴에서 \'다른 브라우저로 열기\'를 누른 뒤\nSafari 나 Chrome 에서 추가하세요', installDone: '이미 홈 화면에 있어요!', newBest: '최고 기록 갱신!', nextStar: '다음 별까지 {0}점!\n남은 이동이 많을수록 점수가 커져요', perfect: '완벽해요! 별 3개!', starUp: '별 {0}개 → {1}개 갱신!', first3Bonus: '첫 별 3개 보너스 +30 포함', tapSkip: '화면을 터치하면 빨리 감기', hammerNo: '여기에는 삼지창을 쓸 수 없어요',
    blocked: { ice: '얼음에 갇힌 바다 친구는 움직일 수 없어요. 맞춰서 얼음을 깨 주세요!', chain: '어망에 걸린 바다 친구예요. 같은 바다 친구와 맞추면 풀려나요!', bubble: '물방울에 갇혔어요. 옆에서 맞추면 터져요!', stone: '산호 바위는 움직일 수 없어요. 옆에서 맞춰서 부숴요!', crate: '보물상자는 움직일 수 없어요. 옆에서 맞춰서 열어요!', slime: '오염 해초는 움직일 수 없어요. 옆에서 맞춰서 치워요!' }, shuffle: '섞는 중...', reset: '진행 초기화', resetAsk: '정말 처음부터 다시 할까요?',
    goals: { score: '점수 {0}', jelly: '기름띠 모두 청소하기', drop: '아기 친구 구하기', collect: '바다 친구 모으기', clear: '장애물 부수기', cover: '얼음·어망·물방울 깨기', star: '불가사리 모으기' },
    tut: {
      swap: '이웃한 바다 친구 둘을 바꿔서\n같은 친구 3마리를 한 줄로 맞춰요!',
      line: '4마리를 맞추면 빛줄기 친구가 생겨요.\n터뜨리면 한 줄이 통째로 사라져요!',
      jelly: '기름띠 위에서 바다 친구를 맞추면\n바다가 깨끗해져요. 모두 청소해 보세요!',
      bomb: 'L자나 T자로 맞추면 별빛 폭탄!\n5마리를 일렬로 맞추면 무지개 진주가 생겨요.',
      drop: '방울 속 아기 친구를 맨 아래까지 내려 보내요.\n아래쪽 바다 친구를 없애면 내려가요!',
      ice: '얼음에 갇힌 바다 친구는 움직일 수 없어요.\n맞춰서 얼음을 깨뜨려요!',
      chain: '어망에 걸린 바다 친구는 움직일 수 없어요.\n같은 바다 친구와 맞추면 풀려나요.',
      stone: '산호 바위는 옆에서 바다 친구를 맞추면 부서져요.\n여러 번 맞혀야 하는 것도 있어요!',
      slime: '오염 해초는 2턴 동안 하나도 안 치우면 번져요.\n옆에서 맞춰서 빨리 치워요!',
      star: '불가사리 옆에서 바다 친구를 맞추면 모을 수 있어요!',
      timer: '기뢰의 숫자가 0이 되면 실패!\n옆에서 맞춰서 먼저 없애요.',
      bubble: '물방울은 옆에서 맞추기만 해도 터져요!',
    },
  },
  en: {
    play: 'Play', level: 'Level', moves: 'Moves', score: 'Score', goal: 'Goal', start: 'Start', next: 'Next',
    retry: 'Retry', map: 'Map', resume: 'Resume', quit: 'Quit', settings: 'Settings', sound: 'Sound', music: 'Music',
    on: 'On', off: 'Off', paused: 'Paused', levelClear: 'Level Clear!', failed: 'So close!', outOfMoves: 'Out of moves',
    timerBoom: 'A sea mine went off', plus5: '+5 Moves', plus5Ask: 'Get 5 extra moves?', notEnough: 'Not enough coins',
    buy: 'Buy', coins: 'Coins', giveUp: 'Give up', reward: 'Reward', best: 'Best', locked: 'Locked', worldName: ['Coral Village', 'Kelp Forest', 'Deep Blue', 'Tropical Lagoon', 'Shipwreck Bay', 'Polar Sea', 'Pearl Cave', 'Volcanic Vents', 'Jellyfish Garden', 'Sunken City'],
    tap: 'Tap to start', allClear: 'All levels cleared! More coming soon', boosterHammer: 'Trident', boosterShuffle: 'Whirlpool Shuffle',
    boosterSwap: 'Free Swap', boosterMoves: '+5 Moves', buyBooster: 'Buy {0} for {1} coins?', tapTarget: 'Tap a piece to use it on', swapTarget: 'Tap two neighbors to swap',
    cancel: 'Cancel', ok: 'OK', restoreTitle: 'Restore the Sea', health: 'Sea health', restoreBtn: 'Restore', needStars: 'You need {0} more stars\nEarn stars by clearing levels!', restoreDone: 'Sea restored!', restoreReward: 'Restore reward', restoreAll: 'This sea is fully alive!\nCheck out the other seas', restoreTasks: ['Clean up the oil', 'Remove the old nets', 'Plant coral', 'Grow kelp', 'Build a cozy home', 'Invite sea friends'], streakTitle: 'Win streak', streakHint: 'Win in a row to start with special pieces!', streakOn: '{0} wins in a row! Start with specials', streakLost: 'Your win streak bonus is gone', streakNow: '{0} wins in a row!', bossWarn: 'Boss level! Get ready', almost: 'So close! One more try!', leftGoals: 'Goals left', worldNew: 'A new sea discovered!', allSeas: 'You saved every sea!', tapContinue: 'Tap to continue', worldBonus: 'World clear bonus', install: 'Add to Home Screen', installIos: 'Tap the Share button [□↑] below,\nthen choose \'Add to Home Screen\'', installMenu: 'Open the browser menu [⋮] and choose\n\'Add to Home screen\' or \'Install app\'', installInApp: 'This in-app browser can’t add apps.\nOpen this page in Safari or Chrome first', installDone: 'Already on your home screen!', newBest: 'New best score!', nextStar: '{0} more points for the next star!\nMore moves left means more points', perfect: 'Perfect! 3 stars!', starUp: 'Stars {0} → {1}!', first3Bonus: 'Includes first 3-star bonus +30', tapSkip: 'Tap to fast-forward', hammerNo: 'The trident can’t be used here',
    blocked: { ice: 'Sea friends in ice can’t move. Match them to crack it!', chain: 'This sea friend is caught in a net. Match it to free it!', bubble: 'Trapped in a bubble. Match next to it to pop it!', stone: 'Coral rocks can’t move. Match next to them to break them!', crate: 'Treasure chests can’t move. Match next to them to open them!', slime: 'Polluted kelp can’t move. Match next to it to clear it!' }, shuffle: 'Shuffling...', reset: 'Reset progress', resetAsk: 'Start over from the beginning?',
    goals: { score: 'Score {0}', jelly: 'Clean up all oil', drop: 'Rescue the babies', collect: 'Collect sea friends', clear: 'Break blockers', cover: 'Break ice, nets & bubbles', star: 'Collect starfish' },
    tut: {
      swap: 'Swap two neighboring sea friends\nto line up 3 of the same kind!',
      line: 'Match 4 to make a light-beam friend.\nPop it to clear a whole line!',
      jelly: 'Match on top of oil spills\nto clean them. Clean them all!',
      bomb: 'Match in an L or T for a starburst bomb!\nMatch 5 in a row for a rainbow pearl.',
      drop: 'Bring the baby in the bubble to the bottom.\nClear the friends below it!',
      ice: 'Sea friends inside ice can’t move.\nMatch them to crack the ice!',
      chain: 'Sea friends in nets can’t move.\nMatch them to set them free.',
      stone: 'Match next to coral rocks to break them.\nSome take several hits!',
      slime: 'Polluted kelp spreads if you don’t\nclear any for 2 turns. Stop it fast!',
      star: 'Match next to starfish to collect them!',
      timer: 'If a sea mine hits 0, you lose!\nMatch next to it first.',
      bubble: 'Bubbles pop when you\nmatch next to them!',
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
