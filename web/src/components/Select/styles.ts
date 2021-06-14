import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: var(--color-input-background);
  width: 100%;
  border-radius: 1rem;

  border: 0.15rem solid var(--color-gray);
  color: var(--color-gray);

  display: flex;
  align-items: center;
  padding: 1.6rem;

  & + div {
    margin-top: 0.8rem;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border: 0.15rem solid var(--color-red);
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: var(--color-blue);
      border-color: var(--color-blue);
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: var(--color-blue);
    `}

  select {
    flex: 1;
    border: 0;
    background: transparent;
    color: var(--color-blue);
    cursor: pointer;

    &::placeholder {
      color: var(--color-gray);
    }
  }

  svg {
    margin-right: 1.6rem;
  }
`;

export const Error = styled(Tooltip)`
  height: 2rem;
  margin-left: 1.6rem;

  svg {
    margin: 0;
  }

  span {
    background: var(--color-red);
    color: var(--color-white);

    &::before {
      border-color: var(--color-red) transparent;
    }
  }
`;
