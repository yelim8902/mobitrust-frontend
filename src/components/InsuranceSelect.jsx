import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const PlanCard = styled.button`
  background: ${props => props.$selected ? theme.colors.neonFaint : '#111'};
  border: 1px solid ${props => props.$selected ? theme.colors.neon : theme.colors.borderDim};
  border-radius: ${theme.borderRadius.md};
  padding: 16px 14px;
  cursor: pointer;
  text-align: left;
  transition: ${theme.transitions.normal};
  box-shadow: ${props => props.$selected ? theme.shadows.neonGlow : 'none'};
  position: relative;

  &:hover {
    border-color: ${theme.colors.neon};
    background: ${theme.colors.neonFaint};
  }
`;

const SelectedMark = styled.div`
  position: absolute;
  top: 10px; right: 10px;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: ${theme.colors.neon};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #000;
  font-weight: 700;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.2s;
`;

const PlanIcon = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
`;

const PlanName = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: 3px;
`;

const PlanPrice = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 13px;
  color: ${props => props.$free ? theme.colors.textDim : theme.colors.neon};
  margin-bottom: 12px;
`;

const CoverageList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CoverageItem = styled.li`
  font-size: 11px;
  color: ${theme.colors.textDim};
  padding: 3px 0;
  display: flex;
  gap: 6px;
  line-height: 1.4;

  &::before {
    content: '·';
    color: ${theme.colors.neon};
    flex-shrink: 0;
  }
`;

const DAOBadge = styled.div`
  margin-top: 10px;
  padding: 3px 8px;
  background: rgba(0,255,136,0.06);
  border: 1px solid ${theme.colors.borderDim};
  border-radius: 10px;
  font-family: ${theme.fonts.mono};
  font-size: 9px;
  color: ${theme.colors.neon};
  display: inline-block;
  letter-spacing: 1px;
`;

const PLANS = [
  {
    key: 'none',
    icon: '🚫',
    name: '보험 없음',
    price: 0,
    priceLabel: '무료',
    coverage: [
      '보험 미적용',
      '사고 시 전액 자기 부담',
    ],
    dao: false,
  },
  {
    key: 'basic',
    icon: '🛡️',
    name: '기본 보험',
    price: 10000,
    priceLabel: '10,000 W-KRW',
    coverage: [
      '대인 최대 1억원 보장',
      '대물 최대 2,000만원',
      '자차손해 미포함',
    ],
    dao: true,
  },
  {
    key: 'premium',
    icon: '⭐',
    name: '프리미엄',
    price: 25000,
    priceLabel: '25,000 W-KRW',
    coverage: [
      '대인 무제한 보장',
      '대물 최대 5,000만원',
      '자차손해 포함',
      '긴급출동 서비스',
    ],
    dao: true,
  },
];

export default function InsuranceSelect({ selected, onChange }) {
  return (
    <Grid>
      {PLANS.map(plan => (
        <PlanCard
          key={plan.key}
          $selected={selected === plan.key}
          onClick={() => onChange(plan)}
        >
          <SelectedMark $visible={selected === plan.key}>✓</SelectedMark>
          <PlanIcon>{plan.icon}</PlanIcon>
          <PlanName>{plan.name}</PlanName>
          <PlanPrice $free={plan.price === 0}>{plan.priceLabel}</PlanPrice>
          <CoverageList>
            {plan.coverage.map(c => <CoverageItem key={c}>{c}</CoverageItem>)}
          </CoverageList>
          {plan.dao && <DAOBadge>DAO GOVERNED</DAOBadge>}
        </PlanCard>
      ))}
    </Grid>
  );
}

export { PLANS };
