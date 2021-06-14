import React, { useRef, memo, FormEvent } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { format, parseISO } from 'date-fns';

import { Container, Profile, Avatar, CreatedAt } from './styles'

import Input from './Input';
import Select from './Select';
import Checkbox from '../../Checkbox';

import { Roles } from '../../../utils/selectOptionsMaterial';

import { UserProps, ProviderProps } from '../../../dtos';

import avatarDefaultImg from '../../../assets/images/avatar_default.png'

interface Props {
  user: UserProps;
  handleChange: Function;
  providers: ProviderProps[];
}

const LineNormal: React.FC<Props> = ({
  user,
  handleChange,
  providers,
}) => {
  const formRef = useRef<FormHandles>(null);

  return (
      <Container
        status={!user.status}
      >
        <Form ref={formRef} onSubmit={() => {}}>

          <Profile>
            <Avatar
              src={
                user.avatar_url !== null
                  ? user.avatar_url
                  : avatarDefaultImg
              }
              alt={user.name}
            />
          </Profile>

          <Input
            name="name"
            placeholder="Nome"
            onBlur={(e: FormEvent<HTMLInputElement>) => handleChange(user.id, "name", e.currentTarget.value.toUpperCase())}
            id={`name-${user.id}`}
            value={user.name}
          />

          <Input
            name="email"
            placeholder="E-mail"
            onBlur={(e: FormEvent<HTMLInputElement>) => handleChange(user.id, "email", e.currentTarget.value.toLowerCase())}
            id={`email-${user.id}`}
            value={user.email}
            className="lower-case"
          />

          <Select
            name="role"
            onChange={(e: FormEvent<HTMLSelectElement>) => handleChange(user.id, "role", e.currentTarget.value)}
            options={Roles}
            value={user.role}
          />

          <Checkbox
            id={`status-${user.id}`}
            name="status"
            placeholder="Status"
            onChange={() => handleChange(user.id, "status", !user.status)}
            checked={user.status}
          />

          <Select
            name="provider_id"
            onChange={(e: FormEvent<HTMLSelectElement>) => handleChange(user.id, "provider_id", e.currentTarget.value)}
            options={providers}
            value={user.provider_id}
          />

          <CreatedAt>
            {format(parseISO(user.created_at), 'dd/MM/yyyy')}
          </CreatedAt>

        </Form>
      </Container>
  )
}

export default memo(LineNormal);
