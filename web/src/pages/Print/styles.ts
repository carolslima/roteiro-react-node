import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin: 0 auto;
`;

export const HeaderList = styled.div`
  display: grid;
  grid-template-columns: 7rem 1fr 4.8rem 4.8rem 1fr 12rem 4.8rem 1fr;
  flex-direction: row;

  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;

  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-blue);

  background: var(--color-header-list);

  height: 40px;
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
