import React, { SelectHTMLAttributes, useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: Array<{
    id: string | number;
    name: string;
  }>;
  include?: boolean;
}

const Select: React.FC<Props> = ({ name, include = false, options, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => !ref.state?.value ? '' : ref.state.value,
    });
  }, [fieldName, registerField]);

  return (
    <Container include={include}>
      <select
        ref={selectRef}
        value={defaultValue}
        {...rest}
      >
        <option disabled hidden >
          Selecione uma opção
        </option>
        {options.map(option => {
          return <option key={`${option.name}-${option.id}`} value={option.id}>{option.name}</option>
        })}
      </select>
    </Container>
  )
};

export default Select;
