import React, { useRef } from 'react';

import { Container } from './styles';

interface Props {
  name: string;
  checked: boolean;
};

type CheckProps = JSX.IntrinsicElements['input'] & Props;

const Check: React.FC<CheckProps> = ({ name, checked, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Container>
      <input
        type='checkbox'
        ref={inputRef}
        checked={checked}
        className="checkbox"
        {...rest}
      />
    </Container>
  );
};

export default Check;
