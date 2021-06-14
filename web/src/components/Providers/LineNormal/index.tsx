import React, { useRef, memo, FormEvent } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { format, parseISO } from 'date-fns';

import { Container, Profile, Avatar, CreatedAt } from './styles'

import Input from './Input';
import Checkbox from '../../Checkbox';

import { ProviderProps } from '../../../dtos';

import avatarDefaultImg from '../../../assets/images/avatar_default.png'

interface Props {
  handleChange: Function;
  provider: ProviderProps;
}

const LineNormal: React.FC<Props> = ({ handleChange, provider }) => {
  const formRef = useRef<FormHandles>(null);

  return (
      <Container
        status={!provider.status}
      >
        <Form ref={formRef} onSubmit={() => {}}>

          <Profile>
            <Avatar
              src={
                provider.avatar_url !== null
                  ? provider.avatar_url
                  : avatarDefaultImg
              }
              alt={provider.name}
            />
          </Profile>

          <Input
            name="name"
            placeholder="Nome da praça"
            onBlur={(e: FormEvent<HTMLInputElement>) => handleChange(provider.id, "name", e.currentTarget.value.toUpperCase())}
            id={`name-${provider.id}`}
            value={provider.name}
          />

          <Input
            name="email_provider"
            placeholder="E-mail da praça"
            onBlur={(e: FormEvent<HTMLInputElement>) => handleChange(provider.id, "email_provider", e.currentTarget.value.toLowerCase())}
            id={`email_provider-${provider.id}`}
            value={provider.email_provider}
            className="lower-case"
          />

          <Input
            name="email_jornalism"
            placeholder="E-mail do jornalismo"
            onBlur={(e: FormEvent<HTMLInputElement>) => handleChange(provider.id, "email_jornalism", e.currentTarget.value.toLowerCase())}
            id={`email_jornalism-${provider.id}`}
            value={provider.email_jornalism}
            className="lower-case"
          />

          <Input
            name="email_opec"
            placeholder="E-mail da OPEC"
            onBlur={(e: FormEvent<HTMLInputElement>) => handleChange(provider.id, "email_opec", e.currentTarget.value.toLowerCase())}
            id={`email_opec-${provider.id}`}
            value={provider.email_opec}
            className="lower-case"
          />

          <Input
            name="state"
            placeholder="Estado"
            onBlur={(e: FormEvent<HTMLInputElement>) => handleChange(provider.id, "state", e.currentTarget.value.toUpperCase())}
            id={`state-${provider.id}`}
            value={provider.state}
          />

          <Input
            name="city"
            placeholder="Cidade"
            onBlur={(e: FormEvent<HTMLInputElement>) => handleChange(provider.id, "city", e.currentTarget.value.toUpperCase())}
            id={`city-${provider.id}`}
            value={provider.city}
          />

          <Checkbox
            id={`status-${provider.id}`}
            name="status"
            placeholder="Status"
            onChange={() => handleChange(provider.id, "status", !provider.status)}
            checked={provider.status}
          />

          <CreatedAt>
            {format(parseISO(provider.created_at), 'dd/MM/yyyy')}
          </CreatedAt>

        </Form>
      </Container>
  )
}

export default memo(LineNormal);
