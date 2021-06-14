import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }

  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromLeft} 0.7s;

  img {
    height: 15rem;
    width: auto;
  }

  form {
    margin: 8rem 0;
    width: 37.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      font-size: 2.4rem;
      margin-bottom: 2rem;
      color: var(--color-blue);
    }

    a {
      color: var(--color-white-lighter);
      margin-top: 2.4rem;
      transition: color 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  > a {
    color: var(--color-blue);
    display: flex;
    align-items: center;
    transition: color 0.2s;

    &:hover {
      opacity: 0.8;
    }

    svg {
      margin-right: 0.8rem;
    }
  }
`;
