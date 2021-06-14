import React, { useCallback, memo } from 'react';

import { Container } from './styles'

import { MaterialProps } from '../../../dtos';

interface Props {
  material: MaterialProps;
  counterTime: number;
  setCounterTime: Function;
}

const LineNormal: React.FC<Props> = ({ material }) => {
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

        <div className="center">{material.cm}</div>
        <div>{material.title}</div>
        <div className="center">{material.duration}</div>
        <div className="center">{material.type}</div>
        <div>{material.client}</div>
        <div className="center">{material.signal.name}</div>
        <div className="center">{material.position}</div>
        <div>{material.program}</div>
      </Container>
  )
}

export default memo(LineNormal);
