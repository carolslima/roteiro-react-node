import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface Props {
  name: string;
  label?: string;
  totalLength?: number;
};

type InputProps = JSX.IntrinsicElements['input'] & Props;

const Input: React.FC<InputProps> = ({ name, totalLength = 150, label, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    })
  }, [fieldName, registerField]);

  return (
    <Container>
      { label && <label htmlFor={fieldName}>{label}</label> }
      <input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        maxLength={totalLength}
        {...rest}
      />
      { error && <span>{error}</span> }
    </Container>
  );
};

export default Input;
