import styled from 'styled-components';
import { MdClose } from "react-icons/md";

interface IFullScreen {
  open: boolean;
}

export const FullScreen = styled.div<IFullScreen>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.7);
  display: ${(props) => (props.open ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  z-index: 99;

  animation: fadeModal 380ms ease-in-out 1;

  @keyframes fadeIn {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
    to {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 600px;
  max-height: 96%;
  max-width: 95%;

  padding: 20px;

  background-color: var(--color-white-lighter);
  border-radius: 8px;

  animation: slideIn 350ms cubic-bezier(0.42, 0, 0.21, 1) 1;

  @keyframes slideIn {
    from {
      transform: translateY(-120px);
      opacity: 0;
    }
    25% {
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  color: #c4c4c4;

  h2 {
    color: #fff;
    margin-bottom: 21px;
    color: var(--color-blue);
    padding: 0 10px 10px 10px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.div`
  color: #fff;
  color: var(--color-blue);
  font-size: 21px;
  font-weight: 500;
  left: 20px;
`;

export const Close = styled.button`
  cursor: pointer;
  align-self: flex-end;

  margin-bottom: 24px;

  color: var(--color-blue);

  background: transparent;
  border: 0;

  font-size: 16px;

  &:hover {
    opacity: 0.9;
  }
`;

export const IconClose = styled(MdClose)`
  width: 19px;
  height: 19px;
  color: var(--color-blue);
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
