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
  border: 0;
  width: 20rem;
  height: 3.3rem;
  padding: 0 1rem;
  border-radius: 0.4rem;

  font-size: 1.2rem;
  text-transform: uppercase;

  &::placeholder {
    color: var(--color-blue);
  }

  &:focus {
    background: var(--color-white);
  }
`;

export const ButtonSearch = styled.button`
  height: 35px;
  padding: 3px 8px;
  margin: 0 0 0 3px;
  outline: 0;

  background: var(--color-button-background);
  color: var(--color-blue);

  border: 1px solid var(--color-blue);
  border-radius: 4px;

  transition: background 0.2s;

  &:hover {
    background: var(--color-button-background-hover);
  }
`;

export const ButtonArrowRight = styled.button`
  border: 0;
  background: none;
`;

export const TitleDate = styled.strong`
  flex: auto;
  color: var(--color-white);
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 0.4rem;
`;

export const ButtonArrowLeft = styled.button`
  border: 0;
  background: none;
`;
