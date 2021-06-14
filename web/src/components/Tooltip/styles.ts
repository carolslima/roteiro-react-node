import styled from 'styled-components';

export const Container = styled.div`
  z-index: 1;
  position: relative;

  span {
    width: 16rem;
    background: #006497;
    padding: 0.8rem;
    border-radius: 0.4rem;
    font-size: 1rem;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 1.2rem);
    left: 50%;
    transform: translate(-50%);

    color: #e5f0f5;

    &::before {
      content: '';
      position: absolute;
      border-style: solid;
      border-color: #006497 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
