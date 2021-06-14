import React, {
  InputHTMLAttributes,
  useRef,
} from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string | number;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<Props> = ({ name, value, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input
        defaultValue={value}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};

export default Input;
