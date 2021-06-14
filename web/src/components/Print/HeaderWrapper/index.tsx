import React, { memo, useMemo } from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {
  Container,
  Left,
  Center,
  Right,
  TitleDate,
} from './styles';

interface Props {
  selectedDate: Date;
}

const HeaderWrapper: React.FC<Props> = ({
  selectedDate,
}) => {
  const dateFormatted = useMemo(
    () => format(selectedDate, "d 'de' MMMM", { locale: ptBR }),
    [selectedDate]
  );

  return (
    <Container>
        <Left />

        <Center>
          <TitleDate>{dateFormatted}</TitleDate>
        </Center>

        <Right />
    </Container>
  );
}

export default memo(HeaderWrapper);
