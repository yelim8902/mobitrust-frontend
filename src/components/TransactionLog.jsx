import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Panel = styled.div`
  margin-left: 220px;
  background: ${theme.colors.bgTerminal};
  border-top: 1px solid ${theme.colors.borderDim};
  font-family: ${theme.fonts.mono};
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: ${props => props.$open ? `1px solid ${theme.colors.borderDim}` : 'none'};
  cursor: pointer;
  user-select: none;

  &:hover { background: rgba(0, 255, 136, 0.02); }
`;

const Title = styled.span`
  color: ${theme.colors.neon};
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Cursor = styled.span`
  animation: ${blink} 1s step-end infinite;
`;

const Badge = styled.span`
  background: ${theme.colors.neonFaint};
  border: 1px solid ${theme.colors.borderDim};
  color: ${theme.colors.neon};
  font-size: 10px;
  padding: 1px 7px;
  border-radius: 10px;
`;

const Toggle = styled.span`
  color: ${theme.colors.textDim};
  font-size: 11px;
`;

const LogList = styled.div`
  max-height: 180px;
  overflow-y: auto;
  padding: 6px 0;
`;

const LogEntry = styled.div`
  display: grid;
  grid-template-columns: 80px 110px 1fr 90px;
  gap: 16px;
  padding: 5px 20px;
  font-size: 12px;
  animation: ${slideIn} 0.25s ease;

  &:hover { background: rgba(0, 255, 136, 0.02); }
`;

const Time    = styled.span`color: ${theme.colors.textDim};`;
const Type    = styled.span`color: #4fc3f7;`;
const Message = styled.span`color: ${theme.colors.text}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`;
const Status  = styled.span`
  text-align: right;
  color: ${props =>
    props.$s === 'success' ? theme.colors.neon :
    props.$s === 'error'   ? '#ff4455' : '#ffaa00'};
`;

const Empty = styled.div`
  padding: 14px 20px;
  color: ${theme.colors.textDim};
  font-size: 12px;
`;

export default function TransactionLog({ logs }) {
  const [open, setOpen] = useState(true);

  return (
    <Panel>
      <PanelHeader $open={open} onClick={() => setOpen(o => !o)}>
        <Title>
          <span style={{ color: theme.colors.neonDim }}>{'>'}</span>
          TX_LOG
          <Cursor>_</Cursor>
          {logs.length > 0 && <Badge>{logs.length}</Badge>}
        </Title>
        <Toggle>{open ? '▼ 닫기' : '▲ 열기'}</Toggle>
      </PanelHeader>

      {open && (
        <LogList>
          {logs.length === 0
            ? <Empty>{'// 트랜잭션 내역이 없습니다'}</Empty>
            : logs.map(log => (
              <LogEntry key={log.id}>
                <Time>{log.timestamp}</Time>
                <Type>[{log.type}]</Type>
                <Message>{log.message}</Message>
                <Status $s={log.status}>
                  {log.status === 'success' ? '✓ 완료' : log.status === 'error' ? '✗ 실패' : '⟳ 처리중'}
                </Status>
              </LogEntry>
            ))
          }
        </LogList>
      )}
    </Panel>
  );
}
