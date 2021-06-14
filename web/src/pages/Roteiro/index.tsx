import React, { useEffect, useCallback, memo, useState, Fragment } from 'react';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import api from '../../services/apiClient';

import { MdAccessTime, MdTimer } from 'react-icons/md';

import Header from '../../components/Header';
import HeaderWrapper from '../../components/Roteiro/HeaderWrapper';
import LineNormal from '../../components/Roteiro/LineNormal';
import TimeLine from '../../components/Roteiro/TimeLine';

import { Container, HeaderList, Scroll, Content } from './styles';

import { MaterialProps, StorageProps, SignalProps } from '../../dtos';

const Roteiro: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [materials, setMaterials] = useState<MaterialProps[]>([]);
  const [signals, setSignals] = useState<SignalProps[]>([]);
  const [offline, setOffline] = useState(false);
  const [generatingPdf, setGeneratinPdf] = useState(false);
  const [counterTime, setCounterTime] = useState(0);

  const saveInLocalStorage = useCallback((local: string, data: StorageProps): void => {
    localStorage.setItem(`@RoteiroWeb:${local}`, JSON.stringify(data));
  }, []);

  useEffect(() => {
    const dateLabel = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
    const materialsStorage = localStorage.getItem(`@RoteiroWeb:materials`);
    const materialsParsed = materialsStorage && JSON.parse(materialsStorage);

    if (!materialsStorage || materialsStorage.length < 3 || !materialsParsed[dateLabel]) {
      // Se não tem nada em localStorage
      api
      .get<MaterialProps[]>(`/materials`, { params: {
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
          saveInLocalStorage('materials', materialsToStringify)
        }

      })
    } else {
      // Se tem algo no localStorage
      api
      .get<MaterialProps[]>(`/materials`, { params: {
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
          saveInLocalStorage('materials', materialsToStringify)
        }
      }).catch(() => {
        // Se não tiver conexão usa o que já tinha em localStorage
        setMaterials(materialsParsed[dateLabel]);
      })
    }

  }, [selectedDate, saveInLocalStorage]);

  useEffect(() => {
    const dateLabel = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
    const signalsStorage = localStorage.getItem(`@RoteiroWeb:signals`);
    const signalsParsed = signalsStorage && JSON.parse(signalsStorage);

    if (!signalsStorage || signalsStorage.length < 3 || !signalsParsed[dateLabel]) {
      api
      .get<SignalProps[]>('/signals')
      .then((response: any) => {
        if (response.data) {
          setSignals(response.data);

          const signalsToStringify = response.data.length === 0
            ? { ...signalsParsed }
            : { ...signalsParsed, [dateLabel]: response.data, };

          if (signalsToStringify) {
            saveInLocalStorage('signals', signalsToStringify)
          }
        }

      })
    } else {
      setSignals(signalsParsed[dateLabel]);

      api
      .get<SignalProps[]>(`/signals`).then((response: any) => {
        if (response.data) {

          const signalsToStringify = {
            [dateLabel]: response.data,
            ...signalsParsed,
          }

          if (signalsToStringify[dateLabel] !== signalsParsed[dateLabel]) {
            setSignals(signalsToStringify[dateLabel]);
          } else {
            setSignals(signalsParsed[dateLabel]);
          }

          if (signalsToStringify) {
            saveInLocalStorage('signals', signalsToStringify)
          }
        }
      }).catch(() => {
        setSignals(signalsParsed[dateLabel]);
      });
    }

  }, [setSignals, saveInLocalStorage, selectedDate]);

  const materialCreatedSetAndSave = useCallback((createdMaterial: any): void => {
    const dateLabel = `${new Date(createdMaterial.schedule).getFullYear()}-${new Date(createdMaterial.schedule).getMonth() + 1}-${new Date(createdMaterial.schedule).getDate()}`;
    const materialsStorage = localStorage.getItem(`@RoteiroWeb:materials`);
    const materialsParsed = materialsStorage && JSON.parse(materialsStorage);

    addToast({
      type: 'success',
      title: 'Cadastrar material',
      description: 'Material cadastrado com sucesso.',
    });

    const signalFiltered = signals.find(signal => signal.id === createdMaterial.signal_id);

    const materialModified = Object.assign(createdMaterial, {
      signal: { name: signalFiltered?.name },
      user_create: { name: user.name },
      user_update: { name: user.name },
    });

    const addTimeLine = [...materials, materialModified] as MaterialProps[];
    const materialsSorted = addTimeLine.sort((a, b) => a.list_position - b.list_position);

    setMaterials(materialsSorted);

    const materialsToStringify = {
      ...materialsParsed,
      [dateLabel]: materialsSorted,
    };

    if (materialsToStringify) {
      saveInLocalStorage('materials', materialsToStringify)
    }
  }, [addToast, materials, saveInLocalStorage, signals, user.name]);

  const saveInStorageForTryAgainLaterWhenOffline = useCallback((data: any, local: string): void => {
    const dataStorage = localStorage.getItem(`@RoteiroWeb:${local}`);
    const dataParsed = dataStorage && JSON.parse(dataStorage);

    let dataToStringify: any;

    if (dataParsed) {
      dataToStringify = {
        ...dataParsed,
        data,
      };
    } else {
      dataToStringify = {
        data,
      };
    }

    if (dataToStringify) {
      saveInLocalStorage(local, dataToStringify)
    }

  }, [saveInLocalStorage]);

  const saveInStorageForDeleteLaterWhenOffline = useCallback((data: string, local: string): void => {
    const dataStorage = localStorage.getItem(`@RoteiroWeb:${local}`);
    const dataParsed = dataStorage && JSON.parse(dataStorage);

    const dataToStringify = dataParsed ? [...dataParsed, data] : [data];

    if (dataToStringify) {
      saveInLocalStorage(local, dataToStringify)
    }

  }, [saveInLocalStorage]);

  const saveInDbWhenOffline = useCallback((): void => {
    const createdStorage = localStorage.getItem(`@RoteiroWeb:createdOffline`);
    const createdParsed = createdStorage && JSON.parse(createdStorage);

    const deletedStorage = localStorage.getItem(`@RoteiroWeb:deletedOffline`);
    const deletedParsed = deletedStorage && JSON.parse(deletedStorage);

    const changedStorage = localStorage.getItem(`@RoteiroWeb:changedOffline`);
    const changedParsed = changedStorage && JSON.parse(changedStorage);

    if (createdParsed && createdParsed.length) {
      api.put(`materials`, { data: [...createdParsed] })
      .then(() => {
        localStorage.removeItem('@RoteiroWeb:createdOffline');
      });
    }

    if (deletedParsed && deletedParsed.length) {
      const totalForDelete = deletedParsed.length;
      deletedParsed.map((material_id: string, index: number) => {
        // Only 5 per second
        setInterval(() =>{
          api.delete(`materials/${material_id}`)
            .then(() => {
              if (index === totalForDelete) {
                localStorage.removeItem('@RoteiroWeb:deletedOffline');
              }
            });
        }, 200);

        return material_id;
      });
    }

    if (changedParsed && changedParsed.length) {
      const totalForChange = changedParsed.length;
        changedParsed.map((material: any, index: number) => {
          // Only 5 per second
          setInterval(() =>{
            api.patch(`materials/${material.id}`, {
              field: material.field,
              value: material.value,
             })
              .then(() => {
                if (index === totalForChange) {
                  localStorage.removeItem('@RoteiroWeb:changedOffline');
                }
              });
          }, 200);

          return material;
        });
    }

    if (!createdStorage && !deletedStorage && !changedStorage) {
      setOffline(false);
    }

  }, [setOffline]);

  const handleChange = useCallback((id: string, field: string, value: any) => {
    const dateLabel = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
    const materialsStorage = localStorage.getItem(`@RoteiroWeb:materials`);
    const materialsParsed = materialsStorage && JSON.parse(materialsStorage);

    saveInDbWhenOffline();

    api.patch(`materials/${id}`, { field, value })
      .then(() => {
        addToast({
          type: 'success',
          title: 'Material atualizado',
          description: 'Material atualizado com sucesso.',
        });
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar',
          description: 'Ocorreu um erro ao tentar atualizar, verifique sua conexão.',
        });

        const changeLater = {
          id,
          field,
          value,
        };

        saveInStorageForTryAgainLaterWhenOffline(changeLater, "changedOffline");

        setOffline(true);
      });

    const changedMaterial = materialsParsed[dateLabel].map((material: MaterialProps) => {
      if (material.id === id) {
        if (field === 'signal_id') {
          const signalFiltered = signals.find(sign => sign.id === value);

          return { ...material, [field]: value, signal: signalFiltered }
        } else {
          return { ...material, [field]: value }
        }
      }

      return material;
    });

    setMaterials(changedMaterial);

    const materialsToStringify = {
      ...materialsParsed,
      [dateLabel]: changedMaterial,
    };

    if (materialsToStringify) {
      saveInLocalStorage('materials', materialsToStringify)
    }
  }, [addToast, saveInLocalStorage, selectedDate, signals, saveInDbWhenOffline, saveInStorageForTryAgainLaterWhenOffline]);

  const handleDelete = useCallback((id: string) => {
    const dateLabel = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
    const materialsStorage = localStorage.getItem(`@RoteiroWeb:materials`);
    const materialsParsed = materialsStorage && JSON.parse(materialsStorage);

    saveInDbWhenOffline();

    api.delete(`materials/${id}`)
      .then(() => {
        addToast({
          type: 'success',
          title: 'Material deletado',
          description: 'Material deletado com sucesso.',
        });

        setOffline(false)
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Erro ao deletar',
          description: 'Ocorreu um erro ao tentar deletar o material, verifique sua conexão!',
        });

        saveInStorageForDeleteLaterWhenOffline(id, "deletedOffline");

        setOffline(true);
      });

    const newListMaterials = materialsParsed[dateLabel].filter((material: any) => material.id !== id);

    delete materialsParsed[dateLabel]

    setMaterials(newListMaterials);

    const materialsToStringify = {
      [dateLabel]: newListMaterials,
      ...materialsParsed,
    }

    if (materialsToStringify) {
      saveInLocalStorage('materials', materialsToStringify)
    }

  }, [addToast, saveInLocalStorage, selectedDate, saveInDbWhenOffline, saveInStorageForDeleteLaterWhenOffline]);

  const handlePrevDay = useCallback((day: Date) => {
    setSelectedDate(day);
  }, [setSelectedDate]);

  const handleNextDay = useCallback((day: Date) => {
    setSelectedDate(day);
  }, [setSelectedDate]);

  const convertTime = useCallback((time: number): string => {
    function addLeftZero(number: number) {
      if (number < 10) return `0${number.toString()}`;
      return number.toString();
    }

    const minutes = Math.trunc((time / 60) % 60);
    const seconds = Math.trunc(time % 60);
    const convertedTime = `${addLeftZero(minutes)}m ${addLeftZero(seconds)}s`;

    return convertedTime;
  }, []);

  const getPDF = useCallback(() => {
    return api.get(`pdf`, {
      responseType: 'arraybuffer',
      headers: { 'Accept': 'application/pdf' },
      params: {
        year: selectedDate.getFullYear().toString(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate().toString(),
      }
    })
  }, [selectedDate]);

  const savePDF = useCallback(() => {
    const dateLabel = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
    setGeneratinPdf(true);

    return getPDF()
    .then((response: any) => {
      const blob = new Blob([response.data], {type: 'application/pdf'})
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `roteiro-${dateLabel}.pdf`;
      link.click();

      setGeneratinPdf(false);
    })
    .catch(() => {
      addToast({
        type: 'error',
        title: 'Erro ao gerar PDF',
        description:
          'Ocorreu um erro ao tentar gerar o PDF, verifique sua conexão e tente novamente.',
      });

      setGeneratinPdf(false);
    })
  }, [addToast, getPDF, selectedDate]);

  return (
    <>
      <Header />
      <Container>
        <HeaderWrapper
          selectedDate={selectedDate}
          handlePrevDay={handlePrevDay}
          handleNextDay={handleNextDay}
          saveInDbWhenOffline={saveInDbWhenOffline}
          offline={offline}
          generatingPdf={generatingPdf}
          savePDF={savePDF}
        />

        <Content>
          <HeaderList>
            <div>Ações</div>
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
            <div>
              <button type="button">
                <MdTimer
                  size={20}
                  color={!!counterTime ? 'var(--color-red)' : 'var(--color-blue)'}
                  onClick={() => setCounterTime(0)}
                />
              </button>
            </div>
            <div>{convertTime(counterTime)}</div>
          </HeaderList>

          <Scroll>
            <ul>
              {!materials && <p>Carregando materiais...</p>}
              {materials?.length === 0 && <p>Nenhum material cadastrado nesta data...</p>}

              {materials?.map(material => (
                <Fragment key={material.id}>
                  {!material.blank ? (
                    <LineNormal
                      material={material}
                      setMaterials={setMaterials}
                      signals={signals}
                      counterTime={counterTime}
                      setCounterTime={setCounterTime}
                      handleChange={handleChange}
                      handleDelete={handleDelete}
                      setOffline={setOffline}
                      materialCreatedSetAndSave={materialCreatedSetAndSave}
                      saveInStorageForTryAgainLaterWhenOffline={saveInStorageForTryAgainLaterWhenOffline}
                    />
                  ) : (
                      <TimeLine
                        material={material}
                        handleChange={handleChange}
                        handleDelete={handleDelete}
                      />
                    )}
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
