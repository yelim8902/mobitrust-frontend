import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const scanline = keyframes`
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

const glitch = keyframes`
  0%, 100% { text-shadow: ${theme.shadows.neonGlowText}; }
  25%       { text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; }
  50%       { text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
  75%       { text-shadow: ${theme.shadows.neonGlowText}; }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${theme.colors.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  font-family: ${theme.fonts.body};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${theme.colors.neon}, transparent);
    animation: ${scanline} 4s linear infinite;
    opacity: 0.15;
    pointer-events: none;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 56px;
  animation: ${fadeIn} 0.6s ease both;
`;

const Logo = styled.h1`
  font-family: ${theme.fonts.mono};
  font-size: 42px;
  font-weight: 700;
  color: ${theme.colors.neon};
  letter-spacing: 6px;
  animation: ${glitch} 6s ease-in-out infinite;
  margin-bottom: 12px;

  span { color: ${theme.colors.text}; }
`;

const Tagline = styled.p`
  color: ${theme.colors.textDim};
  font-size: 15px;
  letter-spacing: 1px;
`;

const Question = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: ${theme.colors.text};
  text-align: center;
  margin-bottom: 36px;
  animation: ${fadeIn} 0.6s 0.2s ease both;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  width: 100%;
  max-width: 720px;
  animation: ${fadeIn} 0.6s 0.4s ease both;
  opacity: 0;
  animation-fill-mode: forwards;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const RoleCard = styled.button`
  background: ${theme.colors.bgCard};
  border: 1px solid ${props => props.$hovered ? theme.colors.neon : theme.colors.borderDim};
  border-radius: ${theme.borderRadius.lg};
  padding: 36px 28px;
  cursor: pointer;
  text-align: left;
  transition: ${theme.transitions.normal};
  box-shadow: ${props => props.$hovered ? theme.shadows.cardHover : 'none'};
  transform: ${props => props.$hovered ? 'translateY(-4px)' : 'none'};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${theme.colors.neon}, transparent);
    opacity: ${props => props.$hovered ? 1 : 0};
    transition: opacity 0.3s ease;
  }
`;

const RoleEmoji = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
  line-height: 1;
`;

const RoleTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: 4px;
`;

const RoleSubtitle = styled.p`
  font-size: 13px;
  color: ${theme.colors.neon};
  font-family: ${theme.fonts.mono};
  margin-bottom: 20px;
  opacity: 0.8;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  font-size: 13px;
  color: ${theme.colors.textDim};
  padding: 5px 0;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '›';
    color: ${theme.colors.neon};
    font-size: 16px;
    line-height: 1;
  }
`;

const SelectButton = styled.div`
  margin-top: 24px;
  padding: 10px 0;
  text-align: center;
  border: 1px solid ${props => props.$hovered ? theme.colors.neon : theme.colors.borderDim};
  border-radius: ${theme.borderRadius.md};
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.$hovered ? theme.colors.neon : theme.colors.textDim};
  font-family: ${theme.fonts.mono};
  transition: ${theme.transitions.fast};
  background: ${props => props.$hovered ? theme.colors.neonFaint : 'transparent'};
`;

const ROLES = [
  {
    key: 'renter',
    emoji: '🚗',
    title: '이용자',
    subtitle: 'RENTER MODE',
    features: [
      '근처 차량 검색 및 예약',
      'W-KRW 스테이블코인 결제',
      'DAO 보험 선택 가입',
      '스마트컨트랙트 자동 정산',
      '운행 내역 블록체인 기록',
    ],
  },
  {
    key: 'host',
    emoji: '🏠',
    title: '호스트',
    subtitle: 'HOST MODE',
    features: [
      '차량 NFT 등록 및 관리',
      '대여 요금 직접 설정',
      '수익 실시간 정산 수령',
      '차량 이력 블록체인 기록',
      'DAO 거버넌스 참여',
    ],
  },
];

export default function OnboardingScreen({ onSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <Wrapper>
      <Header>
        <Logo>MOBI<span>TRUST</span></Logo>
        <Tagline>Blockchain P2P Car Sharing · Kaia Kairos Testnet</Tagline>
      </Header>

      <Question>어떤 서비스를 이용하실 건가요?</Question>

      <Cards>
        {ROLES.map(role => (
          <RoleCard
            key={role.key}
            $hovered={hovered === role.key}
            onMouseEnter={() => setHovered(role.key)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect(role.key)}
          >
            <RoleEmoji>{role.emoji}</RoleEmoji>
            <RoleTitle>{role.title}</RoleTitle>
            <RoleSubtitle>{role.subtitle}</RoleSubtitle>
            <FeatureList>
              {role.features.map(f => (
                <FeatureItem key={f}>{f}</FeatureItem>
              ))}
            </FeatureList>
            <SelectButton $hovered={hovered === role.key}>
              {role.title}로 시작하기 →
            </SelectButton>
          </RoleCard>
        ))}
      </Cards>
    </Wrapper>
  );
}
