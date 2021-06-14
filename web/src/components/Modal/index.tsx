import React from 'react';

import {
  FullScreen,
  Container,
  Header,
  Title,
  Close,
  IconClose,
  Content
} from './styles';

interface Props {
  open: boolean;
  setOpen: (newValue: boolean) => void;
  title: string;
}

export const Modal: React.FC<Props> = ({
  open,
  setOpen,
  title,
  children,
  ...props
}) => {
  return (
    <FullScreen open={open}>

      <Container {...props} title={title}>

        <Header>
          <Title>{title}</Title>
          <Close onClick={() => setOpen(false)}>
            <IconClose />
          </Close>
        </Header>

        <Content>
          {children}
        </Content>

      </Container>

    </FullScreen>
  );
};

export default Modal;
