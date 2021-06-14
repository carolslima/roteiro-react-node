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

export const InputSearch = styled.input`
  background: var(--color-input-background);
  color: var(--color-blue);
  width: 200px;
  height: 36px;
  padding: 0 10px;

  border: 1px solid var(--color-blue);
  border-radius: 4px;

  font-size: 12px;
  text-transform: uppercase;

  &::placeholder {
    color: var(--color-blue);
  }

  &:focus {
    background: var(--color-white);
  }
`;

export const ButtonSearch = styled.button`
  height: 36px;
  padding: 3px 8px;
  margin: 0 0 0 3px;
  outline: 0;

  background: var(--color-button-background);
  color: var(--color-blue);

  border: 1px solid var(--color-blue);
  border-radius: 4px;

  transition: background-color 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const ButtonArrowRight = styled.button`
  border: 0;
  background: none;
`;

export const TitleDate = styled.strong`
  flex: auto;
  color: var(--color-blue);
  font-size: 16px;
  text-align: center;
  margin-bottom: 4px;
`;

export const ButtonArrowLeft = styled.button`
  border: 0;
  background: none;
`;
