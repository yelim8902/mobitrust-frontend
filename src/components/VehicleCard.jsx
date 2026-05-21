import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const Card = styled.div`
  background: ${theme.colors.bgCard};
  border: 1px solid ${props => props.$available ? theme.colors.borderDim : 'rgba(80,80,80,0.2)'};
  border-radius: ${theme.borderRadius.lg};
  padding: 20px;
  cursor: ${props => props.$available ? 'pointer' : 'default'};
  transition: ${theme.transitions.normal};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: ${props => props.$available
      ? 'linear-gradient(90deg, transparent, rgba(0,255,136,0.4), transparent)'
      : 'transparent'};
    transition: ${theme.transitions.normal};
  }

  &:hover {
    ${props => props.$available && `
      border-color: ${theme.colors.neon};
      box-shadow: ${theme.shadows.cardHover};
      transform: translateY(-3px);
    `}
  }
`;

const EmojiArea = styled.div`
  height: 110px;
  background: linear-gradient(135deg, #111 0%, #0d0d0d 100%);
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 52px;
  margin-bottom: 16px;
  border: 1px solid ${theme.colors.borderDim};
`;

const StatusBadge = styled.span`
  position: absolute;
  top: 16px; right: 16px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-family: ${theme.fonts.mono};
  font-weight: 700;
  background: ${props => props.$available ? 'rgba(0,255,136,0.08)' : 'rgba(80,80,80,0.12)'};
  border: 1px solid ${props => props.$available ? theme.colors.neon : '#444'};
  color: ${props => props.$available ? theme.colors.neon : '#555'};
`;

const Name = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: 5px;
`;

const Location = styled.p`
  font-size: 12px;
  color: ${theme.colors.textDim};
  margin-bottom: 14px;
`;

const Divider = styled.div`
  height: 1px;
  background: ${theme.colors.borderDim};
  margin: 12px 0;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 14px;
`;

const Price = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 20px;
  font-weight: 700;
  color: ${theme.colors.neon};
  text-shadow: ${theme.shadows.neonGlowText};
`;

const Unit = styled.span`
  font-size: 11px;
  color: ${theme.colors.textDim};
`;

const BookButton = styled.button`
  width: 100%;
  padding: 10px;
  background: transparent;
  border: 1px solid ${props => props.$available ? theme.colors.neon : '#2a2a2a'};
  color: ${props => props.$available ? theme.colors.neon : '#444'};
  font-family: ${theme.fonts.body};
  font-size: 14px;
  font-weight: 700;
  border-radius: ${theme.borderRadius.md};
  cursor: ${props => props.$available ? 'pointer' : 'not-allowed'};
  transition: ${theme.transitions.normal};

  &:hover {
    ${props => props.$available && `
      background: ${theme.colors.neon};
      color: #000;
      box-shadow: ${theme.shadows.neonGlow};
    `}
  }
`;

export default function VehicleCard({ vehicle, onSelect }) {
  const available = vehicle.status === 'available';

  return (
    <Card $available={available} onClick={() => available && onSelect(vehicle)}>
      <StatusBadge $available={available}>
        {available ? '● AVAILABLE' : '● RENTED'}
      </StatusBadge>

      <EmojiArea>{vehicle.emoji}</EmojiArea>
      <Name>{vehicle.name}</Name>
      <Location>📍 {vehicle.location}</Location>
      <Divider />
      <PriceRow>
        <Price>{vehicle.pricePerHour.toLocaleString()}</Price>
        <Unit>W-KRW / 시간</Unit>
      </PriceRow>
      <BookButton $available={available}>
        {available ? '예약하기 →' : '대여 중'}
      </BookButton>
    </Card>
  );
}
