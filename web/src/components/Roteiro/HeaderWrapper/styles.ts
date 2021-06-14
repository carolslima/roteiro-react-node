import styled from 'styled-components';
import { FiWifiOff } from 'react-icons/fi';
import { VscFilePdf } from "react-icons/vsc";
import { Link } from 'react-router-dom';

export const Container = styled.header`
  display: grid;
  flex-direction: row;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  margin: 12px auto;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: flex-start;
`;

export const Center = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: flex-end;
`;

export const WifiOffIcon = styled(FiWifiOff)`
  margin-right: 5px;
  color: var(--color-white-lighter);
  width: 20px;
  height: 20px;
`;

export const PdfIcon = styled(VscFilePdf)`
  margin-right: 5px;
  color: var(--color-blue);
  width: 20px;
  height: 20px;
`;

export const LinkTop = styled(Link)`
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

  color: var(--color-blue);

  border: 1px solid var(--color-blue);
  border-radius: 4px;

  transition: background-color 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const InputSearch = styled.input`
  background: var(--color-input-background);
  color: var(--color-blue);
  width: 200px;
  height: 36px;
  padding: 0 10px;

  border: 1px solid var(--color-blue);
  border-radius: 4px;

  font-size: 12px;
  text-transform: uppercase;

  &::placeholder {
    color: var(--color-blue);
  }

  &:focus {
    background: var(--color-white);
  }
`;

export const ButtonSearch = styled.button`
  height: 36px;
  padding: 3px 8px;
  margin: 0 0 0 3px;
  outline: 0;

  background: var(--color-button-background);
  color: var(--color-blue);

  border: 1px solid var(--color-blue);
  border-radius: 4px;

  transition: background-color 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const ButtonArrowRight = styled.button`
  border: 0;
  background: none;
`;

export const TitleDate = styled.strong`
  flex: auto;
  color: var(--color-blue);
  font-size: 16px;
  text-align: center;
  margin-bottom: 4px;
`;

export const ButtonArrowLeft = styled.button`
  border: 0;
  background: none;
`;
