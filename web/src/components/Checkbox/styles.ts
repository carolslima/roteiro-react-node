import styled from 'styled-components';

export const Container = styled.div`
  background: transparent;
  width: 100%;

  border: 0;
  color: var(--color-input-text);

  display: flex;
  align-items: center;
  padding: 0.6rem;

  .checkbox {
    flex: 1;
    border: 0;
    border-radius: 4px;
    background: transparent;
    height: 9px;
    width: 9px;
    cursor: pointer;

    height: 16px;
    width: 16px;
    justify-content: flex-start;
    align-items: flex-start;
    cursor: pointer;

    &::placeholder {
      color: var(--color-input-placeholder);
    }

    &:focus {
      border: 1px solid var(--color-blue);
    }
  }
`;
