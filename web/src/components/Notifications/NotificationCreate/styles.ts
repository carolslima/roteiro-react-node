import styled, { css } from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Form } from '@unform/web';

export const FormWeb = styled(Form)`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  width: 100%;
  height: 50vh;
  max-height: 70vh;

  div {
    display: flex;
    flex-direction: row;
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  background: var(--color-input-background);
  border-radius: 4px;
  padding: 15px;

  width: 100%;
  min-height: 110px;
  max-height: 300px;
`;

interface NotificationProps {
  unread: boolean;
}

export const Notification = styled.div<NotificationProps>`
  color: var(--color-gray);

  & + div {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(150, 194, 214, 0.8);
  }

  p {
    font-size: 13px;
    line-height: 18px;
    margin-bottom: 5px;

    strong {
      width: 9px;
      height: 9px;
      border-radius: 3px;
      padding: 2px 3px 2px 5px;
      margin-right: 4px;
    }
  }

  time {
    display: block;
    font-size: 12px;
    opacity: 0.6;
  }

  button {
    font-size: 11px;
    border: 0;
    background: none;
    color: var(--color-blue);
    opacity: 0.8;
  }

  ${(props) =>
    props.unread &&
    css`
      &::after {
        display: inline-block;
        margin-left: -4px;
        width: 9px;
        height: 9px;
        background: var(--color-notification);
        content: '';
        border-radius: 50%;
        margin-left: 10px;
      }
    `}
`;

export const Columns = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px 0;
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
