import React, { useState, useRef, useCallback } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationsErrors';

import logoImg from '../../assets/images/logo_rpc.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, AnimationContainer, Content } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('* Digite um email válido.')
            .required('* O e-mail é obrigatório.'),
          password: Yup.string().required('* A senha é obrigatória.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        setLoading(false);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [signIn, addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="RPC" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h2>Faça seu logon</h2>

            <Input id="email" name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              id="password"
              type="password"
              icon={FiLock}
              name="password"
              placeholder="Senha"
            />

            <Button id="submit" loading={loading} type="submit">
              Entrar
            </Button>

            <Link to="/forgot-password">Esqueci minha senha</Link>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
