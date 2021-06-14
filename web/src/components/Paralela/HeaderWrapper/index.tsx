import React, { memo, useMemo } from 'react';
import { format, subDays, addDays } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { MdChevronLeft, MdChevronRight, MdSearch } from 'react-icons/md';

import {
  Container,
  Left,
  Center,
  Right,
  ButtonArrowLeft,
  TitleDate,
  ButtonArrowRight,
  InputSearch,
  ButtonSearch,
} from './styles';

interface Props {
  selectedDate: Date;
  handlePrevDay: Function;
  handleNextDay: Function;
}

const HeaderWrapper: React.FC<Props> = ({
  selectedDate,
  handlePrevDay,
  handleNextDay,
}) => {
  const dateFormatted = useMemo(
    () => format(selectedDate, "d 'de' MMMM", { locale: ptBR }),
    [selectedDate]
  );

  return (
    <Container>
        <Left />

        <Center>
          <ButtonArrowLeft>
            <MdChevronLeft
              size={36}
              color="var(--color-blue)"
              onClick={() => handlePrevDay(subDays(selectedDate, 1))}
            />
          </ButtonArrowLeft>

          <TitleDate>{dateFormatted}</TitleDate>

          <ButtonArrowRight>
            <MdChevronRight
              size={36}
              color="var(--color-blue)"
              onClick={() => handleNextDay(addDays(selectedDate, 1))}
            />
          </ButtonArrowRight>
        </Center>

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
