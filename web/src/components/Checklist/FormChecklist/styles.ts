import styled from 'styled-components';

interface MaterialProps {
  selected: boolean;
}

export const Material = styled.li<MaterialProps>`
  display: grid;
  grid-template-columns: 60px 1fr 100px 100px 1fr;
  flex-direction: row;
  align-items: center;

  height: 4.5rem;
  width: 100%;

  font-size: 1.2rem;

  border-bottom: 1px solid var(--color-gray-light);
  border-radius: 0.4rem;
  border-left: 4px solid transparent;
  border-left: ${props => props.selected && '4px solid var(--color-orange)'};

  background: var(--color-line-background-swa);

  div:last-child {
    margin: 0 10px;
  }

  .checkbox {
    width: 20px;
    height: 20px;
  }

  .uppercase {
    text-transform: uppercase;
  }

  input {
    flex: 1;
    border: 0;
    background: var(--color-input-background);
    color: var(--color-input-text);
    width: 100%;
    font-size: 1.3rem;
    padding: 8px;
    border-radius: 4px;

    &::placeholder {
      color: var(--color-input-placeholder);
    }

    &:focus {
      border: 1px solid var(--color-blue);
    }
  }

  input.disabled {
    background-color: transparent;
    font-weight: 500;
  }

  .center {
    text-align: center;
  }

  .lowercase {
    text-transform: lowercase;
  }
`;
