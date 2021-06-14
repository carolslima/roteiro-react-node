import styled, { keyframes } from 'styled-components';
import { FiCamera } from "react-icons/fi";


export const Container = styled.div`
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -21px auto 0;
  width: 100%;
  max-width: 700px;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${appearFromRight} 1s;
  form {
    margin: 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
`;

export const AvatarInput = styled.div`
  margin: 50px 0 2px 0;
  position: relative;
  align-self: center;
`;

export const Avatar = styled.img`
  width: 166px;
  height: 166px;
  border: 1px solid var(--color-blue);
  border-radius: 50%;
`;

export const AvatarChange = styled.label`
  position: absolute;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 0;
  background: var(--color-blue);
  right: 0;
  bottom: 0;
  transition: background-color 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: var(--color-blue);
  }
`;

export const AvatarChangeIcon = styled(FiCamera)`
  width: 20px;
  height: 20px;
  color: var(--color-white);
`;

export const File = styled.input`
  display: none;
`;

export const Title = styled.h1`
  margin-bottom: 11px;
  font-size: 16px;
  text-align: left;
  color: var(--color-blue);
`;
