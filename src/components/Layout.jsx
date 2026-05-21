import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import WalletConnect from './WalletConnect';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${theme.colors.bg};
  font-family: ${theme.fonts.body};
`;

const Header = styled.header`
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 60px;
  background: #0d0d0d;
  border-bottom: 1px solid ${theme.colors.borderDim};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 100;
`;

const Logo = styled.div`
  font-family: ${theme.fonts.mono};
  font-size: 20px;
  font-weight: 700;
  color: ${theme.colors.neon};
  text-shadow: ${theme.shadows.neonGlowText};
  letter-spacing: 2px;
  cursor: pointer;

  span { color: ${theme.colors.text}; }
`;

const Sidebar = styled.aside`
  position: fixed;
  top: 60px; left: 0;
  width: 220px;
  height: calc(100vh - 60px);
  background: #0d0d0d;
  border-right: 1px solid ${theme.colors.borderDim};
  padding: 24px 0;
  z-index: 90;
  display: flex;
  flex-direction: column;
`;

const NavItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  background: ${props => props.$active ? theme.colors.neonFaint : 'transparent'};
  border: none;
  border-left: 3px solid ${props => props.$active ? theme.colors.neon : 'transparent'};
  color: ${props => props.$active ? theme.colors.neon : theme.colors.textDim};
  font-family: ${theme.fonts.body};
  font-size: 14px;
  font-weight: ${props => props.$active ? 700 : 400};
  text-align: left;
  cursor: pointer;
  transition: ${theme.transitions.normal};

  &:hover {
    background: ${theme.colors.neonFaint};
    color: ${theme.colors.neon};
    border-left-color: ${theme.colors.neonDim};
  }
`;

const NavIcon = styled.span`
  font-size: 18px;
  line-height: 1;
`;

const SidebarFooter = styled.div`
  margin-top: auto;
  padding: 16px 24px;
  border-top: 1px solid ${theme.colors.borderDim};
  font-family: ${theme.fonts.mono};
  font-size: 10px;
  color: ${theme.colors.textDim};
  line-height: 1.6;
`;

const Main = styled.main`
  margin-left: 220px;
  margin-top: 60px;
  padding: 32px;
  min-height: calc(100vh - 60px);
`;

const NetworkWarning = styled.div`
  background: rgba(255, 68, 85, 0.08);
  border: 1px solid #ff4455;
  color: #ff4455;
  padding: 10px 16px;
  border-radius: ${theme.borderRadius.md};
  font-size: 13px;
  font-family: ${theme.fonts.mono};
  margin-bottom: 24px;
`;

const NAV_ITEMS = [
  { key: 'vehicles', icon: '🚗', label: '차량 목록' },
  { key: 'book',     icon: '📅', label: '예약하기' },
  { key: 'active',   icon: '🔑', label: '현재 렌탈' },
  { key: 'register', icon: '✨', label: '차량 등록 (호스트)' },
];

export default function Layout({ wallet, currentPage, onNavigate, children }) {
  return (
    <Wrapper>
      <Header>
        <Logo onClick={() => onNavigate('vehicles')}>
          MOBI<span>TRUST</span>
        </Logo>
        <WalletConnect wallet={wallet} />
      </Header>

      <Sidebar>
        {NAV_ITEMS.map(item => (
          <NavItem
            key={item.key}
            $active={currentPage === item.key}
            onClick={() => onNavigate(item.key)}
          >
            <NavIcon>{item.icon}</NavIcon>
            {item.label}
          </NavItem>
        ))}
        <SidebarFooter>
          CHAIN: Kaia Kairos<br />
          ID: 1001<br />
          TOKEN: W-KRW
        </SidebarFooter>
      </Sidebar>

      <Main>
        {wallet.isConnected && !wallet.isCorrectChain && (
          <NetworkWarning>
            ⚠ Kaia Kairos 테스트넷(Chain ID: 1001)으로 전환해주세요. 현재 Chain ID: {wallet.chainId}
          </NetworkWarning>
        )}
        {children}
      </Main>
    </Wrapper>
  );
}
