import React, { memo } from 'react';

import { MdSearch } from 'react-icons/md';

import HeaderWrapperButton from '../../HeaderWrapperButton';

import {
  Container,
  UserIcon,
  Left,
  Center,
  Right,
  InputSearch,
  ButtonSearch,
} from './styles';

interface RoteiroProps {
  setAddUserModal: Function;
}

const HeaderWrapper: React.FC<RoteiroProps> = ({
  setAddUserModal,
}) => {

  return (
    <Container>
        <Left>
          <HeaderWrapperButton onClick={() => setAddUserModal(true)}>
            <UserIcon /> Adicionar
          </HeaderWrapperButton>
        </Left>

        <Center/>

        <Right>
          <InputSearch type="text" placeholder="Buscar..." />
          <ButtonSearch type="button" className="btn-search">
            <MdSearch size={23} color="#006497" />
          </ButtonSearch>
        </Right>
    </Container>
  );
}

export default memo(HeaderWrapper);
