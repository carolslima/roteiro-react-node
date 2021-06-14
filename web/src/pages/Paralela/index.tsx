import React, { useState, useCallback, useEffect, Fragment, memo } from 'react';
import api from '../../services/apiClient';

import { MdAccessTime } from 'react-icons/md';

import Header from '../../components/Header';
import HeaderWrapper from '../../components/Paralela/HeaderWrapper';
import LineNormal from '../../components/Paralela/LineNormal';

import { Container, HeaderList, Scroll, Content } from './styles';

import { MaterialProps, StorageProps } from '../../dtos';

const Roteiro: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [materials, setMaterials] = useState<MaterialProps[]>([]);
  const [counterTime, setCounterTime] = useState(0);

  const saveInLocalStorage = useCallback((local: string, data: StorageProps): void => {
    localStorage.setItem(`@RoteiroWeb:${local}`, JSON.stringify(data));
  }, []);

  useEffect(() => {
    const dateLabel = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
    const materialsStorage = localStorage.getItem(`@RoteiroWeb:paralelas`);
    const materialsParsed = materialsStorage && JSON.parse(materialsStorage);

    if (!materialsStorage || !materialsParsed[dateLabel] || materialsStorage.length === 2) {
      // Se não tem nada em localStorage
      api
      .get<MaterialProps[]>(`/paralelas`, { params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate(),
      } })
      .then((response) => {
        setMaterials([...response.data]);

        // Monta o que vai pro localStorage
        const materialsToStringify = response.data.length === 0
          ? { ...materialsParsed }
          : { ...materialsParsed, [dateLabel]: response.data, };

        if (materialsToStringify) {
          saveInLocalStorage('paralelas', materialsToStringify)
        }

      })
    } else {
      // Se tem algo no localStorage
      api
      .get<MaterialProps[]>(`/paralelas`, { params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate(),
      } }).then(response => {
        const materialsToStringify = {
          [dateLabel]: response.data,
          ...materialsParsed,
        }

        // Se tem algo no localStorage mas não esta atualizado
        if (materialsToStringify[dateLabel] !== materialsParsed[dateLabel]) {
          setMaterials(materialsToStringify[dateLabel]);
        } else {
          setMaterials(materialsParsed[dateLabel]);
        }

        if (materialsToStringify) {
          saveInLocalStorage('paralelas', materialsToStringify)
        }
      }).catch(() => {
        // Se não tiver conexão usa o que já tinha em localStorage
        setMaterials(materialsParsed[dateLabel]);
      })
    }

  }, [selectedDate, saveInLocalStorage]);

  const handlePrevDay = useCallback(async (day: Date) => {
    setSelectedDate(day);
  }, [setSelectedDate]);

  const handleNextDay = useCallback(async (day: Date) => {
    setSelectedDate(day);
  }, [setSelectedDate]);

  return (
    <>
      <Header />
      <Container>
        <HeaderWrapper
          selectedDate={selectedDate}
          handlePrevDay={handlePrevDay}
          handleNextDay={handleNextDay}
        />

        <Content>
          <HeaderList>
            <div>CM</div>
            <div>Título</div>
            <div>
            <MdAccessTime size={20} color="var(--color-blue)" />
            </div>
            <div>T</div>
            <div>Cliente</div>
            <div>Sinal</div>
            <div>P</div>
            <div>Programa</div>
          </HeaderList>

          <Scroll>
            <ul>
              {!materials && <p>Carregando...</p>}
              {materials?.length === 0 && (<p>Nenhum material cadastrado nesta data...</p>)}

              {materials?.map((material: MaterialProps) => (
                <Fragment key={material.id}>
                  {!material.blank && <LineNormal
                      material={material}
                      counterTime={counterTime}
                      setCounterTime={setCounterTime}
                    />}
                </Fragment>
              ))}
            </ul>
          </Scroll>

        </Content>
      </Container>
    </>
  );
}

export default memo(Roteiro);
