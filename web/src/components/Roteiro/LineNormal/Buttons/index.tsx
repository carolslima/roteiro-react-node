import React, { useRef, useState, FormEvent } from 'react';
import { FormHandles } from '@unform/core';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {
  MaterialProps,
  SignalProps,
  TypesProps,
  PositionProps
} from '../../../../dtos';


import Textarea from '../../../Textarea';
import Checkbox from '../../../Checkbox';

import Modal from '../../../Modal';
import ModalConfirmDelete from '../../ModalConfirmDelete';
import FormCreate from './FormCreate';

import {
  Container,
  Button,
  IconAddMaterial,
  IconLocked,
  IconUnlocked,
  IconTrashOn,
  IconTrashOff,
  IconInfo,
  FormWeb,
  Details,
  Row,
  Title,
  Description,
} from './styles';

interface Props {
  locked: boolean;
  trashDisabled: boolean;
  material: MaterialProps;
  setMaterials: React.Dispatch<React.SetStateAction<MaterialProps[]>>;
  signals: SignalProps[];
  types: TypesProps[];
  positions: PositionProps[];
  handleChange: Function;
  handleDelete: Function;
  setOffline: React.Dispatch<React.SetStateAction<boolean>>;
  materialCreatedSetAndSave: Function;
  saveInStorageForTryAgainLaterWhenOffline: Function;
}

const Buttons: React.FC<Props> = ({
  locked,
  trashDisabled,
  material,
  setMaterials,
  signals,
  types,
  positions,
  handleChange,
  handleDelete,
  setOffline,
  materialCreatedSetAndSave,
  saveInStorageForTryAgainLaterWhenOffline,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [addMaterialModal, setAddMaterialModal] = useState(false);
  const [detailsMaterialModal, setDetailsMaterialModal] = useState(false);
  const [delMaterialModal, setDelMaterialModal] = useState(false);

  return (
    <Container>

      <Button color="green" onClick={() => setAddMaterialModal(true)}>
        <IconAddMaterial />
      </Button>
      {addMaterialModal && (
        <Modal
          title="Adcionar Material"
          open={addMaterialModal}
          setOpen={setAddMaterialModal}
        >
          <FormCreate
            material={material}
            setMaterials={setMaterials}
            signals={signals}
            types={types}
            positions={positions}
            setOffline={setOffline}
            setAddMaterialModal={setAddMaterialModal}
            materialCreatedSetAndSave={materialCreatedSetAndSave}
            saveInStorageForTryAgainLaterWhenOffline={saveInStorageForTryAgainLaterWhenOffline}
          />
        </Modal>
      )}

      <Button
        color={locked ? 'orange' : 'gray'}
        onClick={() => handleChange(material.id, 'status', !material.status)}
      >
        {locked ? <IconLocked /> : <IconUnlocked />}
      </Button>

      <Button
        color={!trashDisabled ? 'red' : 'default'}
        onClick={() => setDelMaterialModal(true)}
      >
        {trashDisabled ? <IconTrashOn /> : <IconTrashOff />}
      </Button>
      <ModalConfirmDelete
        id={material.id}
        handleDelete={handleDelete}
        delMaterialModal={delMaterialModal}
        setDelMaterialModal={setDelMaterialModal}
      >
        Deseja realmente apagar o material &quot;<strong>CM: {material.cm} - Título: {material.title}</strong>&quot;?
      </ModalConfirmDelete>

      <Button color="blue" onClick={() => setDetailsMaterialModal(true)}>
        <IconInfo />
      </Button>
      {detailsMaterialModal && (
        <Modal
          title="Detalhes do Material"
          open={detailsMaterialModal}
          setOpen={setDetailsMaterialModal}
        >
          <FormWeb ref={formRef} initialData={material} onSubmit={() => {}}>
            <Details>
              <Row>
                <Title>Código do Material:</Title>
                <Description>{material.cm}</Description>
              </Row>

              <Row>
                <Title>Título:</Title>
                <Description>{material.title}</Description>
              </Row>

              <Row>
                <Title>Duração:</Title>
                <Description>{material.duration}</Description>
              </Row>

              <Row>
                <Title>Tipo:</Title>
                <Description>{material.type}</Description>
              </Row>

              <Row>
                <Title>Cliente:</Title>
                <Description>{material.client}</Description>
              </Row>

              <Row>
                <Title>Sinal:</Title>
                <Description>{material.signal.name}</Description>
              </Row>

              <Row>
                <Title>Posição:</Title>
                <Description>{material.position}</Description>
              </Row>

              <Row>
                <Title>Programa:</Title>
                <Description>{material.program}</Description>
              </Row>

              <Row>
                <Title>Cadastrado por:</Title>
                <Description>
                  {`${material.user_create.name.split(' ')[0]} em ${format(parseISO(material.created_at), "d 'de' MMMM 'às' HH:mm", { locale: ptBR })}`}
                </Description>
              </Row>

              <Row>
                <Title>Atualizado por:</Title>
                <Description>
                  {`${material.user_update.name.split(' ')[0]} em ${format(parseISO(material.updated_at), "d 'de' MMMM 'às' HH:mm", { locale: ptBR })}`}
                </Description>
              </Row>

              <Row>
                <Title>Material Incluído?</Title>
                <Description>
                  <Checkbox
                    name="include"
                    checked={material.include}
                    onChange={(e: FormEvent<HTMLInputElement>) => handleChange(material.id, "include", e.currentTarget.value)}
                  />
                </Description>
              </Row>

              <Textarea
                name="details"
                placeholder="Detalhes"
                value={material.details}
                onBlur={(e: FormEvent<HTMLTextAreaElement>) => handleChange(material.id, "details", e.currentTarget.value)}
              />
            </Details>
          </FormWeb>
        </Modal>
      )}

    </Container>
  );
}

export default Buttons;
