import React, { useRef, useState, memo, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import InputMask from './InputMask';

import { Container, CloseButton, Button, IconDelete, IconTimer } from './styles';

import { MaterialProps } from '../../../dtos';
import ModalConfirmDelete from '../ModalConfirmDelete';

interface Props {
  material: MaterialProps;
  handleChange: Function;
  handleDelete: Function;
}

const TimeLine: React.FC<Props> = ({
  material,
  handleChange,
  handleDelete,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [delMaterialModal, setDelMaterialModal] = useState(false);

  const addLeftZero = useCallback((number: string): string => {
    if (parseInt(number) < 10) {
      return `0${number.toString()}`;
    }
    return number.toString();
  }, []);

  const timeNow = useCallback((): string => {
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const seconds = new Date().getSeconds();

    const hourNow = `${addLeftZero(hour.toString())}:${addLeftZero(minute.toString())}:${addLeftZero(
      seconds.toString()
    )}`;

    return hourNow;
  }, [addLeftZero]);

  /** * Soma duas horas. * Exemplo: 12:35:00 + 07:20:00 = 19:55:00. */
  const sumHour = useCallback((hourI: string, hourS: string): string => {
    const hourInit = hourI.split(':');
    const hourSum = hourS.split(':');

    let totalHours = parseInt(hourInit[0], 10) + parseInt(hourSum[0], 10);
    let totalMinutes = parseInt(hourInit[1], 10) + parseInt(hourSum[1], 10);
    let totalSeconds = parseInt(hourInit[2], 10) + parseInt(hourSum[2], 10);

    // Ajusta segundos
    if (totalSeconds >= 60) {
      totalSeconds -= 60;
      totalMinutes += 1;
    }

    // Ajusta minutos
    if (totalMinutes >= 60) {
      totalMinutes -= 60;
      totalHours += 1;
    }

    const resultSumHour = `${addLeftZero(totalHours.toString())}:${addLeftZero(
      totalMinutes.toString()
    )}:${addLeftZero(totalSeconds.toString())}`;

    return resultSumHour;
  }, [addLeftZero]);

  /** * Verifica se a hora inicial é menor que a final. */
  const compareHourStartLessHourEnd = useCallback((hourI: string, hourE: string): boolean => {
    const hourInit = hourI.split(':');
    const hourEnd = hourE.split(':');

    // Verifica as horas.
    // Se forem diferentes, é só ver se a inicial é menor que a final.
    const hInit = parseInt(hourInit[0], 10);
    const hEnd = parseInt(hourEnd[0], 10);
    if (hInit !== hEnd) {
      return hInit < hEnd;
    }

    // Se as horas são iguais, verifica os minutos então.
    const mInit = parseInt(hourInit[1], 10);
    const mEnd = parseInt(hourEnd[1], 10);
    if (mInit !== mEnd) {
      return mInit < mEnd;
    }

    // Se as horas são iguais, verifica os segundo então.
    const sInit = parseInt(hourInit[2], 10);
    const sEnd = parseInt(hourEnd[2], 10);
    if (sInit !== sEnd) {
      return sInit < sEnd;
    }

    return false;
  }, []);

  /** * Retona a diferença entre duas horas. * Exemplo: 14:35 a 17:21 = 02:46 */
  const betweenHour = useCallback((hourI: string, hourE: string): string => {
    // Tratamento se a hora inicial é menor que a final
    if (!compareHourStartLessHourEnd(hourI, hourE)) {
      const aux = hourE;
      hourE = hourI;
      hourI = aux;
    }

    // Separa por :
    const hourInit = hourI.split(':');
    const hourEnd = hourE.split(':');

    let totalHours = parseInt(hourEnd[0], 10) - parseInt(hourInit[0], 10);
    let totalMinutes = parseInt(hourEnd[1], 10) - parseInt(hourInit[1], 10);
    let totalSeconds = parseInt(hourEnd[2], 10) - parseInt(hourInit[2], 10);

    if (totalSeconds < 0) {
      totalSeconds += 60;
      totalMinutes -= 1;
    }

    if (totalMinutes < 0) {
      totalMinutes += 60;
      totalHours -= 1;
    }

    const hourBetween = `${addLeftZero(totalHours.toString())}:${addLeftZero(
      totalMinutes.toString()
    )}:${addLeftZero(totalSeconds.toString())}`;

    return hourBetween;
  }, [addLeftZero, compareHourStartLessHourEnd]);

  /** * Retona a soma de duas horas. * Exemplo: 14:35 e 01:00 = 15:35 */
  const subtractHour = useCallback((hourE: string, hourD: string): string => {
    // Separa por :
    const hourDuration = hourD.split(':');
    const hourEnd = hourE.split(':');

    let totalHours = parseInt(hourEnd[0], 10) - parseInt(hourDuration[0], 10);
    let totalMinutes = parseInt(hourEnd[1], 10) - parseInt(hourDuration[1], 10);
    let totalSeconds = parseInt(hourEnd[2], 10) - parseInt(hourDuration[2], 10);

    if (totalSeconds < 0) {
      totalSeconds += 60;
      totalMinutes -= 1;
    }

    if (totalMinutes < 0) {
      totalMinutes += 60;
      totalHours -= 1;
    }

    const hourBetween = `${addLeftZero(totalHours.toString())}:${addLeftZero(
      totalMinutes.toString()
    )}:${addLeftZero(totalSeconds.toString())}`;

    return hourBetween;
  }, [addLeftZero]);

  const getTimeStart = useCallback((): void => {
    const timeZero = '00:00:00';

    const end = formRef.current?.getFieldValue('time_end') || timeZero;
    const duration = formRef.current?.getFieldValue('time_duration') || timeZero;

    if (end === '00:00:00') {
      formRef.current?.setFieldValue('time_start', timeNow());
      handleChange(material.id, "time_start", timeNow().toString());
    }

    if (end !== '00:00:00' && duration === '00:00:00') {
      formRef.current?.setFieldValue('time_start', end);
      handleChange(material.id, "time_start", end);
    }

    if (end !== '00:00:00' && duration !== '00:00:00') {
      formRef.current?.setFieldValue('time_start', subtractHour(end, duration));
      handleChange(material.id, "time_start", subtractHour(end, duration));
    }
  }, [handleChange, material.id, subtractHour, timeNow]);

  const getTimeEnd = useCallback((): void => {
    const timeZero = '00:00:00';

    const start = formRef.current?.getFieldValue('time_start') || timeZero;
    const duration = formRef.current?.getFieldValue('time_duration') || timeZero;

    if (
      start !== '' &&
      start !== '00:00:00' &&
      start !== null &&
      duration !== '' &&
      duration !== '00:00:00' &&
      duration !== null
    ) {
      // Soma a hora de inicio e duração e preenche a hora final
      const soma = sumHour(start.toString(), duration.toString());
      formRef.current?.setFieldValue('time_end', soma);
      handleChange(material.id, "time_end", soma.toString());
    } else {
      // Retorna a hora atual
      formRef.current?.setFieldValue('time_end', timeNow());
      handleChange(material.id, "time_end", timeNow().toString());
    }
  }, [handleChange, material.id, sumHour, timeNow]);

  const getTimeDuration = useCallback((): void => {
    const timeZero = '00:00:00';

    const start = formRef.current?.getFieldValue('time_start') || timeZero;
    const end = formRef.current?.getFieldValue('time_end') || timeZero;

    if (start !== '00:00:00' && end !== '00:00:00') {
      // Retorna o tempo entre Hora de Início e Fim
      const hourBetween = betweenHour(start.toString(), end.toString());
      formRef.current?.setFieldValue('time_duration', hourBetween);
      handleChange(material.id, "time_duration", hourBetween.toString());
    } else {
      // Preenche a duração com 00:00:00
      formRef.current?.setFieldValue('time_duration', timeZero);
      handleChange(material.id, "time_duration", timeZero.toString());
    }
  }, [betweenHour, handleChange, material.id]);

  return (
    <Container>
      <Form ref={formRef} initialData={material} onSubmit={() => {}}>
        <div>
          <CloseButton onClick={() => setDelMaterialModal(true)}>
            <IconDelete />
          </CloseButton>
          <ModalConfirmDelete
            id={material.id}
            handleDelete={handleDelete}
            delMaterialModal={delMaterialModal}
            setDelMaterialModal={setDelMaterialModal}
          >
            Deseja realmente apagar a linha de controle de tempo?
          </ModalConfirmDelete>
        </div>

        <div>
          <Button onClick={() => getTimeStart()}>
            <IconTimer />
            <span>Início</span>
          </Button>
          <InputMask
            name="time_start"
            onBlur={(e) => handleChange(material.id, "time_start", e.target.value)}
            mask="99:99:99"
          />
        </div>
        <div>
          <Button onClick={() => getTimeEnd()}>
            <IconTimer />
            <span>Fim</span>
          </Button>
          <InputMask
            name="time_end"
            onBlur={(e) => handleChange(material.id, "time_end", e.target.value)}
            mask="99:99:99"
          />
        </div>
        <div>
          <Button onClick={() => getTimeDuration()}>
            <IconTimer />
            <span>Duração</span>
          </Button>
          <InputMask
            name="time_duration"
            onBlur={(e) => handleChange(material.id, "time_duration", e.target.value)}
            mask="99:99:99"
          />
        </div>
      </Form>
    </Container>
  );
}

export default memo(TimeLine);
