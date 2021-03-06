import React, { useRef, useEffect, memo } from 'react';
import ReactInputMask, { Props as InputProps } from 'react-input-mask';
import { useField } from '@unform/core';

interface Props extends InputProps {
  name: string;
}

const InputMask: React.FC<Props> = ({ name, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <ReactInputMask
      ref={inputRef}
      defaultValue={defaultValue}
      style={{ border: error && '1px solid #C53030', borderRadius: '4px' }}
      placeholder="00:00:00"
      {...rest}
    />
  );
};

export default memo(InputMask);
