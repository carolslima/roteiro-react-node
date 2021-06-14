import React, { useRef, useState, useCallback, FormEvent } from 'react';
import { mutate as mutateGlobal } from 'swr';
import { FormHandles } from '@unform/core';
import api from '../../../services/apiClient';
import * as Yup from 'yup';

import { useToast } from '../../../hooks/toast';

import getValidationErrors from '../../../utils/getValidationsErrors';

import { FormWeb, Scroll, Notification, Columns, Label } from './styles';

import Textarea from '../../Textarea';
import Checkbox from '../../Checkbox';
import Select from '../../Select';
import Button from '../../Button';

import { NotificationPriority } from '../../../utils/selectOptionsMaterial';

import { NotificationsProps } from '../../../dtos';

interface Props {
  handleMarkAsRead: any;
  messages: NotificationsProps[] | undefined;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  formateDateDistance: Function;
}

interface CreateProps {
  type: string;
  content: string;
  all_providers: boolean;
}

const NotificationCreate: React.FC<Props> = ({
  handleMarkAsRead,
  messages,
  setVisible,
  formateDateDistance,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [typeSelected, setTypeSelected] = useState<string>();
  const [allProviders, setAllProviders] = useState(false);

  const handleSubmit = useCallback(
    async (data: CreateProps, { reset }) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          type: Yup.string().required('* A prioridade é obrigatória.'),
          content: Yup.string().required('* A mensagem é obrigatória.'),
          all_providers: Yup.boolean(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post<CreateProps>('informations', {
          type: data.type,
          content: data.content,
          all_providers: allProviders,
        });

        addToast({
          type: 'success',
          title: 'Mensagem enviada',
          description: 'Mensagem enviada com sucesso.',
        });

        reset();

        setVisible(false);
        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          setLoading(false);

          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro ao enviar mensagem',
          description:
            'Ocorreu um erro ao tentar enviar a mensagem, verifique sua conexão.',
        });

        setLoading(false);
      }

      mutateGlobal('informations');
    },
    [addToast, setVisible, allProviders],
  );

    return (
      <>
        <Scroll key={3}>
          {messages?.map((notification) => (
            <Notification
              key={`notificationModal${notification.id}`}
              unread={!notification.read}
            >
              <p>
                <strong style={{ background: notification.type }}>{
                  `${notification.user_send.name}/${notification.provider.name}: `
                }</strong>
                {notification.content}
              </p>
              <time>{formateDateDistance(notification.created_at)}</time>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>

        <Scroll key={4}>
          <FormWeb ref={formRef} onSubmit={handleSubmit}>
            <Label htmlFor="type">Prioridade:</Label>
            <Select
              name="type"
              options={NotificationPriority}
              placeholder="Prioridade"
              value={typeSelected}
              onChange={(e: FormEvent<HTMLSelectElement>) => setTypeSelected(e.currentTarget.value)}
            />

            <Columns>
              <Label>
                Deseja enviar para todas as praças??
              </Label>
              <Checkbox
                type="checkbox"
                className="checkbox"
                name="all_providers"
                checked={allProviders}
                onChange={() => setAllProviders(!allProviders)}
              />
            </Columns>

            <Textarea
              name="content"
              placeholder="Digite sua mensagem"
            />

            <Button loading={loading} type="submit">
              Enviar Mensagem
            </Button>
          </FormWeb>
        </Scroll>
      </>
    );
}

export default NotificationCreate;
