import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Form } from '@unform/web';

export const Container = styled.li`
  display: flex;
  width: 100%;
  margin: 0;
  font-size: 1.2rem;
`;

export const Scroll = styled(PerfectScrollbar)`
  width: 100%;
  max-height: 80vh;
  border-radius: 4px;
`;

export const FormWeb = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Columns = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px 0 0 0;
  width: 100%;
  justify-content: left;
  align-items: left;
`;

export const Label = styled.label`
  flex-wrap: nowrap;
  width: 100%;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-blue);
  justify-content: left;
  align-items: left;
`;

export const TimeLine = styled.button`
  font-family: 'Roboto Slab';
  background: var(--color-blue);
  height: 56px;
  border: 0;
  color: var(--color-white-lighter);
  border-radius: 10px;
  width: 50%;
  padding: 0 16px;
  font-weight: 500;
  margin-bottom: 16px;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;
