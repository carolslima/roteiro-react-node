import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { FiTv } from 'react-icons/fi';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 98%;
  margin: 0 auto;
`;

export const HeaderList = styled.div`
  display: grid;
  grid-template-columns: 10rem 1fr 1fr 1fr 1fr 8rem 12rem 5rem 12rem;
  flex-direction: row;

  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;

  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-blue);

  background: var(--color-header-list);

  height: 4rem;
  width: 100%;
  margin: 0;
  padding: 1rem;

  div {
    text-align: center;
    align-items: center;
    align-self: center;
    justify-content: center;

    button {
      border: 0;
      background: transparent;
    }
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 75vh;
  border-radius: 4px;
`;

export const Content = styled.div`
  -webkit-box-shadow: var(--color-box-shadow);
  -moz-box-shadow: var(--color-box-shadow);
  box-shadow: var(--color-box-shadow);

  border-radius: 4px;
`;

export const LineNormal = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const ProviderIcon = styled(FiTv)`
  margin-right: 5px;
  color: var(--color-blue);
  width: 20px;
  height: 20px;
`;
