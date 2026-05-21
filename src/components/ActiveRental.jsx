import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';
import { useContract } from '../hooks/useContract';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const Wrapper = styled.div`max-width: 600px;`;

const PageTitle = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: 24px;
  span { color: ${theme.colors.neon}; text-shadow: ${theme.shadows.neonGlowText}; }
`;

const ActiveBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(0,255,136,0.06);
  border: 1px solid ${theme.colors.neon};
  border-radius: 20px;
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  color: ${theme.colors.neon};
  margin-bottom: 24px;
`;

const PulseDot = styled.span`
  width: 8px; height: 8px;
  border-radius: 50%;
  background: ${theme.colors.neon};
  box-shadow: 0 0 8px ${theme.colors.neon};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const Card = styled.div`
  background: ${theme.colors.bgCard};
  border: 1px solid ${theme.colors.borderDim};
  border-radius: ${theme.borderRadius.lg};
  padding: 24px;
  margin-bottom: 16px;
`;

const SectionLabel = styled.h3`
  font-size: 11px;
  font-family: ${theme.fonts.mono};
  color: ${theme.colors.neon};
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
  opacity: 0.7;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const InfoItem = styled.div`
  background: #111;
  border: 1px solid ${theme.colors.borderDim};
  border-radius: ${theme.borderRadius.md};
  padding: 12px 14px;
`;

const InfoLabel = styled.p`
  font-size: 10px;
  color: ${theme.colors.textDim};
  font-family: ${theme.fonts.mono};
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const InfoValue = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.$neon ? theme.colors.neon : theme.colors.text};
  font-family: ${props => props.$mono ? theme.fonts.mono : theme.fonts.body};
  text-shadow: ${props => props.$neon ? theme.shadows.neonGlowText : 'none'};
`;

const TimerBox = styled.div`
  text-align: center;
  padding: 28px;
  background: #050505;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.borderDim};
  margin-bottom: 14px;
`;

const TimerLabel = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 10px;
  color: ${theme.colors.textDim};
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const TimerValue = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 44px;
  font-weight: 700;
  color: ${theme.colors.neon};
  text-shadow: ${theme.shadows.neonGlowText};
  letter-spacing: 6px;
`;

const EndButton = styled.button`
  width: 100%;
  padding: 15px;
  background: transparent;
  border: 1px solid ${props => props.disabled ? '#2a2a2a' : '#ff4455'};
  color: ${props => props.disabled ? '#444' : '#ff4455'};
  font-family: ${theme.fonts.body};
  font-size: 15px;
  font-weight: 700;
  border-radius: ${theme.borderRadius.md};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: ${theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover:not(:disabled) {
    background: rgba(255,68,85,0.08);
    box-shadow: 0 0 20px rgba(255,68,85,0.25);
  }
`;

const Spinner = styled.div`
  width: 16px; height: 16px;
  border: 2px solid rgba(255,68,85,0.2);
  border-top-color: #ff4455;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const NoRental = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: ${theme.colors.textDim};
`;

function useElapsed(startDate) {
  const [elapsed, setElapsed] = useState('00:00:00');
  useEffect(() => {
    if (!startDate) return;
    const tick = () => {
      const s = Math.max(0, Math.floor((Date.now() - new Date(startDate).getTime()) / 1000));
      const h = String(Math.floor(s / 3600)).padStart(2, '0');
      const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
      const sec = String(s % 60).padStart(2, '0');
      setElapsed(`${h}:${m}:${sec}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startDate]);
  return elapsed;
}

export default function ActiveRental({ rental, wallet, addTxLog, onEnd }) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const { getCarSharing }     = useContract();
  const elapsed               = useElapsed(rental?.startDate);

  if (!rental) {
    return (
      <Wrapper>
        <PageTitle>현재 <span>렌탈</span></PageTitle>
        <NoRental>
          <p style={{ fontSize: 40, marginBottom: 14 }}>🚗</p>
          <p>진행 중인 렌탈이 없습니다.</p>
        </NoRental>
      </Wrapper>
    );
  }

  const handleEnd = async () => {
    if (!wallet.isConnected) { setError('MetaMask를 먼저 연결해주세요.'); return; }
    setLoading(true);
    setError('');

    try {
      // TODO: CarSharing.json ABI 설정 후 아래 주석을 해제하세요
      // const contract = await getCarSharing(true);
      // const tx = await contract.checkout();
      // addTxLog({ type: 'CHECKOUT', message: '운행 종료 요청', status: 'pending' });
      // await tx.wait();

      await new Promise(r => setTimeout(r, 1500));
      addTxLog({ type: 'SETTLE', message: `${rental.vehicle.name} 정산 완료 — ${rental.total.toLocaleString()} W-KRW`, status: 'success' });
      onEnd();
    } catch (err) {
      const msg = err.reason || err.message || '트랜잭션 실패';
      setError(msg);
      addTxLog({ type: 'SETTLE', message: msg, status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <PageTitle>현재 <span>렌탈</span></PageTitle>

      <ActiveBadge>
        <PulseDot /> 운행 중
      </ActiveBadge>

      <Card>
        <SectionLabel>차량 정보</SectionLabel>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>차량</InfoLabel>
            <InfoValue>{rental.vehicle.emoji} {rental.vehicle.name}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>위치</InfoLabel>
            <InfoValue>📍 {rental.vehicle.location}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>대여 시작</InfoLabel>
            <InfoValue $mono style={{ fontSize: 11 }}>{new Date(rental.startDate).toLocaleString('ko-KR')}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>예정 반납</InfoLabel>
            <InfoValue $mono style={{ fontSize: 11 }}>{new Date(rental.endDate).toLocaleString('ko-KR')}</InfoValue>
          </InfoItem>
        </InfoGrid>
      </Card>

      <Card>
        <SectionLabel>경과 시간</SectionLabel>
        <TimerBox>
          <TimerLabel>elapsed time</TimerLabel>
          <TimerValue>{elapsed}</TimerValue>
        </TimerBox>
        <InfoItem>
          <InfoLabel>예상 결제 금액</InfoLabel>
          <InfoValue $neon style={{ fontSize: 20 }}>{rental.total.toLocaleString()} W-KRW</InfoValue>
        </InfoItem>
      </Card>

      <EndButton onClick={handleEnd} disabled={loading}>
        {loading ? <><Spinner /> 정산 처리 중...</> : '🔑 운행 종료 및 즉시 정산'}
      </EndButton>
      {error && <p style={{ color: '#ff4455', fontSize: 12, marginTop: 10, fontFamily: theme.fonts.mono }}>⚠ {error}</p>}
    </Wrapper>
  );
}
