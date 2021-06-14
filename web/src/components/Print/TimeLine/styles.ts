import styled from 'styled-components';
import { MdTimer } from 'react-icons/md';

export const Container = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  flex-direction: row;

  justify-content: center;
  align-items: center;
  align-self: center;
  text-align: center;

  height: 44px;
  width: 100%;

  padding: 0.5rem;
  border-bottom: 1px solid var(--color-gray-light);
  border-radius: 0.4rem;
  background: rgb(244, 246, 249);
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
  margin-right: 10px;

  &:hover {
    background: var(--color-button-background-hover);
  }

  span {
    margin-left: 8px;
  }
`;

export const IconTimer = styled(MdTimer)`
  width: 21px;
  height: 21px;
  color: rgba(40, 167, 69, 1);
`;
