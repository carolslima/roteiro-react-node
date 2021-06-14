import styled, { css } from 'styled-components';
import { MdClose } from 'react-icons/md';

export const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
	height: 60px;
	margin: 0 auto;
	border-radius: 50%;
	text-align: center;
	border: 3px solid var(--color-red);
`;

export const IconAlert = styled(MdClose)`
  color: var(--color-red);
  width: 46px;
  height: 46px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  font-size: 23px;
  font-weight: 500;
  color: var(--color-gray);
  margin-top: 15px;
  margin-bottom: 25px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  width: 100%;
  color: var(--color-blue);
  font-size: 15px;
`;

export const ButtonsGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

interface ButtonProps {
  color?: 'red' | 'gray';
}

const buttonColorVariations = {
  red: css`
    background: var(--color-red);
    color: var(--color-white);
  `,
  gray: css`
    background: var(--color-gray-light);
    color: var(--color-black);
  `,
};

export const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  margin: 5px;
  padding: 10px;

  ${(props) => buttonColorVariations[props.color || 'gray']}

  border: 0;
  border-radius: 4px;

  transition: background 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;
