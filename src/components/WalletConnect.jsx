import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';
import { shortenAddress } from '../utils/kaia';

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 8px rgba(0, 255, 136, 0.4); }
  50%       { box-shadow: 0 0 20px rgba(0, 255, 136, 0.9), 0 0 40px rgba(0, 255, 136, 0.4); }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ConnectButton = styled.button`
  padding: 8px 20px;
  background: transparent;
  border: 1px solid ${theme.colors.neon};
  color: ${theme.colors.neon};
  font-family: ${theme.fonts.mono};
  font-size: 13px;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: ${theme.transitions.normal};
  animation: ${props => props.$connecting ? pulse : 'none'} 1s ease-in-out infinite;

  &:hover:not(:disabled) {
    background: ${theme.colors.neon};
    color: #000;
    box-shadow: ${theme.shadows.neonGlow};
  }

  &:disabled { cursor: not-allowed; }
`;

const AccountBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: ${theme.colors.neonFaint};
  border: 1px solid ${theme.colors.borderDim};
  border-radius: ${theme.borderRadius.md};
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${theme.colors.neon};
  box-shadow: 0 0 8px ${theme.colors.neon};
`;

const Address = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  color: ${theme.colors.neon};
`;

const Balance = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  color: ${theme.colors.textDim};
`;

const DisconnectButton = styled.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid ${theme.colors.borderDim};
  color: ${theme.colors.textDim};
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  transition: ${theme.transitions.fast};

  &:hover {
    border-color: #ff4455;
    color: #ff4455;
  }
`;

export default function WalletConnect({ wallet }) {
  const { account, balance, status, isConnected, connect, disconnect } = wallet;

  if (isConnected) {
    return (
      <Wrapper>
        <AccountBadge>
          <Dot />
          <Address>{shortenAddress(account)}</Address>
          {balance && <Balance>| {balance} KAIA</Balance>}
        </AccountBadge>
        <DisconnectButton onClick={disconnect}>해제</DisconnectButton>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ConnectButton
        $connecting={status === 'connecting' ? 1 : 0}
        onClick={connect}
        disabled={status === 'connecting'}
      >
        {status === 'connecting' ? '연결 중...' : 'MetaMask 연결'}
      </ConnectButton>
    </Wrapper>
  );
}
