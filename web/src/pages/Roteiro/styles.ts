import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 98%;
  margin: 0 auto;
`;

export const HeaderList = styled.div`
  display: grid;
  grid-template-columns: 14rem 7rem 1fr 4.2rem 4.8rem 1fr 8rem 4.8rem 1fr 3rem 6rem;
  flex-direction: row;

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  font-size: 12px;
  font-weight: 500;
  color: var(--color-blue);

  background: var(--color-header-list);

  height: 40px;
  width: 100%;
  margin: 0;
  padding: 10px;

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
