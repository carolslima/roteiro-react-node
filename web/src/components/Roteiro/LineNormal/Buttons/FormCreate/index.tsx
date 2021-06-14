import React, { useRef, useState, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import api from '../../../../../services/apiClient';
import * as Yup from 'yup';

import { useToast } from '../../../../../hooks/toast';

import getValidationErrors from '../../../../../utils/getValidationsErrors';

import {
  MaterialProps,
  SignalProps,
  TypesProps,
  PositionProps,
} from '../../../../../dtos';

import Button from '../../../../Button';
import Select from '../../../../Select';
import Input from '../../../../Input';
import Textarea from '../../../../Textarea';
import Checkbox from '../../../../Checkbox';

import { Container, FormWeb, Scroll, Columns, Label } from './styles';

interface Props {
  material: MaterialProps;
  setMaterials: React.Dispatch<React.SetStateAction<MaterialProps[]>>;
  types: TypesProps[];
  signals: SignalProps[];
  positions: PositionProps[];
  setAddMaterialModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOffline: React.Dispatch<React.SetStateAction<boolean>>;
  materialCreatedSetAndSave: Function;
  saveInStorageForTryAgainLaterWhenOffline: Function;
}

const FormCreate: React.FC<Props> = ({
  material,
  setMaterials,
  types,
  signals,
  positions,
  setAddMaterialModal,
  setOffline,
  materialCreatedSetAndSave,
  saveInStorageForTryAgainLaterWhenOffline,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [includeSelected, setIncludeSelected] = useState(true);

  const list_position = Number(material.list_position) + 0.1;
  const file_id = material.file_id;
  const schedule = material.schedule;

  const handleCreateTimeLine = useCallback(
    async () => {
      try {
        const response = await api.post('materials', {
          blank: true,
          schedule,
          list_position,
          file_id,
        });

        materialCreatedSetAndSave(response.data[0]);
        setAddMaterialModal(false);
        setLoading(false);
      } catch {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description: 'Erro ao tentar cadastrar linha de tempo, verifique sua conexão.',
        });

        saveInStorageForTryAgainLaterWhenOffline({
          blank: true,
          schedule,
          list_position,
          file_id,
        }, "createdOffline");

        setOffline(true);

        setLoading(false);
      }

    },
    [setAddMaterialModal, addToast, file_id, list_position, schedule, materialCreatedSetAndSave, saveInStorageForTryAgainLaterWhenOffline, setOffline],
  );

  const handleSubmit = useCallback(
    async (data: any, { reset }) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          cm: Yup.string().required('* O CM é obrigatório. '),
          title: Yup.string().required('* O título é obrigatório.'),
          duration: Yup.string().required('* A duração do material é obrigatória.'),
          signal_id: Yup.string().uuid().required('* O sinal é obrigatório.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post('materials', {
          cm: data.cm,
          title: data.title,
          duration: data.duration,
          type: data.type,
          client: data.client,
          signal_id: data.signal_id,
          position: data.position,
          program: data.program,
          include: data.include,
          details: data.details,
          schedule,
          list_position,
          file_id,
        });

        materialCreatedSetAndSave(response.data[0]);
        setAddMaterialModal(false);
        setLoading(false);
        reset();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          setLoading(false);

          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          saveInStorageForTryAgainLaterWhenOffline({
            cm: data.cm,
            title: data.title,
            duration: data.duration,
            type: data.type,
            client: data.client,
            signal_id: data.signal_id,
            position: data.position,
            program: data.program,
            include: data.include,
            details: data.details,
            schedule,
            list_position,
            file_id,
          }, "createdOffline");

          setOffline(true);
        }

        setLoading(false);
      }
    },
    [setAddMaterialModal, file_id, list_position, schedule, materialCreatedSetAndSave, saveInStorageForTryAgainLaterWhenOffline, setOffline],
  );

  return (
    <Container>
        <FormWeb ref={formRef} initialData={material} onSubmit={handleSubmit}>
          <Scroll>
            <Input name="cm" placeholder="Código do Material" />

            <Input name="title" placeholder="Título" />

            <Input name="duration" placeholder="Duração" />

            <Select
              name="type"
              options={types}
              placeholder="Tipo"
            />

            <Input name="client" placeholder="Cliente" />

            <Select
              name="signal_id"
              options={signals}
              placeholder="Sinal"
            />

            <Select
              name="position"
              options={positions}
              placeholder="Posição"
            />

            <Input name="program" placeholder="Programa" />

            <Textarea name="details" placeholder="Detalhes" />

            <Columns>
              <Label htmlFor="include">Este material está sendo incluído?</Label>
              <Checkbox
                name="include"
                checked={includeSelected}
                onChange={() => setIncludeSelected(!includeSelected)}
              />
            </Columns>

            <Button
              loading={loading}
              type="button"
              color="var(--color-gray-lighter)"
              onClick={handleCreateTimeLine}
            >
              Cadastrar linha de tempo
            </Button>

            <Button loading={loading} type="submit">
              Cadastrar
            </Button>
          </Scroll>
        </FormWeb>
    </Container>
  );
}

export default FormCreate;
