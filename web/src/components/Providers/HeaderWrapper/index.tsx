import React, { memo } from 'react';

import { MdSearch } from 'react-icons/md';

import HeaderWrapperButton from '../../HeaderWrapperButton';

import {
  Container,
  ProviderIcon,
  Left,
  Center,
  Right,
  InputSearch,
  ButtonSearch,
} from './styles';

interface Props {
  setAddProviderModal: Function;
}

const HeaderWrapper: React.FC<Props> = ({ setAddProviderModal }) => {

  return (
    <Container>
        <Left>
          <HeaderWrapperButton onClick={() => setAddProviderModal(true)}>
            <ProviderIcon /> Adicionar
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
