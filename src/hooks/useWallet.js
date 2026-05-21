import { useState, useEffect, useCallback } from 'react';
import { switchToKairos, getProvider, formatKaia, KAIA_KAIROS } from '../utils/kaia';

export function useWallet() {
  const [account, setAccount]     = useState(null);   // 연결된 주소
  const [balance, setBalance]     = useState(null);   // KAIA 잔액
  const [chainId, setChainId]     = useState(null);   // 현재 체인 ID
  const [isCorrectChain, setIsCorrectChain] = useState(false);
  const [status, setStatus]       = useState('idle'); // idle | connecting | connected | error
  const [error, setError]         = useState(null);

  const isConnected = !!account;

  // 잔액 갱신
  const refreshBalance = useCallback(async (addr) => {
    try {
      const provider = getProvider();
      const raw = await provider.getBalance(addr);
      setBalance(formatKaia(raw));
    } catch {
      setBalance(null);
    }
  }, []);

  // 지갑 연결
  const connect = useCallback(async () => {
    if (!window.ethereum) {
      setError('MetaMask가 설치되어 있지 않습니다.');
      setStatus('error');
      return;
    }

    try {
      setStatus('connecting');
      setError(null);

      // Kaia Kairos 네트워크로 전환 (없으면 자동 추가)
      await switchToKairos();

      const provider = getProvider();
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();

      const network = await provider.getNetwork();
      const id = Number(network.chainId);

      setAccount(addr);
      setChainId(id);
      setIsCorrectChain(id === KAIA_KAIROS.chainIdDecimal);
      await refreshBalance(addr);
      setStatus('connected');
    } catch (err) {
      setError(err.message || '연결에 실패했습니다.');
      setStatus('error');
    }
  }, [refreshBalance]);

  // 지갑 해제
  const disconnect = useCallback(() => {
    setAccount(null);
    setBalance(null);
    setChainId(null);
    setIsCorrectChain(false);
    setStatus('idle');
    setError(null);
  }, []);

  // 계정 변경 / 체인 변경 / 연결 해제 감지
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        setAccount(accounts[0]);
        refreshBalance(accounts[0]);
      }
    };

    const handleChainChanged = (hexChainId) => {
      const id = parseInt(hexChainId, 16);
      setChainId(id);
      setIsCorrectChain(id === KAIA_KAIROS.chainIdDecimal);
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [disconnect, refreshBalance]);

  // 페이지 새로고침 시 이미 연결된 계정 복원
  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum
      .request({ method: 'eth_accounts' })
      .then(async (accounts) => {
        if (accounts.length > 0) {
          const provider = getProvider();
          const network = await provider.getNetwork();
          const id = Number(network.chainId);

          setAccount(accounts[0]);
          setChainId(id);
          setIsCorrectChain(id === KAIA_KAIROS.chainIdDecimal);
          await refreshBalance(accounts[0]);
          setStatus('connected');
        }
      })
      .catch(() => {});
  }, [refreshBalance]);

  return {
    account,
    balance,
    chainId,
    isConnected,
    isCorrectChain,
    status,
    error,
    connect,
    disconnect,
    refreshBalance: () => account && refreshBalance(account),
  };
}
