import styled, { css } from 'styled-components';

interface ContainerProps {
  status?: boolean;
}

const userDisabled = {
  disabled: css`
    div > input, div > select {
      color: var(--color-input-disabled);
      font-style: italic;
      text-decoration:line-through;
    }
  `,
};

export const Container = styled.li<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 3.125;

  width: 100%;
  margin: 0;
  font-size: 1.2rem;

  border-bottom: 1px solid var(--color-gray-light);
  border-radius: 0.4rem;

  .center {
    justify-content: center;
    align-items: center;
    align-self: center;
    text-align: center;
  }

  .lower-case {
    text-transform: lowercase;
  }

  .capitalize {
    text-transform: capitalize;
  }

  background: var(--color-line-background-default);

  ${(props) => props.status && userDisabled['disabled']}

  form {
    display: grid;
    grid-template-columns: 10rem 1fr 1fr 1fr 1fr 8rem 12rem 5rem 12rem;
    width: 100%;
  }
`;

export const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.9rem;
  width: 100%;
`;

export const Avatar = styled.img`
  height: 33px;
  width: 33px;
  border: 1px solid var(--color-blue);
  border-radius: 50%;
`;

export const CreatedAt = styled.div`
  justify-content: center;
  align-items: center;
  align-self: center;
  text-align: center;
  margin-left: -2rem;
  color: var(--color-blue);
`;
