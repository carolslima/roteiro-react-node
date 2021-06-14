import styled from 'styled-components';
import { MdTimer, MdClose } from 'react-icons/md';

export const Container = styled.li`
  display: flex;

  height: 4.5rem;
  width: 100%;

  padding: 0.5rem;
  border-bottom: 1px solid var(--color-gray-light);
  border-radius: 0.4rem;
  background: rgb(244, 246, 249);

  form {
    display: grid;
    grid-template-columns: 14rem 1fr 1fr 1fr;
    width: 100%;

    div {
      display: flex;
      align-items: center;
      align-self: center;

      input {
        align-items: center;
        align-self: center;
        width: 8rem;
        padding: 8px;
        background: transparent;
        color: var(--color-input-text);
        font-weight: 500;
        font-size: 1.4rem;
        border: 0;
        border-radius: 4px;

        &::placeholder {
          color: var(--color-input-placeholder);
        }

        &:focus {
          border: 1px solid var(--color-blue);
        }
      }
    }
  }
`;

export const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  background: var(--color-button-background);
  border: 1px solid var(--color-blue);
  border-radius: 4px;
  font-size: 1.3rem;
  color: var(--color-blue);
  padding: 0.5rem;
  width: 10rem;
  flex-shrink: 0;

  &:hover {
    background: var(--color-button-background-hover);
  }

  span {
    margin-left: 8px;
  }
`;

export const CloseButton = styled.button`
  justify-content: flex-start;
  background: transparent;
  margin: 0 0.5rem 0 1rem;
  padding: 0.3rem;
  border: 0;
  border-radius: 0.4rem;
  color: var(--color-white);
  transition: background 0.2s;
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
  }
`;

export const IconTimer = styled(MdTimer)`
  width: 21px;
  height: 21px;
  color: rgba(40, 167, 69, 1);
`;

export const IconDelete = styled(MdClose)`
  width: 21px;
  height: 21px;
  color: #6c6c6c;
`;
