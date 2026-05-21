import { ethers } from 'ethers';

export const KAIA_KAIROS = {
  chainId: '0x3E9',         // 1001 in hex
  chainIdDecimal: 1001,
  chainName: 'Kaia Kairos Testnet',
  nativeCurrency: {
    name: 'KAIA',
    symbol: 'KAIA',
    decimals: 18,
  },
  rpcUrls: ['https://public-en-kairos.node.kaia.io'],
  blockExplorerUrls: ['https://kairos.kaiascan.io'],
};

// MetaMask에 Kaia Kairos 네트워크가 없으면 자동으로 추가 후 전환
export async function switchToKairos() {
  if (!window.ethereum) throw new Error('MetaMask가 설치되어 있지 않습니다.');

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: KAIA_KAIROS.chainId }],
    });
  } catch (err) {
    // 4902: 네트워크가 MetaMask에 없을 때
    if (err.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [KAIA_KAIROS],
      });
    } else {
      throw err;
    }
  }
}

// ethers v6 BrowserProvider 인스턴스 반환
export function getProvider() {
  if (!window.ethereum) throw new Error('MetaMask가 설치되어 있지 않습니다.');
  return new ethers.BrowserProvider(window.ethereum);
}

// 주소를 0x1234...abcd 형식으로 축약
export function shortenAddress(address) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Wei → KAIA 단위 변환 (소수점 4자리)
export function formatKaia(wei) {
  return parseFloat(ethers.formatEther(wei)).toFixed(4);
}

// W-KRW 토큰 단위 변환 (decimals 18 기준, 소수점 2자리)
export function formatWKRW(amount, decimals = 18) {
  return parseFloat(ethers.formatUnits(amount, decimals)).toFixed(2);
}
