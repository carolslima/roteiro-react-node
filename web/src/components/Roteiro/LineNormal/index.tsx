import React, { useCallback, useRef, memo, FormEvent } from 'react';
import { FormHandles } from '@unform/core';

import Buttons from './Buttons';
import Input from './Input';
import Select from './Select';
import CounterTime from '../CounterTime';

import { MaterialProps, SignalProps } from '../../../dtos'

import { Positions, Types } from '../../../utils/selectOptionsMaterial';

import { Container, FormWeb } from './styles';

interface Props {
  material: MaterialProps;
  setMaterials: React.Dispatch<React.SetStateAction<MaterialProps[]>>;
  signals: SignalProps[];
  counterTime: number;
  setCounterTime: Function;
  handleChange: Function;
  handleDelete: Function;
  setOffline: React.Dispatch<React.SetStateAction<boolean>>;
  materialCreatedSetAndSave: Function;
  saveInStorageForTryAgainLaterWhenOffline: Function;
}

const LineNormal: React.FC<Props> = ({
  material,
  setMaterials,
  signals,
  handleChange,
  counterTime,
  setCounterTime,
  handleDelete,
  setOffline,
  materialCreatedSetAndSave,
  saveInStorageForTryAgainLaterWhenOffline,
}) => {
  const formRef = useRef<FormHandles>(null);

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
        <FormWeb ref={formRef} initialData={material} onSubmit={() => {}}>

          <Buttons
            locked={material.status}
            trashDisabled={['PT', 'VH'].includes(material.type)}
            material={material}
            setMaterials={setMaterials}
            handleChange={handleChange}
            handleDelete={handleDelete}
            signals={signals}
            types={Types}
            positions={Positions}
            setOffline={setOffline}
            materialCreatedSetAndSave={materialCreatedSetAndSave}
            saveInStorageForTryAgainLaterWhenOffline={saveInStorageForTryAgainLaterWhenOffline}
          />

          <Input
            name="cm"
            placeholder="CM"
            className="center"
            totalLength={6}
            onBlur={(e: FormEvent<HTMLInputElement>) => handleChange(material.id, "cm", e.currentTarget.value)}
            id={`cm-${material.id}`}
            include={material.include}
          />

          <Input
            name="title"
            placeholder="Título"
            onBlur={(e: FormEvent<HTMLInputElement>) => handleChange(material.id, "title", e.currentTarget.value.toUpperCase())}
            id={`title-${material.id}`}
            include={material.include}
          />

          <Input
            name="duration"
            placeholder="Duração"
            className="center"
            onBlur={(e: FormEvent<HTMLInputElement>) => handleChange(material.id, "duration", e.currentTarget.value)}
            totalLength={3}
            id={`duration-${material.id}`}
            include={material.include}
          />

          <Select
            name="type"
            onChange={(e: FormEvent<HTMLSelectElement>) => handleChange(material.id, "type", e.currentTarget.value.toUpperCase())}
            options={Types}
            include={material.include}
          />

          <Input
            name="client"
            placeholder="Cliente"
            onBlur={(e: FormEvent<HTMLInputElement>) => handleChange(material.id, "client", e.currentTarget.value.toUpperCase())}
            id={`client-${material.id}`}
            include={material.include}
          />

          <Select
            name="signal_id"
            onChange={(e: FormEvent<HTMLSelectElement>) => handleChange(material.id, "signal_id", e.currentTarget.value)}
            options={signals}
            include={material.include}
          />

          <Select
            name="position"
            onChange={(e: FormEvent<HTMLSelectElement>) => handleChange(material.id, "position", e.currentTarget.value)}
            options={Positions}
            include={material.include}
          />

          <Input
            placeholder="Programa"
            onBlur={(e: FormEvent<HTMLInputElement>) => handleChange(material.id, "program", e.currentTarget.value.toUpperCase())}
            name="program"
            id={`program-${material.id}`}
            include={material.include}
          />

          <div>
            {material.status && (
              <CounterTime
                duration={material.duration}
                counterTime={counterTime}
                setCounterTime={setCounterTime}
              />
            )}
          </div>

        </FormWeb>
      </Container>
  )
}

export default memo(LineNormal);
