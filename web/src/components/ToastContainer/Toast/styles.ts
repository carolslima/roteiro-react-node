import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'success' | 'error' | 'info';
  hasdescription: number;
}

const toastTypeVariations = {
  info: css`
    background: var(--color-toast-info);
    color: var(--color-white-lighter);
  `,
  success: css`
    background: var(--color-toast-success);
    color: var(--color-white-lighter);
  `,
  error: css`
    background: var(--color-toast-error);
    color: var(--color-white-lighter);
  `,
};

export const Container = styled(animated.div) <ContainerProps>`
  width: 36rem;

  position: relative;
  padding: 1.6rem 3rem 1.6rem 1.6rem;
  border-radius: 1rem;
  box-shadow: var(--color-box-shadow);

  display: flex;
  z-index: 1;

  & + div {
    margin-top: 0.8rem;
  }

  ${(props) => toastTypeVariations[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 0.4rem;
      font-size: 1.4rem;
      opacity: 0.8rem;
      line-height: 2rem;
    }
  }

  button {
    position: absolute;
    right: 1.6rem;
    top: 1.9rem;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${(props) =>
    !props.hasdescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
