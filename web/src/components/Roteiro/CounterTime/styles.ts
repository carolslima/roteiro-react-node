import styled, { css } from 'styled-components';
import { MdAddAlarm, MdAlarmOff } from 'react-icons/md';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  margin: 5px 0;
  padding: 3px;

  width: 33px;
  height: 33px;

  background: var(--color-button-background);

  border: 0;
  border-radius: 4px;

  transition: background 0.2s;

  &:hover {
    background: var(--color-button-background-hover);
  }
`;

const iconCSS = css`
  width: 19px;
  height: 19px;
`;

export const IconAddAlarm = styled(MdAddAlarm)`
  ${iconCSS}
  color: var(--color-green);
`;

export const IconAlarmOff = styled(MdAlarmOff)`
  ${iconCSS}
  color: var(--color-red);
`;
