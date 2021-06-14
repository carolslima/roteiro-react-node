import styled from 'styled-components';

export const Container = styled.header`
  display: grid;
  flex-direction: row;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  margin: 12px auto;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: flex-start;
`;

export const Center = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: flex-end;
`;

export const TitleDate = styled.strong`
  flex: auto;
  color: var(--color-blue);
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 0.4rem;
`;
