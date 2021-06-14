import React, { memo } from 'react';
import filesize from 'filesize';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { MdCheckCircle, MdLink } from 'react-icons/md';

import { Container, Scroll, FileInfo, FileIcon, FileName } from './styles';

import { useAuth } from "../../../hooks/auth";

interface File {
  id: number;
  name: string;
  path: string;
  size: number;
}

interface Props {
  files: File[];
  onDelete: Function;
}

const FileList: React.FC<Props> = ({ files, onDelete }) => {
  const { user } = useAuth();

  return (
    <Container>
      <Scroll>

        {files.reverse().map((uploadedFile: any) => (
          <li key={uploadedFile.id}>
            <FileInfo>
              <FileIcon />
              <div>
                <FileName>{uploadedFile.name}</FileName>
                <span>
                  {format(
                    parseISO(uploadedFile.schedule),
                    "dd'/'MM'/'yy '-' ",
                    {
                      locale: ptBR,
                    }
                  )}
                  {uploadedFile.date && (
                    <>
                      {format(uploadedFile.date, "dd'/'MM'/'yy ", {
                        locale: ptBR,
                      })}
                    </>
                  )}

                  {uploadedFile.size && filesize(uploadedFile.size)}

                  {uploadedFile.readableSize}
                  {(Number(user.role) === 2 || Number(user.role) === 3) && (
                      <button onClick={() => onDelete(uploadedFile.id)}>
                        Excluir
                      </button>
                    )}
                </span>
              </div>
            </FileInfo>

            <div>
              <a
                href={uploadedFile.path_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdLink style={{ marginRight: 8 }} size={24} color="var(--color-link)" />
              </a>

              <MdCheckCircle size={24} color="var(--color-checked)" />
            </div>
          </li>
        ))}
      </Scroll>
    </Container>
  );
};

export default memo(FileList);
