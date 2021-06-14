import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
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
    margin: 3rem 0;
    width: 37.5rem;
    text-align: center;

    h2 {
      font-size: 2.4rem;
      margin-bottom: 2rem;
      color: var(--color-blue);
    }

    > a {
      color: var(--color-gray);
      display: block;
      margin-top: 2.4rem;
      text-decoration: none;
      transition: background-color 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  > a {
    color: var(--color-blue);
    display: block;
    margin-top: 2.4rem;
    text-decoration: none;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 1.6rem;
    }

    &:hover {
      opacity: 0.8;
    }
  }
`;
