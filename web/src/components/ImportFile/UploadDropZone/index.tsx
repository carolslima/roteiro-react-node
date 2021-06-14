import React, { useCallback } from "react";
import Dropzone, { DropEvent } from "react-dropzone";

import { DropContainer, UploadMessage } from "./styles";

interface Props {
  onUpload: (<T extends File>(files: T[], event: DropEvent) => void) | undefined;
}

const Upload: React.FC<Props> = ({ onUpload }) => {

  const renderDragMessage = useCallback((isDragActive: boolean, isDragReject: boolean) => {
    if (!isDragActive) {
      return <UploadMessage>Arraste o arquivo aqui ou clique...</UploadMessage>;
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado!</UploadMessage>;
    }

    return <UploadMessage type="success">Solte o arquivo aqui...</UploadMessage>;
  }, []);

  return (
    <Dropzone accept="text/plain" onDropAccepted={onUpload}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <section {...getRootProps()}>
          <DropContainer
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <input {...getInputProps()} />
            {renderDragMessage(isDragActive, isDragReject)}
          </DropContainer>
        </section>
      )}
    </Dropzone>
  );
}

export default Upload;
