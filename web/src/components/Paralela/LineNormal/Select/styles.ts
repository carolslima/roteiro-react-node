import styled from 'styled-components';

export const Container = styled.div`
  background: transparent;
  width: 100%;

  border: 0;
  color: var(--color-input-text);

  display: flex;
  align-items: center;
  padding: 0.6rem;

  select {
    flex: 1;
    border: 0;
    background: transparent;
    color: var(--color-input-text);
    width: 100%;
    font-size: 1.2rem;

    &::placeholder {
      color: var(--color-input-placeholder);
    }
  }
`;
