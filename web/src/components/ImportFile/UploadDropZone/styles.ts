import styled, { css } from 'styled-components';

const dragActive = css`
  border-color: var(--color-green);
`;

const dragReject = css`
  border-color: var(--color-red);
`;

interface DropContainerProps {
  isDragActive: boolean;
  isDragReject: boolean;
}

export const DropContainer = styled.div.attrs({ className: 'Dopzone' }) <DropContainerProps>`
  margin-bottom: 10px;

  border: 1px dashed var(--color-blue);
  border-radius: 4px;

  cursor: pointer;

  transition: height 0.2s ease;

  ${(props) => props.isDragActive && dragActive};
  ${(props) => props.isDragReject && dragReject};
`;

const messageColorVariations = {
  default: css`
    color: var(--color-blue);
  `,
  success: css`
    color: var(--color-green);
  `,
  error: css`
    color: var(--color-red);
  `,
};

interface UploadMessageProps {
  type?: 'success' | 'error' | 'default';
}

export const UploadMessage = styled.div<UploadMessageProps>`
  display: flex;

  ${(props) => messageColorVariations[props.type || 'default']}

  justify-content: center;
  align-items: center;
  padding: 15px 0;

  font-size: 16px;
  width: 100%;
  height: 60px;
`;
