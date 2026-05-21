import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Panel = styled.div`
  margin-left: 220px;
  background: ${theme.colors.bgTerminal};
  border-top: 1px solid ${theme.colors.borderDim};
  font-family: ${theme.fonts.body};
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: ${props => props.$open ? `1px solid ${theme.colors.borderDim}` : 'none'};
  cursor: pointer;
  user-select: none;

  &:hover { background: rgba(0, 255, 136, 0.02); }
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TitleText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.text};
`;

const Badge = styled.span`
  background: ${theme.colors.neonFaint};
  border: 1px solid ${theme.colors.borderDim};
  color: ${theme.colors.neon};
  font-size: 11px;
  padding: 1px 8px;
  border-radius: 10px;
  font-family: ${theme.fonts.mono};
`;

const Toggle = styled.span`
  color: ${theme.colors.textDim};
  font-size: 12px;
`;

const LogList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  padding: 4px 0;
`;

const LogEntry = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 20px;
  animation: ${slideIn} 0.25s ease;
  transition: background 0.15s;

  &:hover { background: rgba(0, 255, 136, 0.02); }
`;

const IconCircle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${props =>
    props.$s === 'success' ? 'rgba(0,255,136,0.1)' :
    props.$s === 'error'   ? 'rgba(255,68,85,0.1)' :
    'rgba(255,170,0,0.1)'};
  border: 1px solid ${props =>
    props.$s === 'success' ? 'rgba(0,255,136,0.3)' :
    props.$s === 'error'   ? 'rgba(255,68,85,0.3)' :
    'rgba(255,170,0,0.3)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  flex-shrink: 0;
`;

const LogBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const LogMessage = styled.p`
  font-size: 13px;
  color: ${theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 2px;
`;

const LogMeta = styled.p`
  font-size: 11px;
  color: ${theme.colors.textDim};
`;

const StatusText = styled.span`
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  color: ${props =>
    props.$s === 'success' ? theme.colors.neon :
    props.$s === 'error'   ? '#ff4455' : '#ffaa00'};
`;

const Empty = styled.div`
  padding: 20px;
  text-align: center;
  color: ${theme.colors.textDim};
  font-size: 13px;
`;

const TYPE_ICON = {
  '예약':    '📅',
  '정산':    '💸',
  'NFT 발행': '✨',
  '반납':    '🔑',
};

const STATUS_LABEL = {
  success: '완료',
  error:   '실패',
  pending: '처리 중',
};

export default function TransactionLog({ logs }) {
  const [open, setOpen] = useState(true);

  return (
    <Panel>
      <PanelHeader $open={open} onClick={() => setOpen(o => !o)}>
        <TitleArea>
          <TitleText>활동 내역</TitleText>
          {logs.length > 0 && <Badge>{logs.length}건</Badge>}
        </TitleArea>
        <Toggle>{open ? '▲ 접기' : '▼ 펼치기'}</Toggle>
      </PanelHeader>

      {open && (
        <LogList>
          {logs.length === 0 ? (
            <Empty>아직 활동 내역이 없어요.</Empty>
          ) : (
            logs.map(log => (
              <LogEntry key={log.id}>
                <IconCircle $s={log.status}>
                  {log.status === 'success'
                    ? (TYPE_ICON[log.type] || '✓')
                    : log.status === 'error' ? '✗' : '…'}
                </IconCircle>
                <LogBody>
                  <LogMessage>{log.message}</LogMessage>
                  <LogMeta>{log.timestamp} · {log.type}</LogMeta>
                </LogBody>
                <StatusText $s={log.status}>
                  {STATUS_LABEL[log.status]}
                </StatusText>
              </LogEntry>
            ))
          )}
        </LogList>
      )}
    </Panel>
  );
}
