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
        title: 'Atualizar usu??rio',
        description: 'Usu??rio atualizado com sucesso.',
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
        description: 'N??o foi poss??vel atualizar o usu??rio, verifique sua conex??o.',
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
            .min(3, '* No m??nimo 3 caracteres.')
            .required('* O nome ?? obrigat??rio.'),
          email: Yup.string()
            .email('* Digite um email v??lido.')
            .required('* O e-mail ?? obrigat??rio.'),
          password: Yup.string()
            .min(5, '* No m??nimo 5 caracteres.')
            .required('* A senha ?? obrigat??ria.'),
          confirmPassword: Yup.string()
            .required('* Confirma????o de senha obrigat??ria.')
            .when('password', {
              is: (val) => !!val.length,
              then: Yup.string()
                .min(5, '* No m??nimo 5 caracteres.')
                .required('* Confirma????o de senha obrigat??ria.'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], '* Confirma????o de senha incorreta.'),
          role: Yup.string().required('* O n??vel de usu??rio ?? obrigat??rio.'),
          provider_id: Yup.string().required('* A pra??a ?? obrigat??ria.'),
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
          title: 'Cadastrar usu??rio',
          description: 'Usu??rio cadastrado com sucesso.',
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
                title="Adicionar Usu??rio"
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
                    placeholder="N??vel de usu??rio"
                    value={roleSelected}
                    onChange={(e: FormEvent<HTMLSelectElement>) => setRoleSelected(e.currentTarget.value)}
                  />

                  <Select
                    name="provider_id"
                    icon={FiMonitor}
                    options={providers}
                    placeholder="Pra??a"
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
                <div>Permiss??o</div>
                <div>Status</div>
                <div>Pra??a</div>
                <div>Cadastrado</div>
              </HeaderList>

              <Scroll>
                <ul>
                {!errorUsers && !users && <p>Carregando usu??rios...</p>}
                {!errorUsers && users?.length === 0 && <p>Nenhum usu??rio cadastrado...</p>}
                {errorUsers && (<p>Ocorreu um erro ao tentar carregar os usu??rios, verifique sua conex??o...</p>)}

                {!errorProviders && !providers && <p>Carregando pra??as...</p>}
                {!errorProviders && providers?.length === 0 && <p>Nenhuma pra??a cadastrada...</p>}
                {errorProviders && (<p>Ocorreu um erro ao tentar carregar as pra??as, verifique sua conex??o...</p>)}

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
