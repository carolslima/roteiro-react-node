import React, { useState, useCallback } from 'react';
import { mutate as mutateGlobal } from 'swr';
import { useFetch } from '../../hooks/useFetch';
import { addDays } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '../../services/apiClient';

import { Container, Content, Calendar, Title, Description } from './styles';

import { useToast } from '../../hooks/toast';

import Header from '../../components/Header';
import UploadDropZone from '../../components/ImportFile/UploadDropZone';
import UploadFileList from '../../components/ImportFile/UploadFileList';

import { FileProps } from '../../dtos';

const UploadFile: React.FC = () => {
  const { data, error, mutate } = useFetch<FileProps[]>('files');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { addToast } = useToast();

  const handleUpload = useCallback((file: any) => {
    const dateConvert = selectedDate.toISOString();
    const dataFile = new FormData();
    dataFile.append('file', file[0], file[0].name);
    dataFile.append('schedule', dateConvert);

    api.post("files", dataFile).then((response) => {
      addToast({
        type: 'success',
        title: 'Importar Arquivo',
        description: 'Material importado com sucesso.',
      });

      if (data) {
        const addFiles = [ { ...response.data }, ...data].reverse();

        mutate(addFiles, false);
      }
    })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Importar Arquivo',
          description: 'Ocorreu um erro, verifique o arquivo selecionado.',
        });
      });

      localStorage.removeItem(`@RoteiroWeb:materials`);

  }, [addToast, selectedDate, mutate, data])

  const handleDelete = useCallback((id: number) => {
    api.delete(`files/${id}`);

    const deleteFile = data?.filter(file => file.id !== id);

    addToast({
      type: 'success',
      title: 'Material Deletado',
      description: 'Material deletado com sucesso.',
    });

    localStorage.removeItem(`@RoteiroWeb:materials`);

    mutate(deleteFile, false)
    mutateGlobal(`files/${id}`, { id })
  }, [addToast, data, mutate]);

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Title>Importar Roteiro</Title>
          <Description>Selecione a data de exibição do material</Description>
          <Calendar
            name="date"
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            minDate={new Date()}
            maxDate={addDays(new Date(), 5)}
            placeholderText="Selecione uma data"
            dateFormat="dd' de 'MMMM' de 'yyyy"
            withPortal
            locale={ptBR}
          />

          {!!selectedDate && <UploadDropZone onUpload={handleUpload} />}

          {!data && <><p>Nenhum material cadastrado...</p></>}
          {!!error && <><p>Ocorreu um erro ao tentar carregar a lista de materiais, verifique sua conexão...</p></>}

          <UploadFileList files={data ? data : []} onDelete={handleDelete} />
        </Content>
      </Container>
    </>
  );
}

export default UploadFile;
