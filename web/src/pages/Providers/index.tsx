import React, {
  useState,
  useCallback,
  memo,
  Fragment,
  useRef
} from 'react';
import { mutate as mutateGlobal } from 'swr';
import { useFetch } from '../../hooks/useFetch';
import { useToast } from '../../hooks/toast';
import api from '../../services/apiClient';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import {
  FiTv,
  FiMail,
  FiGlobe,
  FiHome,
} from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationsErrors';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import LineNormal from '../../components/Providers/LineNormal';
import HeaderWrapper from '../../components/Providers/HeaderWrapper';

import { Container, HeaderList, Scroll, Content } from './styles';

import { ProviderProps } from '../../dtos';

const Provider: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { data, error, mutate } = useFetch<ProviderProps[]>('providers');
  const [addProviderModal, setAddProviderModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // const keyHandler = useCallback((e: any): void => {
  //   if (e.key === 'Escape') {
  //     setAddProviderModal(false);
  //     setLoading(false);
  //   }
  // }, []);

  const handleChange = useCallback(
    async (id: string, field: string, value: any): Promise<void> => {
      try {
        await api.put(`providers/${id}`, { field, value });

        addToast({
          type: 'success',
          title: 'Atualizar praça',
          description: 'Praça atualizada com sucesso.',
        });

        const update = data?.map((provider: ProviderProps) => {
          if (provider.id === id) {
            return { ...provider, [field]: value }
          }

          return provider;
        });

        mutate(update, true);
        mutateGlobal(`providers/${id}`, { id, [field]: value });
      } catch {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar',
          description: 'Não foi possível atualizar essa praça, verifique sua conexão.',
        });
      }
  }, [addToast, mutate, data]);

  const handleSubmit = useCallback(
    async (data: ProviderProps) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string()
            .min(3, '* No mínimo 3 caracteres.')
            .required('* O nome da praça é obrigatório.'),
          email_provider: Yup.string()
            .email('* Digite um email válido.')
            .required('* O e-mail da praça é obrigatório.'),
          email_jornalism: Yup.string()
            .email('* Digite um email válido.')
            .required('* O e-mail do jornalismo é obrigatório.'),
          email_opec: Yup.string()
            .email('* Digite um email válido.')
            .required('* O e-mail da OPEC é obrigatório.'),
          state: Yup.string().required('* O Estado é obrigatório.'),
          city: Yup.string().required('* A cidade é obrigatória.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post<ProviderProps>('providers', {
          name: data.name,
          email_provider: data.email_provider,
          email_jornalism: data.email_jornalism,
          email_opec: data.email_opec,
          state: data.state,
          city: data.city,
        });

        addToast({
          type: 'success',
          title: 'Cadastrar praça',
          description: 'Praça cadastrada com sucesso.',
        });

        setAddProviderModal(false);
        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          setLoading(false);

          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description:
            'Ocorreu um erro ao tentar fazer o cadastro, verifique os dados preenchidos.',
        });
      }

      mutateGlobal('providers');
    },
    [addToast],
  );

  return (
    <>
      <Header />
      <Container>

        <HeaderWrapper setAddProviderModal={setAddProviderModal} />

          {data && addProviderModal && (
              <Modal
                title="Adicionar Praça"
                open={addProviderModal}
                setOpen={setAddProviderModal}
              >
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <Input name="name" icon={FiTv} placeholder="Nome da praça" />

                  <Input
                    name="email_provider"
                    icon={FiMail}
                    placeholder="E-mail da praça"
                  />

                  <Input
                    name="email_jornalism"
                    icon={FiMail}
                    placeholder="E-mail do jornalismo"
                  />

                  <Input
                    name="email_opec"
                    icon={FiMail}
                    placeholder="E-mail da OPEC"
                  />

                  <Input name="state" icon={FiGlobe} placeholder="Estado" />

                  <Input name="city" icon={FiHome} placeholder="Cidade" />

                  <Button loading={loading} type="submit">
                    Cadastrar
                  </Button>
                </Form>
              </Modal>
          )}

            <Content>
              <HeaderList>
                <div>Foto</div>
                <div>Praça</div>
                <div>E-mail</div>
                <div>Jornalismo</div>
                <div>OPEC</div>
                <div>Estado</div>
                <div>Cidade</div>
                <div>Status</div>
                <div>Cadastrado</div>
              </HeaderList>

              <Scroll>
                <ul>
                {!error && !data && <p>Carregando praças...</p>}
                {!error && data?.length === 0 && <p>Nenhuma praça cadastrada...</p>}
                {error && (<p>Ocorreu um erro ao tentar carregar as praças, verifique sua conexão...</p>)}

                  {data && data?.map(provider => (
                    <Fragment key={provider.id}>
                      <LineNormal
                        provider={provider}
                        handleChange={handleChange}
                      />
                    </Fragment>
                  ))}
                </ul>
              </Scroll>

            </Content>
      </Container>
    </>
  );
}

export default memo(Provider);
