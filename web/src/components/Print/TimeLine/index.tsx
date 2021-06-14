import React, { memo } from 'react';

import { Container, Button, IconTimer } from './styles';

import { MaterialProps } from '../../../dtos';

interface Props {
  material: MaterialProps;
}

const TimeLine: React.FC<Props> = ({ material }) => {

  return (
    <Container>
        <div>
          <Button>
            <IconTimer />
            <span>Início</span>
          </Button>
          {material.time_start}
        </div>
        <div>
          <Button>
            <IconTimer />
            <span>Fim</span>
          </Button>
          {material.time_end}
        </div>
        <div>
          <Button>
            <IconTimer />
            <span>Duração</span>
          </Button>
          {material.time_duration}
        </div>
    </Container>
  );
}

export default memo(TimeLine);
