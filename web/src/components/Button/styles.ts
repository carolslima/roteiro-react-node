import styled from 'styled-components';

export const Container = styled.button`
  font-family: 'Roboto Slab';
  background: ${props => props.color ? props.color : 'var(--color-blue)'};
  height: 56px;
  border: 0;
  color: var(--color-white-lighter);
  border-radius: 10px;
  width: 100%;
  padding: 0 16px;
  font-weight: 500;
  margin: 16px 0;
  transition: background-color 0.2s;

  & + button {
    margin-top: 0;
  }

  &:hover {
    opacity: 0.8;
  }
`;
