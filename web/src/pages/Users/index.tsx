import React, {
  useState,
  useCallback,
  memo,
  Fragment,
  useRef,
  FormEvent
} from 'react';
import { mutate as mutateGlobal } from 'swr';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import api from '../../services/apiClient';
import * as Yup from 'yup';
import { FiShield, FiMonitor, FiMail, FiUser, FiLock } from 'react-icons/fi';

import { useFetch } from '../../hooks/useFetch';
import { useToast } from '../../hooks/toast';

import { Roles } from '../../utils/selectOptionsMaterial';
import getValidationErrors from '../../utils/getValidationsErrors';

import Header from '../../components/Header';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Select from '../../components/Select';
import Input from '../../components/Input';

import HeaderWrapper from '../../components/User/HeaderWrapper';
import LineNormal from '../../components/User/LineNormal';

import { Container, HeaderList, Scroll, Content } from './styles';

import { UserProps, ProviderProps } from '../../dtos';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  role: number;
  provider_id: number;
}

const User: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { data: users, error: errorUsers, mutate: mutateUsers } = useFetch<UserProps[]>('users');
  const { data: providers, error: errorProviders } = useFetch<ProviderProps[]>('providers');
  const [addUserModal, setAddUserModal] = useState(false);
  const [roleSelected, setRoleSelected] = useState<string>();
  const [providerSelected, setProviderSelected] = useState<string>();
  const [loading, setLoading] = useState(false);

  // const keyHandler = useCallback((e: any): void => {
  //   if (e.key === 'Escape') {
  //     setAddUserModal(false);
  //     setLoading(false);
  //   }
  // }, []);

  const handleChange = useCallback(async (id: string, field: string, value: any): Promise<void> => {
    try {
      await api.put(`users/${id}`, { field, value });

      addToast({
        type: 'success',
        title: 'Atualizar usuário',
        description: 'Usuário atualizado com sucesso.',
      });

      const update = users?.map((user: UserProps) => {
        if (user.id === id) {
          return { ...user, [field]: value }
        }

        return user;
      });

      mutateUsers(update, true);
      mutateGlobal(`users/${id}`, { id, [field]: value });
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao atualizar',
        description: 'Não foi possível atualizar o usuário, verifique sua conexão.',
      });
    }
  }, [addToast, mutateUsers, users]);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string()
            .min(3, '* No mínimo 3 caracteres.')
            .required('* O nome é obrigatório.'),
          email: Yup.string()
            .email('* Digite um email válido.')
            .required('* O e-mail é obrigatório.'),
          password: Yup.string()
            .min(5, '* No mínimo 5 caracteres.')
            .required('* A senha é obrigatória.'),
          confirmPassword: Yup.string()
            .required('* Confirmação de senha obrigatória.')
            .when('password', {
              is: (val) => !!val.length,
              then: Yup.string()
                .min(5, '* No mínimo 5 caracteres.')
                .required('* Confirmação de senha obrigatória.'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], '* Confirmação de senha incorreta.'),
          role: Yup.string().required('* O nível de usuário é obrigatório.'),
          provider_id: Yup.string().required('* A praça é obrigatória.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post<UserProps>('users', {
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
          provider_id: data.provider_id,
        });

        addToast({
          type: 'success',
          title: 'Cadastrar usuário',
          description: 'Usuário cadastrado com sucesso.',
        });

        setAddUserModal(false);
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

      mutateGlobal('users');
    },
    [addToast],
  );

  return (
    <>
      <Header />
      <Container>
        <HeaderWrapper setAddUserModal={setAddUserModal} />

          {users && providers && addUserModal && (
              <Modal
                title="Adicionar Usuário"
                open={addUserModal}
                setOpen={setAddUserModal}
              >
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <Input name="name" icon={FiUser} placeholder="Nome" />

                  <Input name="email" icon={FiMail} placeholder="E-mail" />

                  <Input
                    type="password"
                    icon={FiLock}
                    name="password"
                    placeholder="Senha"
                  />

                  <Input
                    type="password"
                    icon={FiLock}
                    name="confirmPassword"
                    placeholder="Confirme a senha"
                  />

                  <Select
                    name="role"
                    icon={FiShield}
                    options={Roles}
                    placeholder="Nível de usuário"
                    value={roleSelected}
                    onChange={(e: FormEvent<HTMLSelectElement>) => setRoleSelected(e.currentTarget.value)}
                  />

                  <Select
                    name="provider_id"
                    icon={FiMonitor}
                    options={providers}
                    placeholder="Praça"
                    value={providerSelected}
                    onChange={(e: FormEvent<HTMLSelectElement>) => setProviderSelected(e.currentTarget.value)}
                  />

                  <Button loading={loading} type="submit">
                    Cadastrar
                  </Button>
                </Form>
              </Modal>
          )}

            <Content>
              <HeaderList>
                <div>Foto</div>
                <div>Nome</div>
                <div>E-mail</div>
                <div>Permissão</div>
                <div>Status</div>
                <div>Praça</div>
                <div>Cadastrado</div>
              </HeaderList>

              <Scroll>
                <ul>
                {!errorUsers && !users && <p>Carregando usuários...</p>}
                {!errorUsers && users?.length === 0 && <p>Nenhum usuário cadastrado...</p>}
                {errorUsers && (<p>Ocorreu um erro ao tentar carregar os usuários, verifique sua conexão...</p>)}

                {!errorProviders && !providers && <p>Carregando praças...</p>}
                {!errorProviders && providers?.length === 0 && <p>Nenhuma praça cadastrada...</p>}
                {errorProviders && (<p>Ocorreu um erro ao tentar carregar as praças, verifique sua conexão...</p>)}

                  {users && providers && users?.filter(user => user.status === true).map(user => (
                    <Fragment key={user.id}>
                      <LineNormal
                        user={user}
                        handleChange={handleChange}
                        providers={providers}
                      />
                    </Fragment>
                  ))}
                  {users && providers && users?.filter(user => user.status === false).map(user => (
                    <Fragment key={user.id}>
                      <LineNormal
                        user={user}
                        handleChange={handleChange}
                        providers={providers}
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

export default memo(User);
