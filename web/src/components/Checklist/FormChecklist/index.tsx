import React, { useRef, useCallback } from 'react';
import ReactInputMask from 'react-input-mask';

import { Material } from './styles';

import { MaterialProps } from '../../../dtos';

interface Props {
  material: MaterialProps;
  checklistSelected: MaterialProps[];
  setChecklistSelected: Function;
}

const FormChecklist: React.FC<Props> = ({ material, checklistSelected, setChecklistSelected }) => {
  const checkboxRef = useRef({ value: false });
  const selectedDisabledRef = useRef({ value: false });
  const observationsRef = useRef<HTMLInputElement>(null);
  const approximateTime = { value: '00:00:00' };

  const convertTime = useCallback((time: number): string => {
    const addLeftZero = (number: number): string => {
      if (number < 10) return `0${number.toString()}`;
      return number.toString();
    }

    const minutes = Math.trunc((time / 60) % 60);
    const seconds = Math.trunc(time % 60);
    const convertedTime = `${addLeftZero(minutes)}m ${addLeftZero(seconds)}s`;

    return convertedTime;
  }, []);

  const handleChangeCheckbox = () => {
    if (checkboxRef.current.value) {
      setChecklistSelected(
        checklistSelected.filter((materialModified: any) => materialModified.id !== material.id)
      );
      checkboxRef.current.value = !checkboxRef.current.value;
      selectedDisabledRef.current.value = !selectedDisabledRef.current.value;

      console.log(checklistSelected.filter((materialModified: any) => materialModified.id !== material.id))
    } else {
      checkboxRef.current.value = !checkboxRef.current.value;
      selectedDisabledRef.current.value = !selectedDisabledRef.current.value;
      setChecklistSelected([
        ...checklistSelected, {
          id: material.id,
          program: material.program,
          duration: material.duration,
          approximateTime: approximateTime.value,
          observations: observationsRef.current?.value.toUpperCase(),
          list_position: material.list_position,
        },
      ]);
    }
  }

  return (
    <Material selected={checkboxRef.current.value}>
        <div className="center">
          <input
            type="checkbox"
            name="checklist"
            className="checkbox"
            onClick={handleChangeCheckbox}
          />
        </div>
        <div>
          <input
            type="text"
            name="program"
            defaultValue={material.program}
            readOnly
            disabled
            className="disabled"
          />
        </div>
        <div className="center">
          <input
            type="text"
            name="duration"
            defaultValue={convertTime(material.duration)}
            readOnly
            disabled
            className="center lowercase disabled"
          />
        </div>
        <ReactInputMask
          type="text"
          name="approximateTime"
          mask="99:99:99"
          className="center"
          defaultValue={approximateTime.value}
          onChange={(e) => approximateTime.value = e.target.value}
          disabled={selectedDisabledRef.current.value}
        />
        <div className="center">
          <input
            ref={observationsRef}
            type="text"
            name="observations"
            placeholder="Observações"
            className="uppercase"
            disabled={selectedDisabledRef.current.value}
          />
        </div>
    </Material>
  );
}

export default FormChecklist;
