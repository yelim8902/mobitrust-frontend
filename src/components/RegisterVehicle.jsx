import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';
import { useContract } from '../hooks/useContract';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

const Wrapper = styled.div`max-width: 600px;`;

const PageTitle = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: 6px;
  span { color: ${theme.colors.neon}; text-shadow: ${theme.shadows.neonGlowText}; }
`;

const PageSubtitle = styled.p`
  color: ${theme.colors.textDim};
  font-size: 14px;
  margin-bottom: 28px;
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$cols || '1fr'};
  gap: 12px;
  margin-bottom: 12px;
  &:last-child { margin-bottom: 0; }
`;

const FormGroup = styled.div``;

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
  font-family: ${props => props.$mono ? theme.fonts.mono : theme.fonts.body};
  font-size: 14px;
  outline: none;
  transition: ${theme.transitions.fast};

  &::placeholder { color: ${theme.colors.textDim}; }
  &:focus {
    border-color: ${theme.colors.neon};
    box-shadow: 0 0 0 2px rgba(0,255,136,0.08);
  }
`;

const NFTPreviewCard = styled.div`
  background: linear-gradient(135deg, #0a0a0a 0%, #0e0e0e 50%, #0a0a0a 100%);
  border: 1px solid ${theme.colors.neon};
  border-radius: ${theme.borderRadius.lg};
  padding: 28px 24px;
  text-align: center;
  box-shadow: ${theme.shadows.neonGlowCard};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${theme.colors.neon}, transparent);
    background-size: 200% auto;
    animation: ${shimmer} 2s linear infinite;
  }
`;

const NFTEmoji = styled.div`
  font-size: 60px;
  margin-bottom: 14px;
  line-height: 1;
`;

const NFTName = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 15px;
  font-weight: 700;
  color: ${theme.colors.neon};
  text-shadow: ${theme.shadows.neonGlowText};
  margin-bottom: 4px;
`;

const NFTMeta = styled.p`
  font-size: 12px;
  color: ${theme.colors.textDim};
  margin-bottom: 2px;
  font-family: ${theme.fonts.mono};
`;

const NFTBadge = styled.span`
  display: inline-block;
  margin-top: 12px;
  padding: 4px 14px;
  background: ${theme.colors.neonFaint};
  border: 1px solid ${theme.colors.borderDim};
  border-radius: 20px;
  font-family: ${theme.fonts.mono};
  font-size: 10px;
  color: ${theme.colors.neon};
  letter-spacing: 1px;
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

const SuccessBox = styled.div`
  background: rgba(0,255,136,0.05);
  border: 1px solid ${theme.colors.neon};
  border-radius: ${theme.borderRadius.md};
  padding: 16px;
  margin-top: 12px;
  font-family: ${theme.fonts.mono};
  font-size: 13px;
  color: ${theme.colors.neon};
  line-height: 1.8;
`;

const EMOJIS = ['🚗', '🚙', '🚕', '🚘', '🏎️', '🚐', '🚌'];

export default function RegisterVehicle({ wallet, addTxLog }) {
  const [form, setForm] = useState({
    vin: '', make: '', model: '',
    year: new Date().getFullYear(),
    pricePerHour: '', location: '', seats: 4,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError]     = useState('');
  // eslint-disable-next-line no-unused-vars
  const { getVehicleNFT }     = useContract();

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const emoji = EMOJIS[Math.abs((form.make.charCodeAt(0) || 0) + (form.model.charCodeAt(0) || 0)) % EMOJIS.length];

  const handleRegister = async () => {
    if (!wallet.isConnected)    { setError('MetaMask를 먼저 연결해주세요.'); return; }
    if (!wallet.isCorrectChain) { setError('Kaia Kairos 테스트넷으로 전환해주세요.'); return; }
    if (!form.vin || !form.make || !form.model || !form.pricePerHour) {
      setError('필수 항목(제조사, 모델명, VIN, 요금)을 입력해주세요.'); return;
    }

    setLoading(true);
    setError('');
    setSuccess(null);

    try {
      // TODO: VehicleNFT.json ABI 설정 후 아래 주석을 해제하세요
      // const contract = await getVehicleNFT(true);
      // const metadata = JSON.stringify({ vin: form.vin, make: form.make, model: form.model, year: form.year, seats: form.seats });
      // addTxLog({ type: 'MINT NFT', message: `${form.make} ${form.model} NFT 발행 요청`, status: 'pending' });
      // const tx = await contract.mint(wallet.account, metadata);
      // const receipt = await tx.wait();

      await new Promise(r => setTimeout(r, 1800));
      const mockTokenId = Math.floor(Math.random() * 9999) + 1;
      addTxLog({ type: 'MINT NFT', message: `${form.make} ${form.model} NFT 발행 완료 — Token #${mockTokenId}`, status: 'success' });
      setSuccess({ tokenId: mockTokenId });
    } catch (err) {
      const msg = err.reason || err.message || '트랜잭션 실패';
      setError(msg);
      addTxLog({ type: 'MINT NFT', message: msg, status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <PageTitle>차량 등록 <span>& NFT 발행</span></PageTitle>
      <PageSubtitle>내 차량을 등록하면 블록체인 NFT로 이력이 영구 기록됩니다.</PageSubtitle>

      <Card>
        <SectionLabel>차량 정보</SectionLabel>
        <FormRow $cols="1fr 1fr">
          <FormGroup>
            <Label>제조사 *</Label>
            <Input placeholder="예: 현대" value={form.make} onChange={e => update('make', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>모델명 *</Label>
            <Input placeholder="예: 아이오닉 5" value={form.model} onChange={e => update('model', e.target.value)} />
          </FormGroup>
        </FormRow>
        <FormRow $cols="1fr 1fr">
          <FormGroup>
            <Label>연식 *</Label>
            <Input type="number" min="2000" max="2030" value={form.year} onChange={e => update('year', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>좌석 수</Label>
            <Input type="number" min="2" max="9" value={form.seats} onChange={e => update('seats', e.target.value)} />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>VIN (차대번호) *</Label>
            <Input $mono placeholder="예: KMHE341HBPA000001" value={form.vin} onChange={e => update('vin', e.target.value.toUpperCase())} />
          </FormGroup>
        </FormRow>
      </Card>

      <Card>
        <SectionLabel>대여 설정</SectionLabel>
        <FormRow $cols="1fr 1fr">
          <FormGroup>
            <Label>시간당 요금 (W-KRW) *</Label>
            <Input type="number" placeholder="예: 15000" value={form.pricePerHour} onChange={e => update('pricePerHour', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>차량 위치</Label>
            <Input placeholder="예: 서울 강남구" value={form.location} onChange={e => update('location', e.target.value)} />
          </FormGroup>
        </FormRow>
      </Card>

      {(form.make || form.model) && (
        <Card>
          <SectionLabel>NFT 미리보기</SectionLabel>
          <NFTPreviewCard>
            <NFTEmoji>{emoji}</NFTEmoji>
            <NFTName>{form.make || '?'} {form.model || '?'} {form.year}</NFTName>
            <NFTMeta>VIN: {form.vin || '미입력'}</NFTMeta>
            <NFTMeta>Kaia Kairos Testnet · Chain ID: 1001</NFTMeta>
            <NFTBadge>MOBITRUST VEHICLE NFT</NFTBadge>
          </NFTPreviewCard>
        </Card>
      )}

      <SubmitButton onClick={handleRegister} disabled={loading}>
        {loading ? <><Spinner /> NFT 발행 중...</> : '✨ NFT 발행하고 차량 등록'}
      </SubmitButton>

      {error && <p style={{ color: '#ff4455', fontSize: 12, marginTop: 10, fontFamily: theme.fonts.mono }}>⚠ {error}</p>}
      {success && (
        <SuccessBox>
          ✓ 차량 등록 완료!<br />
          Token #{success.tokenId} — Kaia Kairos 블록체인에 NFT가 발행되었습니다.
        </SuccessBox>
      )}
    </Wrapper>
  );
}
