import React from 'react';

import { Header, IconBox, IconAlert, Content, ButtonsGroup, Button } from './styles';

import Modal from '../../Modal';

interface Props {
  children: React.ReactNode;
  id: string | number;
  handleDelete: Function;
  delMaterialModal: boolean;
  setDelMaterialModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalConfirmDelete: React.FC<Props> = ({
  children,
  id,
  handleDelete,
  delMaterialModal,
  setDelMaterialModal,
}) => {

  return (
    <>
      {delMaterialModal && (
        <Modal
          title="Apagar Material"
          open={delMaterialModal}
          setOpen={setDelMaterialModal}
        >
          <IconBox>
            <IconAlert />
          </IconBox>

          <Header>Você tem certeza?</Header>

          <Content>
            {children}
          </Content>

          <ButtonsGroup>
            <Button color="gray" onClick={() => setDelMaterialModal(false)}>
              Cancelar
            </Button>
            <Button color="red" onClick={() => handleDelete(id)}>
              Apagar
            </Button>
          </ButtonsGroup>
        </Modal>
      )}
    </>
  );
}

export default ModalConfirmDelete;
