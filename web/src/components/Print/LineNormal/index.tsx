import React, { useCallback, memo } from 'react';

import { MaterialProps } from '../../../dtos';

import { Container } from './styles';

interface Props {
  material: MaterialProps;
}

const LineNormal: React.FC<Props> = ({
  material,
}) => {
  const signalType = useCallback((type: string) => {
    switch (type) {
      case 'SAT': return 'sat';
      case 'SATSP': return 'satsp';
      case 'SWA': return 'swa';
      case 'FIBRA': return 'fibra';
      case 'NEXIO': return 'nexio';
      case 'ESTADO': return 'estado';
      case 'DEFAS': return 'defas';
      case 'FALTA': return 'falta';
      default: return 'default';
    }
  }, []);

  return (
      <Container
        type={signalType(material.signal.name)}
        status={!material.status}
        include={material.include}
      >
        <div>{material.cm}</div>
        <div>{material.title}</div>
        <div>{material.duration}</div>
        <div>{material.type}</div>
        <div>{material.client}</div>
        <div>{material.signal.name}</div>
        <div>{material.position}</div>
        <div>{material.program}</div>
      </Container>
  )
}

export default memo(LineNormal);
