import React, {
  SelectHTMLAttributes,
  useRef,
} from 'react';
import { v1 as uuidv1 } from 'uuid';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  value: string | number;
  icon?: React.ComponentType<IconBaseProps>;
  options: Array<{
    id: string | number;
    name: string;
  }>;
}

const Select: React.FC<Props> = ({ name, value, options, icon: Icon, ...rest }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <Container>
      {Icon && <Icon size={20} />}
      <select
        ref={selectRef}
        value={value}
        {...rest}
      >
        <option value="" disabled hidden>Selecione uma opção</option>
        {options.map(option => {
          return <option key={uuidv1()} value={option.id}>{option.name}</option>
        })}
      </select>
    </Container>
  )
};

export default Select;
