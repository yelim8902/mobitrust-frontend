import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import VehicleCard from './VehicleCard';

// TODO: 컨트랙트 연결 후 아래 목업 데이터를 실제 contract.getCars() 호출로 교체
const MOCK_VEHICLES = [
  { id: 1, name: '현대 아이오닉 5',  location: '서울 강남구', pricePerHour: 15000, status: 'available', emoji: '🚗' },
  { id: 2, name: '기아 EV6',         location: '서울 마포구', pricePerHour: 18000, status: 'available', emoji: '🚙' },
  { id: 3, name: '테슬라 모델 3',    location: '서울 송파구', pricePerHour: 25000, status: 'rented',    emoji: '🚘' },
  { id: 4, name: 'BMW iX3',          location: '서울 강서구', pricePerHour: 30000, status: 'available', emoji: '🚕' },
  { id: 5, name: '볼보 EX40',        location: '경기 성남시', pricePerHour: 22000, status: 'available', emoji: '🚐' },
  { id: 6, name: '포르쉐 타이칸',    location: '서울 용산구', pricePerHour: 55000, status: 'rented',    emoji: '🏎️' },
];

const Wrapper = styled.div``;

const PageHeader = styled.div`
  margin-bottom: 28px;
`;

const PageTitle = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: 6px;

  span {
    color: ${theme.colors.neon};
    text-shadow: ${theme.shadows.neonGlowText};
  }
`;

const PageSubtitle = styled.p`
  color: ${theme.colors.textDim};
  font-size: 14px;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  max-width: 260px;
  padding: 8px 16px;
  background: ${theme.colors.bgInput};
  border: 1px solid ${theme.colors.borderDim};
  border-radius: 20px;
  color: ${theme.colors.text};
  font-family: ${theme.fonts.body};
  font-size: 13px;
  outline: none;
  transition: ${theme.transitions.fast};

  &::placeholder { color: ${theme.colors.textDim}; }
  &:focus { border-color: ${theme.colors.neon}; }
`;

const FilterButton = styled.button`
  padding: 7px 16px;
  background: ${props => props.$active ? theme.colors.neonFaint : 'transparent'};
  border: 1px solid ${props => props.$active ? theme.colors.neon : theme.colors.borderDim};
  color: ${props => props.$active ? theme.colors.neon : theme.colors.textDim};
  font-family: ${theme.fonts.body};
  font-size: 13px;
  border-radius: 20px;
  cursor: pointer;
  transition: ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.neon};
    color: ${theme.colors.neon};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 20px;
`;

const Empty = styled.div`
  padding: 60px 20px;
  text-align: center;
  color: ${theme.colors.textDim};
  font-size: 14px;
  grid-column: 1 / -1;
`;

export default function VehicleList({ onSelect }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = MOCK_VEHICLES
    .filter(v => filter === 'all' || v.status === filter)
    .filter(v => v.name.toLowerCase().includes(search.toLowerCase()) || v.location.includes(search));

  const availableCount = MOCK_VEHICLES.filter(v => v.status === 'available').length;

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>차량 <span>목록</span></PageTitle>
        <PageSubtitle>현재 {availableCount}대의 차량이 대여 가능합니다.</PageSubtitle>
      </PageHeader>

      <FilterRow>
        <SearchInput
          placeholder="차량명 또는 지역 검색..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {[
          { key: 'all',       label: '전체' },
          { key: 'available', label: '대여 가능' },
          { key: 'rented',    label: '대여 중' },
        ].map(f => (
          <FilterButton key={f.key} $active={filter === f.key} onClick={() => setFilter(f.key)}>
            {f.label}
          </FilterButton>
        ))}
      </FilterRow>

      <Grid>
        {filtered.length === 0
          ? <Empty>검색 결과가 없습니다.</Empty>
          : filtered.map(v => <VehicleCard key={v.id} vehicle={v} onSelect={onSelect} />)
        }
      </Grid>
    </Wrapper>
  );
}
