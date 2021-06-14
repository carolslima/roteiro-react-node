import styled, { css } from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Container = styled.div`
  position: relative;
`;

interface BadgeProps {
  hasUnread: boolean;
}

export const Badge = styled.div<BadgeProps>`
  background: none;
  border: 0;
  position: relative;

  ${(props) =>
    props.hasUnread &&
    css`
      &::after {
        position: absolute;
        right: 0;
        top: 0;
        width: 9px;
        height: 9px;
        background: var(--color-notification);
        content: '';
        border-radius: 50%;
      }
    `}
`;

interface NotificationListProps {
  visible: boolean;
}

export const NotificationList = styled.div<NotificationListProps>`
  z-index: 1;
  position: absolute;
  width: 360px;
  left: calc(50% - 220px);
  top: calc(100% + 13px);
  background: var(--color-input-background);
  border: 2px solid var(--color-blue);
  border-radius: 10px;
  padding: 15px 5px;
  display: ${(props) => (props.visible ? 'block' : 'none')};

  -webkit-box-shadow: var(--color-box-shadow);
  -moz-box-shadow: var(--color-box-shadow);
  box-shadow: var(--color-box-shadow);

  &::before {
    content: '';
    position: absolute;
    left: calc(50% + 20px);
    top: -20px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid var(--color-blue);
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 400px;
  padding: 5px 15px;
`;

interface NotificationProps {
  unread: boolean;
}

export const Notification = styled.div<NotificationProps>`
  color: var(--color-gray);

  & + div {
    margin-top: 15px;
    padding-top: 15px;
    /* border-top: 1px solid rgba(150, 194, 214, 0.8); */
    border-top: 1px solid var(--color-blue-light);
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

export const Button = styled.button`
  margin: 0;
  padding: 10px;
  height: 35px;

  font-size: 13px;
  font-weight: 500;

  background: var(--color-blue);
  color: var(--color-white);

  border: 0;
  border-radius: 4px;
  inline-size: -webkit-fill-available;

  &:hover {
    opacity: 0.8;
  }
`;
