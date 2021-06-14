import styled from 'styled-components';

export const Container = styled.div`
  background: transparent;
  width: 100%;

  border: 0;
  color: var(--color-input-text);

  display: flex;
  align-items: center;
  padding: 0.6rem;

  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: var(--color-input-text);
    width: 100%;
    font-size: 1.2rem;
    text-transform: uppercase;
    padding: 8px;
    border-radius: 4px;

    &::placeholder {
      color: var(--color-input-placeholder);
    }

    &:focus {
      border: 1px solid var(--color-blue);
    }
  }
`;
