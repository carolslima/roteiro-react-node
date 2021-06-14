import React, { useEffect, useCallback, memo, useState, Fragment } from 'react';
import { useParams } from "react-router-dom";
import { parseISO } from 'date-fns';

import api from '../../services/apiClient';

import { MdAccessTime } from 'react-icons/md';

import Header from '../../components/Header';
import HeaderWrapper from '../../components/Print/HeaderWrapper';
import LineNormal from '../../components/Print/LineNormal';
import TimeLine from '../../components/Print/TimeLine';

import { Container, HeaderList, Content } from './styles';

import { MaterialProps, StorageProps } from '../../dtos';

interface DateParams {
  year: string;
  month: string;
  day: string;
}

const Print: React.FC = () => {
  const { year, month, day } = useParams<DateParams>();
  const parsedDate = parseISO(`${year}-${month}-${day}`);
  const [selectedDate] = useState(parsedDate);
  const [materials, setMaterials] = useState<MaterialProps[]>([]);
  console.log(selectedDate);

  const saveInLocalStorage = useCallback((local: string, data: StorageProps): void => {
    localStorage.setItem(`@RoteiroWeb:${local}`, JSON.stringify(data));
  }, []);

  useEffect(() => {
    const dateLabel = `${year}-${month}-${day}`;
    const materialsStorage = localStorage.getItem(`@RoteiroWeb:materials`);
    const materialsParsed = materialsStorage && JSON.parse(materialsStorage);

    if (!materialsStorage || !materialsParsed[dateLabel]) {
      api
      .get<MaterialProps[]>(`/materials`, { params: {
        year,
        month,
        day,
      } })
      .then((response) => {
        setMaterials([...response.data]);

        const materialsToStringify = response.data.length === 0
          ? { ...materialsParsed }
          : { ...materialsParsed, [dateLabel]: response.data, };

        if (materialsToStringify) {
          saveInLocalStorage('materials', materialsToStringify)
        }

      })
    } else {
      api
      .get<MaterialProps[]>(`/materials`, { params: {
        year,
        month,
        day,
      } }).then(response => {
        const materialsToStringify = {
          [dateLabel]: response.data,
          ...materialsParsed,
        }

        if (materialsToStringify[dateLabel] !== materialsParsed[dateLabel]) {
          setMaterials(materialsToStringify[dateLabel]);
        } else {
          setMaterials(materialsParsed[dateLabel]);
        }

        if (materialsToStringify) {
          saveInLocalStorage('materials', materialsToStringify)
        }
      }).catch(() => {
        setMaterials(materialsParsed[dateLabel]);
      })
    }

  }, [selectedDate, saveInLocalStorage, day, month, year]);

  return (
    <>
      <Container>
        <Header />
        <HeaderWrapper selectedDate={selectedDate} />

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

            <ul>
              {!materials && <p>Carregando materiais...</p>}
              {materials?.length === 0 && <p>Nenhum material cadastrado nesta data...</p>}

              {materials?.map(material => (
                <Fragment key={material.id}>
                  {!material.blank
                    ? <LineNormal material={material} />
                    : <TimeLine material={material} />
                  }
                </Fragment>
              ))}
            </ul>

        </Content>
      </Container>
    </>
  );
}

export default memo(Print);
