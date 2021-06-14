import styled from 'styled-components';

export const Container = styled.div`
  background: var(--color-white);
  padding: 0 30px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  max-width: 100%;
  margin: 0 auto;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid var(--color-nav-top-border);

      height: 33px;
      width: auto;

      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50% 50%;
    }

    a {
      font-size: 14px;
      font-weight: bold;
      color: var(--color-blue);
      margin-left: 10px;
      padding-right: 10px;
      border-right: 1px solid var(--color-nav-top-border);
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid var(--color-nav-top-border);

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      font-size: 12px;
      color: var(--color-blue);
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 11px;
      color: var(--color-gray-lighter);
    }
  }

  img {
    height: 33px;
    width: 33px;
    border: 1px solid var(--color-blue);
    border-radius: 50%;
  }

  button {
    z-index: 99999;
    margin-left: 15px;
    border: 0;
    background: transparent;

    svg {
      color: var(--color-blue);
      height: 2rem;
      width: 2rem;
      margin-top: 0.7rem;
    }
  }
`;
