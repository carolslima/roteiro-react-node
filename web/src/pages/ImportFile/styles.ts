import styled from 'styled-components';
import DatePicker from 'react-datepicker';

export const Container = styled.div`
  display: flex;
  justify-content: center;

  width: 98%;
  margin: 0 auto;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 30px;

  background: var(--color-white-lighter);
  border-radius: 2px;
  border: 0;
  padding: 30px;

  -webkit-box-shadow: var(--color-box-shadow);
  -moz-box-shadow: var(--color-box-shadow);
  box-shadow: var(--color-box-shadow);

  input {
    background: var(--color-input-background);
    border: 0;
    border-radius: 4px;
    height: 44px;
    width: 100%;
    padding: 6px;
    color: var(--color-blue);
    margin: 6px 0 10px;

    &::placeholder {
      color: var(--color-blue);
    }

    &:focus {
      border: 1px solid var(--color-blue);
    }
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 62.5rem var(--color-white-lighter) inset !important;
    -webkit-text-fill-color: var(--color-blue-lighter) !important;
  }

  span {
    color: var(--color-red);
    margin: 0 0 0.5px;
    font-size: 6px;
    text-align: left;
  }
`;

export const Calendar = styled(DatePicker)``;

export const Title = styled.h3`
  color: var(--color-blue);
  padding: 0 0.5px 0.5px 0.5px;
  margin-bottom: 0.5px;
`;

export const Description = styled.strong`
  color: var(--color-blue);
  margin-bottom: 12px;
  font-weight: 500;
  font-size: 12px;
  text-align: left;
`;
