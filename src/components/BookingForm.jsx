import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';
import { useContract } from '../hooks/useContract';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const Wrapper = styled.div`max-width: 600px;`;

const PageTitle = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: 28px;
  span { color: ${theme.colors.neon}; text-shadow: ${theme.shadows.neonGlowText}; }
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

const VehicleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const VehicleEmoji = styled.div`
  font-size: 38px;
  width: 68px;
  height: 68px;
  background: #111;
  border: 1px solid ${theme.colors.borderDim};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const FormGroup = styled.div`margin-bottom: 14px;`;

const Label = styled.label`
  display: block;
  font-size: 12px;
  color: ${theme.colors.textDim};
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  background: ${theme.colors.bgInput};
  border: 1px solid ${theme.colors.borderDim};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  font-family: ${theme.fonts.body};
  font-size: 14px;
  outline: none;
  transition: ${theme.transitions.fast};
  color-scheme: dark;

  &:focus {
    border-color: ${theme.colors.neon};
    box-shadow: 0 0 0 2px rgba(0,255,136,0.08);
  }
`;

const PriceSummary = styled.div`
  background: ${theme.colors.neonFaint};
  border: 1px solid ${theme.colors.borderDim};
  border-radius: ${theme.borderRadius.md};
  padding: 16px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 8px;
  &:last-child { margin-bottom: 0; }
`;

const PriceLabel = styled.span`color: ${theme.colors.textDim};`;
const PriceValue = styled.span`
  font-family: ${theme.fonts.mono};
  color: ${props => props.$highlight ? theme.colors.neon : theme.colors.text};
  font-weight: ${props => props.$highlight ? 700 : 400};
  font-size: ${props => props.$highlight ? '16px' : '13px'};
  text-shadow: ${props => props.$highlight ? theme.shadows.neonGlowText : 'none'};
`;

const Divider = styled.div`
  height: 1px;
  background: ${theme.colors.borderDim};
  margin: 10px 0;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: transparent;
  border: 1px solid ${props => props.disabled ? '#2a2a2a' : theme.colors.neon};
  color: ${props => props.disabled ? '#444' : theme.colors.neon};
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
  margin-top: 4px;

  &:hover:not(:disabled) {
    background: ${theme.colors.neon};
    color: #000;
    box-shadow: ${theme.shadows.neonGlowHover};
  }
`;

const Spinner = styled.div`
  width: 16px; height: 16px;
  border: 2px solid rgba(0,255,136,0.2);
  border-top-color: ${theme.colors.neon};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const ErrorMsg = styled.p`
  color: #ff4455;
  font-size: 12px;
  margin-top: 10px;
  font-family: ${theme.fonts.mono};
`;

export default function BookingForm({ vehicle, wallet, addTxLog, onSuccess }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate]     = useState('');
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const { getCarSharing }         = useContract();

  if (!vehicle) {
    return (
      <Wrapper>
        <PageTitle>차량을 먼저 <span>선택</span>해주세요.</PageTitle>
      </Wrapper>
    );
  }

  const hours = startDate && endDate
    ? Math.max(0, (new Date(endDate) - new Date(startDate)) / 3600000)
    : 0;
  const totalHours = Math.ceil(hours);
  const total = totalHours * vehicle.pricePerHour;

  const handleBook = async () => {
    if (!wallet.isConnected)    { setError('MetaMask를 먼저 연결해주세요.'); return; }
    if (!wallet.isCorrectChain) { setError('Kaia Kairos 테스트넷으로 전환해주세요.'); return; }
    if (!startDate || !endDate || hours <= 0) { setError('대여 시간을 올바르게 입력해주세요.'); return; }

    setLoading(true);
    setError('');

    try {
      // TODO: CarSharing.json ABI 설정 후 아래 주석을 해제하세요
      // const contract = await getCarSharing(true);
      // const startEpoch = Math.floor(new Date(startDate).getTime() / 1000);
      // const endEpoch   = Math.floor(new Date(endDate).getTime() / 1000);
      // const tx = await contract.reserve(vehicle.address, startEpoch, endEpoch);
      // addTxLog({ type: 'RESERVE', message: `${vehicle.name} 예약 요청`, status: 'pending' });
      // await tx.wait();

      await new Promise(r => setTimeout(r, 1500));
      addTxLog({ type: 'RESERVE', message: `${vehicle.name} 예약 완료 (${totalHours}시간)`, status: 'success' });
      onSuccess({ vehicle, startDate, endDate, total });
    } catch (err) {
      const msg = err.reason || err.message || '트랜잭션 실패';
      setError(msg);
      addTxLog({ type: 'RESERVE', message: msg, status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <PageTitle>차량 <span>예약</span></PageTitle>

      <Card>
        <SectionLabel>선택된 차량</SectionLabel>
        <VehicleInfo>
          <VehicleEmoji>{vehicle.emoji}</VehicleEmoji>
          <div>
            <p style={{ fontSize: 17, fontWeight: 700, color: theme.colors.text, marginBottom: 4 }}>{vehicle.name}</p>
            <p style={{ fontSize: 13, color: theme.colors.textDim, marginBottom: 2 }}>📍 {vehicle.location}</p>
            <p style={{ fontSize: 13, color: theme.colors.textDim }}>
              💰 <span style={{ fontFamily: theme.fonts.mono, color: theme.colors.neon }}>{vehicle.pricePerHour.toLocaleString()}</span> W-KRW / 시간
            </p>
          </div>
        </VehicleInfo>
      </Card>

      <Card>
        <SectionLabel>대여 기간</SectionLabel>
        <FormGroup>
          <Label>대여 시작</Label>
          <Input type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </FormGroup>
        <FormGroup style={{ marginBottom: 0 }}>
          <Label>반납 시간</Label>
          <Input type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)} min={startDate} />
        </FormGroup>
      </Card>

      <Card>
        <SectionLabel>결제 요약</SectionLabel>
        <PriceSummary>
          <PriceRow>
            <PriceLabel>대여 시간</PriceLabel>
            <PriceValue>{totalHours > 0 ? `${totalHours}시간` : '-'}</PriceValue>
          </PriceRow>
          <PriceRow>
            <PriceLabel>시간당 요금</PriceLabel>
            <PriceValue>{vehicle.pricePerHour.toLocaleString()} W-KRW</PriceValue>
          </PriceRow>
          <Divider />
          <PriceRow>
            <PriceLabel>총 결제 금액</PriceLabel>
            <PriceValue $highlight>{total > 0 ? `${total.toLocaleString()} W-KRW` : '-'}</PriceValue>
          </PriceRow>
        </PriceSummary>
      </Card>

      <SubmitButton onClick={handleBook} disabled={loading || total <= 0}>
        {loading
          ? <><Spinner /> 트랜잭션 처리 중...</>
          : `${total > 0 ? total.toLocaleString() + ' W-KRW ' : ''}결제 및 예약 확정`
        }
      </SubmitButton>
      {error && <ErrorMsg>⚠ {error}</ErrorMsg>}
    </Wrapper>
  );
}
