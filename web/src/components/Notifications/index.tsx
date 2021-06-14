import React, { useState, useMemo, memo, useCallback } from 'react';
import { mutate as mutateGlobal } from 'swr';
import { useFetch } from '../../hooks/useFetch';
import { parseISO, formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Modal from '../Modal';

import { MdNotifications } from 'react-icons/md';

import NotificationCreate from './NotificationCreate';

import api from '../../services/apiClient';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
  Button,
} from './styles';

import { NotificationsProps } from '../../dtos';

const Notifications: React.FC = () => {
  const { data, error, mutate } = useFetch<NotificationsProps[]>('informations');
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const handleMarkAsRead = useCallback((id: number) => {
    api.patch(`informations/${id}`);

    const updated = data?.map(notification => {
      if (notification.id === id) {
        return { ...notification, read: true }
      }

      return notification;
    });

    mutate(updated, false);
    mutateGlobal(`informations/${id}`);
  }, [data, mutate]);

  const formateDateDistance = (date: Date): string => {
    const parsedDate = parseISO(`${date}`);
    return formatDistance(parsedDate, new Date(), { addSuffix: true, locale: ptBR })
  }

  const hasUnread = useMemo(
    () => data?.some((notification) => notification.read === false),
    [data]
  );

  return (
    <Container>
      <Badge hasUnread={hasUnread || false} onClick={() => setVisible(!visible)}>
        <MdNotifications color="#006497" size={21} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll key={2}>
          {!error && !data && <p>Carregando...</p>}
          {!error && data?.length === 0 && (<p>Nenhum notificação...</p>)}
          {error && (<p>Ocorreu um erro ao tentar carregar as notificações, verifique sua conexão...</p>)}

          {data?.map((notification) => (
            <Notification
              key={`notificationBell${notification.id}`}
              unread={!notification.read}
            >
              <p>
                <strong style={{ background: notification.type }}>
                  {`${notification.user_send.name}/${notification.provider.name}: `}
                </strong>
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
        <Button type="button" onClick={() => setOpen(true)}>
          Escrever Mensagem
        </Button>
        <Modal title="Notificações" open={open} setOpen={setOpen}>
          <NotificationCreate
            handleMarkAsRead={handleMarkAsRead}
            messages={data}
            setVisible={setVisible}
            formateDateDistance={formateDateDistance}
          />
        </Modal>
      </NotificationList>
    </Container>
  );
}

export default memo(Notifications);
