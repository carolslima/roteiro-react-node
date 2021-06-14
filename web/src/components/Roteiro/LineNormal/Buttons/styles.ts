import styled, { css } from 'styled-components';
import { Form } from '@unform/web';
import {
  MdPlaylistAdd,
  MdLockOutline,
  MdLockOpen,
  MdDeleteSweep,
  MdInfoOutline
} from 'react-icons/md';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
`;

interface ButtonProps {
  color?: 'green' | 'orange' | 'red' | 'blue' | 'gray' | 'default';
}

const buttonColorVariations = {
  green: css`
    background: var(--color-green-dark);
  `,
  orange: css`
    background: var(--color-orange-light);
  `,
  red: css`
    background: var(--color-red);
  `,
  blue: css`
    background: var(--color-blue);
  `,
  gray: css`
    background: var(--color-white-lighter);
  `,
  default: css`
    background: var(--color-gray-light);
    cursor: not-allowed;
  `,
};

export const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  margin: 5px 0;
  padding: 1px;

  width: 33px;
  height: 33px;

  ${(props) => buttonColorVariations[props.color || 'default']}

  border: 0;
  border-radius: 4px;

  transition: background 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const iconCSS = css`
  width: 19px;
  height: 19px;
  fill: var(--color-white-lighter);
  &:hover,
  &.active {
    fill: var(--color-white);
  }
`;

export const IconAddMaterial = styled(MdPlaylistAdd)`
  ${iconCSS}
`;

export const IconLocked = styled(MdLockOutline)`
  ${iconCSS}
`;

export const IconUnlocked = styled(MdLockOpen)`
  ${iconCSS}
  fill: var(--color-orange);
`;

export const IconTrashOn = styled(MdDeleteSweep)`
  ${iconCSS}
`;

export const IconTrashOff = styled(MdDeleteSweep)`
  ${iconCSS}
`;

export const IconInfo = styled(MdInfoOutline)`
  ${iconCSS}
`;

export const FormWeb = styled(Form)`
  width: 100%;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 36px;
`;

export const Title = styled.div`
  width: 100%;
  color: var(--color-black);

  font-size: 14px;
  font-weight: 500;
`;

export const Description = styled.div`
  width: 100%;
  color: var(--color-blue);

  font-size: 14px;
`;

