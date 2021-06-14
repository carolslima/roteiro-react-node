import React, { useState, Fragment, useCallback } from 'react';
import { useFetch } from '../../hooks/useFetch';

import { useToast } from '../../hooks/toast';

import { MdAccessTime } from 'react-icons/md';

import api from '../../services/apiClient';

import Header from '../../components/Header';
import HeaderWrapper from '../../components/Checklist/HeaderWrapper';
import FormChecklist from '../../components/Checklist/FormChecklist';

import { MaterialProps } from '../../dtos';

import { ChecklistPrograms } from '../../utils/selectOptionsMaterial';

import {
  Container,
  HeaderChecklist,
  Scroll,
  CheckSend,
  Select,
  Button,
} from './styles';

const Checklist: React.FC = () => {
  const { addToast } = useToast();
  const [selectedDate] = useState(new Date());
  const { data, error } = useFetch<MaterialProps[]>('checklist', { params: {
    year: selectedDate.getFullYear(),
    month: selectedDate.getMonth() + 1,
    day: selectedDate.getDate(),
  } });
  const [checklistSelected, setChecklistSelected] = useState([]);
  const [programToDisplay, setProgramToDisplay] = useState('');

  const handleSubmit = useCallback(() => {
    if (checklistSelected && programToDisplay) {
      api.post('checklist', { checklistSelected, programToDisplay });

      addToast({
        type: 'success',
        title: 'Checklist enviado',
        description: 'Checklist enviado com sucesso.',
      });
    } else {
      addToast({
        type: 'error',
        title: 'Erro checklist',
        description: 'Erro ao tentar enviar checklist.',
      });
    }

  }, [addToast, checklistSelected, programToDisplay]);

  return (
    <>
      <Header />
      <Container>
        <HeaderWrapper />

        <ul>
          <HeaderChecklist>
            <div>#</div>
            <div>Programa</div>
            <div>
              <MdAccessTime size={20} color="#006497" />
            </div>
            <div className="center">Horário Aprox.</div>
            <div>Observações</div>
          </HeaderChecklist>

          <Scroll>

            {!error && !data && <p>Carregando...</p>}
            {!error && data?.length === 0 && (<p>Nenhum material cadastrado nesta data...</p>)}
            {error && (<p>Ocorreu um erro ao tentar carregar a lista de materiais, verifique sua conexão...</p>)}

            {data?.map((material) => (
              <Fragment key={material.id}>
                {material.status && (
                  <FormChecklist
                    material={material}
                    checklistSelected={checklistSelected}
                    setChecklistSelected={setChecklistSelected}
                  />
                )}
              </Fragment>
            ))}
          </Scroll>
          {!!data?.length && !!checklistSelected.length && (
            <CheckSend>
              <Select
                value={programToDisplay}
                onChange={(e) => setProgramToDisplay(e.target.value)}
                name="program"
              >
                <option value="" disabled hidden>Selecione uma opção</option>
                {ChecklistPrograms.map(option => {
                  return  <option
                            key={`${option.id.replace(/\s/g, '')}`}
                            value={option.id}
                          >
                            {option.name}
                          </option>
                })}
              </Select>

              {programToDisplay && programToDisplay !== '' && (
                <Button type="button" onClick={handleSubmit}>
                  Enviar Cheklist
                </Button>
              )}
            </CheckSend>
          )}
        </ul>
      </Container>
    </>
  );
}

export default Checklist;
