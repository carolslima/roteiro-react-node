import React, { memo } from 'react';
import { Container, Left, Center, Right } from './styles';


const HeaderWrapper = () => {
  return (
    <Container>
        <Left />

        <Center />

        <Right />
    </Container>
  );
}

export default memo(HeaderWrapper);
