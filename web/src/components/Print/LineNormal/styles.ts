import styled, { css } from 'styled-components';

interface ContainerProps {
  type: 'sat' | 'satsp' | 'swa' | 'fibra' | 'nexio' | 'estado' | 'defas' | 'falta' | 'default';
  include?: boolean;
  status?: boolean;
}

const typeVariations = {
  sat: css`
    background: var(--color-line-background-sat);
  `,
  satsp: css`
    background: var(--color-line-background-satsp);
  `,
  swa: css`
    background: var(--color-line-background-swa);
  `,
  fibra: css`
    background: var(--color-line-background-fibra);
  `,
  nexio: css`
    background: var(--color-line-background-nexio);
  `,
  estado: css`
    background: var(--color-line-background-estado);
  `,
  defas: css`
    background: var(--color-line-background-defas);
  `,
  falta: css`
    background: var(--color-line-background-falta);
  `,
  default: css`
    background: var(--color-line-background-default);
  `,
};

const materialDisabled = {
  disabled: css`
    div > input, div > select {
      color: var(--color-input-disabled);
      font-style: italic;
      text-decoration:line-through;
    }
  `,
};

export const Container = styled.li<ContainerProps>`
  display: grid;
  grid-template-columns: 7rem 1fr 4.8rem 4.8rem 1fr 12rem 4.8rem 1fr;
  flex-direction: row;

  justify-content: center;
  align-items: center;
  align-self: center;
  text-align: center;

  height: 44px;
  width: 100%;
  margin: 0;
  font-size: 1.2rem;

  border-bottom: 1px solid var(--color-gray-light);
  border-radius: 0.4rem;

  ${(props) => typeVariations[props.type || 'default']}
  ${(props) => props.status && materialDisabled['disabled']}
`;
