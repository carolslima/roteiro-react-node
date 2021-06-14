import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 8px;
  margin-right: 3px;

  color: ${(props) => props.color ? 'var(--color-white-lighter)' : 'var(--color-blue)'};

  font-family: 'Roboto Slab';
  font-weight: 400;

  background: ${(props) => props.color ? props.color : 'var(--color-button-background)'};

  height: 36px;
  width: 150px;

  border: 1px solid var(--color-blue);
  border-radius: 4px;

  transition: background-color 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;
