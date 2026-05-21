# MobiTrust — 블록체인 P2P 카셰어링 플랫폼

> 스마트컨트랙트로 즉시 정산하고, NFT로 차량 이력을 관리하며, W-KRW 스테이블코인으로 결제하는 탈중앙화 카셰어링 서비스

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![ethers.js](https://img.shields.io/badge/ethers.js-v6-3C3C3D?style=flat-square)
![Kaia](https://img.shields.io/badge/Kaia-Kairos_Testnet-FF6B35?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| 🦊 **MetaMask 연결** | 지갑 연결/해제, Kaia Kairos 네트워크 자동 전환 |
| 🚗 **차량 목록 조회** | 대여 가능한 차량 검색 및 필터링 |
| 📅 **차량 예약** | W-KRW 스테이블코인으로 결제 및 스마트컨트랙트 예약 |
| 🔑 **즉시 정산** | 운행 종료 시 스마트컨트랙트가 자동으로 정산 처리 |
| ✨ **NFT 발행** | 차량 등록 시 블록체인에 NFT로 이력 기록 (호스트 기능) |
| 🖥️ **TX 로그** | 터미널 스타일의 실시간 트랜잭션 내역 확인 |

---

## 시작하기

### 사전 준비

- [Node.js](https://nodejs.org) 18 이상
- [MetaMask](https://metamask.io) 브라우저 확장 프로그램
- Kaia Kairos 테스트넷 KAIA (faucet: [faucet.kaia.io](https://faucet.kaia.io))

### 설치 및 실행

```bash
# 레포 클론
git clone https://github.com/yelim8902/mobitrust-frontend.git
cd mobitrust-frontend

# 의존성 설치
npm install

# 개발 서버 시작
npm start
```

브라우저에서 **http://localhost:3000** 을 열면 됩니다.

---

## 스마트컨트랙트 연결 방법

현재 `src/contracts/`의 ABI 파일은 플레이스홀더입니다.  
Remix에서 컨트랙트를 배포한 후 아래 순서로 연결하세요.

### 1단계 — Remix에서 컨트랙트 배포

1. [remix.ethereum.org](https://remix.ethereum.org) 접속
2. MetaMask를 **Kaia Kairos Testnet** (Chain ID: 1001)으로 연결
3. `CarSharing.sol`, `VehicleNFT.sol` 컴파일 & 배포

### 2단계 — ABI와 주소 붙여넣기

**`src/contracts/CarSharing.json`**
```json
{
  "address": "0x배포된_컨트랙트_주소",
  "abi": [ ...Remix에서 복사한 ABI 배열... ]
}
```

> Remix에서 ABI 복사: **Solidity Compiler 탭 → 컴파일 후 하단 `ABI` 버튼 클릭**

`VehicleNFT.json`도 동일하게 작성합니다.

### 3단계 — TODO 주석 해제

각 컴포넌트의 `// TODO` 주석 처리된 컨트랙트 호출 코드를 해제합니다.

- `src/components/BookingForm.jsx` — 예약 트랜잭션
- `src/components/ActiveRental.jsx` — 정산 트랜잭션
- `src/components/RegisterVehicle.jsx` — NFT 발행 트랜잭션

---

## 프로젝트 구조

```
src/
├── components/
│   ├── Layout.jsx            # 공통 레이아웃 (헤더 + 사이드바)
│   ├── WalletConnect.jsx     # MetaMask 연결/해제
│   ├── VehicleList.jsx       # 차량 목록 그리드
│   ├── VehicleCard.jsx       # 개별 차량 카드
│   ├── BookingForm.jsx       # 예약 + W-KRW 결제
│   ├── ActiveRental.jsx      # 운행 중 + 정산
│   ├── RegisterVehicle.jsx   # NFT 발행 (호스트)
│   └── TransactionLog.jsx    # 터미널 스타일 TX 로그
├── contracts/
│   ├── CarSharing.json       # ← ABI + 주소 여기에 입력
│   └── VehicleNFT.json       # ← ABI + 주소 여기에 입력
├── hooks/
│   ├── useWallet.js          # MetaMask 연결 상태 관리
│   └── useContract.js        # 컨트랙트 인스턴스 훅
├── utils/
│   └── kaia.js               # Kaia 테스트넷 설정 + 유틸 함수
├── styles/
│   └── theme.js              # 디자인 시스템 (색상, 폰트, 그림자)
└── App.js                    # 페이지 라우팅 + 전역 상태
```

---

## 기술 스택

- **프레임워크**: React 18 (Create React App)
- **블록체인**: ethers.js v6
- **네트워크**: Kaia Kairos 테스트넷 (Chain ID: 1001)
- **지갑**: MetaMask
- **스타일링**: styled-components (사이버펑크 네온 그린 테마)
- **폰트**: Noto Sans KR + Space Mono

---

## Kaia Kairos 테스트넷 설정

MetaMask에 수동으로 추가하려면:

| 항목 | 값 |
|------|----|
| 네트워크 이름 | Kaia Kairos Testnet |
| RPC URL | `https://public-en-kairos.node.kaia.io` |
| Chain ID | `1001` |
| 심볼 | `KAIA` |
| 블록 익스플로러 | `https://kairos.kaiascan.io` |

> 앱에서 MetaMask 연결 버튼을 클릭하면 네트워크가 **자동으로 추가/전환** 됩니다.

---

## 라이선스

MIT
