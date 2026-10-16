# Dessert Pop! — 디저트 매치3 H5 게임

브라우저에서 바로 실행되는 세로형 매치3 퍼즐 게임. Phaser 3 + 순수 JS (빌드 도구 없음).
모든 그래픽·사운드는 `../assets/tools/` 의 생성 스크립트로 직접 만든 오리지널 리소스.

## 실행

정적 파일 서버로 `game/` 폴더를 열면 된다. (ES 모듈이라 `file://` 로 직접 열면 동작하지 않음)

```bash
cd game && python3 -m http.server 8080
```

브라우저에서 `http://localhost:8080` → 모바일은 같은 Wi-Fi 에서 `http://<PC IP>:8080`.

> OneDrive 폴더 안에서는 macOS 권한 때문에 서버가 파일을 못 읽을 수 있다.
> 그럴 때는 `node tools/sync.js --mirror` 로 `~/dessert-pop-dist` 에 복사한 뒤 그 폴더를 서빙한다.

## 배포

`game/` 폴더 전체(약 15MB)를 정적 호스팅(Netlify, Vercel, GitHub Pages, S3 등)에 올리면 끝.
`tools/` 폴더는 배포에 필요 없다. PWA 매니페스트가 있어 홈 화면에 추가하면 전체 화면 앱처럼 실행된다.

## 폴더 구조

```
game/
├─ index.html, manifest.webmanifest
├─ lib/phaser.min.js          Phaser 3.90
├─ fonts/Jua-Regular.ttf      UI 폰트 (SIL OFL 1.1, fonts/OFL.txt)
├─ icons/                     PWA·파비콘·OG 이미지
├─ assets/                    ← tools/sync.js 가 ../assets 에서 복사 (직접 수정 금지)
└─ src/
   ├─ core/engine.js          게임 규칙 엔진 (화면과 무관, Node 에서도 실행)
   ├─ core/levels.js          레벨 30개 정의
   ├─ core/levels_tuning.js   봇 시뮬레이션으로 정한 이동 수·별 기준 (자동 생성)
   ├─ scenes/                 Boot(로딩) · Title · Map · Game
   ├─ ui/widgets.js           버튼·팝업·토스트
   ├─ audio.js · save.js · i18n.js · config.js
```

## 게임 규칙 요약

| 매치 | 결과 |
|---|---|
| 3개 | 제거 |
| 4개 일렬 | 줄무늬 디저트 (가로/세로 한 줄 제거) |
| L·T 모양 | 선물 포장 폭탄 (3×3) |
| 5개 일렬 | 무지개 젤라토 (같은 색 전부 제거) |

특수 조합: 줄+줄 = 십자, 줄+폭탄 = 3줄 십자, 폭탄+폭탄 = 5×5, 무지개+블록 = 그 색 전부,
무지개+특수 = 그 색 전부를 특수로 바꿔 발동, 무지개+무지개 = 보드 전체.

장애물: 딸기 젤리(바닥) · 얼음 사탕(1~3단) · 사슬 · 솜사탕 거품 · 브라우니(1~3단) · 비스킷(1~2단) ·
녹은 초콜릿(번짐) · 시한폭탄 · 재료(체리/밤) · 별 코인.

부스터: 롤리팝 망치(1칸 제거) · 거품기 셔플 · 자유 교환 · +5 이동. 코인으로 구매.

## 개발 도구

```bash
npm test                 # 엔진 불변식 테스트 (전 레벨 무작위 플레이 + 특수 조합)
node tools/bot.js 12 30  # 레벨 12 를 봇으로 30판 → 승률·점수
node tools/tune.js 40    # 전 레벨 이동 수·별 기준 자동 조정 → levels_tuning.js
node tools/diag.js 18    # 실패한 판의 목표별 진행도 (병목 찾기)
node tools/sync.js       # ../assets 빌드 결과를 game/assets 로 동기화
```

브라우저 자동 플레이 검증: 개발 서버에서 콘솔에 `tools/browser/autoplay.js` 내용을 붙여 넣고
`await autoplay(5)` → 매 턴 화면 스프라이트가 엔진 상태와 일치하는지 검사한다.

헤드리스 Chrome 으로 한 번에 돌리기 (`puppeteer-core` 가 설치된 폴더에 `tools/browser/*` 를 복사해서 실행):

```bash
node e2e.mjs http://localhost:8080 1 30 ./shots   # 전 레벨 자동 플레이 + 레벨별 스크린샷
node flow.mjs ./shots                              # 첫 실행 흐름(타이틀→지도→튜토리얼→일시정지) 스크린샷
```

### 레벨 추가하기

`src/core/levels.js` 의 `RAW` 배열에 항목을 추가한다. 문자 규칙은 `engine.js` 상단 주석 참고.

```js
{ id: 31, moves: 25, colors: 5, layout: fill(8, 8), goals: [{ type: 'jelly' }], jelly: fill(8, 8, '1') }
```

추가 후 `node tools/tune.js` 를 돌리면 이동 수와 별 기준이 자동으로 맞춰진다.
월드 맵은 10레벨 단위로 월드가 바뀐다 (`WORLD_OF`).

### 리소스 수정하기

```bash
python3 ../assets/tools/build.py      # 그래픽 SVG → PNG
python3 ../assets/tools/gen_audio.py  # 효과음·BGM
node tools/sync.js                    # 게임으로 복사
```

## 저장 데이터

`localStorage` 의 `dessertpop_save_v1` 키에 진행도(별, 최고 점수, 코인, 부스터, 설정)를 저장한다.
설정 → "진행 초기화" 로 지울 수 있다.
